import { useContext, useEffect, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { CartContext } from 'context/Context';
import { convertToCurrency } from 'helper/utils';

const OrderSummary = () => {
    const [cartSubTotal, setCartSubTotal] = useState(0);
    const cartContext = useContext(CartContext);

    // Asegúrate de que el contexto no sea undefined
    if (!cartContext) {
        return <div>Póliza Generada Acá.</div>;
    }

    const cartItems = cartContext.CartState?.cartItems || [];
    const cartSummary = cartContext.CartState?.cartSummary || {};

    useEffect(() => {
        const calculateSubtotal = (items) => {
            return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        };
        
        setCartSubTotal(calculateSubtotal(cartItems));
    }, [cartItems]);

    if (!cartItems.length) {
        return <div>No hay productos en el carrito.</div>;
    }

    return (
        <Card className="mt-4 mt-lg-0">
        
        </Card>
    );
};

export default OrderSummary;
