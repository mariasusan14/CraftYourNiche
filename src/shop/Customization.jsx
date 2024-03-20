import React, { useState } from 'react';
import { db } from '../config/firebase'; // Import your Firebase configuration

export const Customization = () => {
    // Define state variables
    const [orders, setOrders] = useState([]); // State variable to store orders
    const [selectedOrder, setSelectedOrder] = useState(null); // State variable to store the selected order
    const [replyComment, setReplyComment] = useState(''); // State variable to store reply comment
    const [orderCost, setOrderCost] = useState(''); // State variable to store order cost

    // Function to fetch orders from Firestore
    const fetchOrders = async () => {
        try {
            const ordersRef = db.collection('customisation'); // Reference to the 'customisation' collection
            const snapshot = await ordersRef.get(); // Fetch data from Firestore
            const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map data to array of orders
            setOrders(ordersData); // Update state with fetched orders
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    // Function to handle view order button click
    const onViewOrderClick = (orderId) => {
        // Set the selected order based on the orderId
        const selectedOrder = orders.find(order => order.id === orderId);
        setSelectedOrder(selectedOrder);
        // Navigate to another component to display the order details (not implemented here)
        // You can use React Router for navigation
    };

    // Function to handle accept order button click
    const onAcceptOrderClick = async () => {
        try {
            // Update Firestore with reply comment and order cost
            await db.collection('customisation').doc(selectedOrder.id).update({
                replyComment,
                orderCost,
                status: 'accepted' // Assuming status changes to 'accepted' after accepting the order
            });
            // Clear reply comment and order cost fields
            setReplyComment('');
            setOrderCost('');
            // Fetch orders again to update the UI
            fetchOrders();
        } catch (error) {
            console.error('Error accepting order:', error);
        }
    };

    // Function to render orders
    const renderOrders = () => {
        return orders.map(order => (
            <div key={order.id}>
                <p>Invoice Number: {order.invoiceNumber}</p>
                <p>Order Time: {order.orderTime}</p>
                <p>Customer Name: {order.customerName}</p>
                <p>Status: {order.status}</p>
                <p>Activity: 
                    <select value={order.activity} onChange={(e) => handleActivityChange(e, order.id)}>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </p>
                <button onClick={() => onViewOrderClick(order.id)}>View Order</button>
            </div>
        ));
    };

    // Function to handle activity change
    const handleActivityChange = async (e, orderId) => {
        const newActivity = e.target.value;
        try {
            // Update Firestore with the new activity
            await db.collection('customisation').doc(orderId).update({
                activity: newActivity
            });
            // Fetch orders again to update the UI
            fetchOrders();
        } catch (error) {
            console.error('Error updating activity:', error);
        }
    };

    return (
        <div>
            <h2>Customization Orders</h2>
            {renderOrders()}
            {/* Modal to display order details */}
            {/* Accept Order Form */}
            {selectedOrder && (
                <div>
                    <h3>Order Details</h3>
                    <p>Order Description: {selectedOrder.orderDescription}</p>
                    <input type="text" placeholder="Reply Comment" value={replyComment} onChange={(e) => setReplyComment(e.target.value)} />
                    <input type="number" placeholder="Order Cost" value={orderCost} onChange={(e) => setOrderCost(e.target.value)} />
                    <button onClick={onAcceptOrderClick}>Accept Order</button>
                </div>
            )}
        </div>
    );
};





