from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime

from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializer import ProductSerializer, OrderSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data.get('orderItems', [])

    if not orderItems:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)

    # (1) Create order
    order = Order.objects.create(
        user=user,
        paymentMethod=data.get('paymentMethod', ''),
        taxPrice=data.get('taxPrice', 0),
        shippingPrice=data.get('shippingPrice', 0),
        totalPrice=data.get('totalPrice', 0)
    )

    # (2) Create shipping address
    if 'shippingAddress' in data:
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress'].get('address', ''),
            city=data['shippingAddress'].get('city', ''),
            postalCode=data['shippingAddress'].get('postalCode', ''),
            country=data['shippingAddress'].get('country', ''),
        )
    else:
        return Response({'detail': 'Missing shipping address'}, status=status.HTTP_400_BAD_REQUEST)

    # (3) Create order items and update stock
    for item in orderItems:
        try:
            product = Product.objects.get(_id=item['product'])
        except Product.DoesNotExist:
            return Response({'detail': f"Product with ID {item['product']} does not exist"}, status=status.HTTP_404_NOT_FOUND)

        order_item = OrderItem.objects.create(
            product=product,
            order=order,
            name=product.name,
            qty=item['qty'],
            price=item['price'],
            image=product.image.url,
        )

        # (4) Update stock
        product.countInStock -= order_item.qty
        product.save()

    # (5) Serialize order and return response
    serializer = OrderSerializer(order, data=request.data, many=False)  # Pass data to serializer

    if serializer.is_valid():
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    user = request.user

    order = get_object_or_404(Order, _id=pk)

    if user.is_staff or order.user == user:
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)
    
    return Response({'detail': 'Not authorized to view this order'}, status=status.HTTP_403_FORBIDDEN)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = get_object_or_404(Order, _id=pk)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()

    return Response({'detail': 'Order was paid'}, status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request, pk):
    order = get_object_or_404(Order, _id=pk)

    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()

    return Response({'detail': 'Order was delivered'}, status=status.HTTP_200_OK)
