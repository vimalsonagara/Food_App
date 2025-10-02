import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState(null);

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'));
        const response = await fetch("http://localhost:5000/api/MyorderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        });

        const data = await response.json();
        // console.log(data);
        setOrderData(data.orderdata); // Fixing the key reference
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container mt-3">
                <h2>My Orders</h2>
                {orderData && orderData.order_data ? (
                    orderData.order_data.map((order, index) => (
                        <div key={index} className="card mb-3 p-3">
                            <h4>Order Date: {order[0].order_date}</h4>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Size</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.slice(1).map((item, itemIndex) => (
                                        <tr key={item.id || itemIndex}>
                                            <td>{item.name}</td>
                                            <td>{item.price}</td>
                                            <td>{item.qty}</td>
                                            <td>{item.size}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))
                ) : (
                    <p>Loading or No Orders Found...</p>
                )}
            </div>
            <Footer />
        </div>
    );
}
