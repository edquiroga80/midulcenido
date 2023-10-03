// import expressAsyncHandler from 'express-async-handler';
import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc   Create new order
// @route  POST /api/orders
// @access Private

const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if(orderItems && orderItems.length === 0){
        res.status(400);
        throw new Error('Sin pedidos');
    } else {
        const order = new Order({
            orderItems: orderItems.map((x)=>({
                ...x,
                product: x._id,
                _id: undefined
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });
        const createOrder = await order.save();

        res.status(201).json(createOrder);
    }
});

// @desc   Get logged in user orders
// @route  GET /api/orders/myorders
// @access Private

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// @desc   Get order By Id
// @route  GET /api/orders/:id
// @access Private

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user','name email');

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error('Orden no encontrada');
  }

});

// @desc   Update order to paid
// @route  GET /api/orders/:id/pay
// @access Private

const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("Marcar pedido como pagado");
});

// @desc   Get all orders
// @route  GET /api/orders/:id/deliver
// @access Private/Admin

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("Marcar pedido como entregado");
});

// @desc   Get all orders
// @route  GET /api/orders
// @access Private/Admin

const getOrders = asyncHandler(async (req, res) => {
  res.send("Obtener todos los pedidos");
});

export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
};
