const ShoppingCart = require('../models/shoppingcartModel');
const email = require('../apis/sendgrid/email');

module.exports = {
    getAllShoppingCarts: async () => await ShoppingCart.find(),
    getShoppingCartById: async (_id) => await ShoppingCart.findOne({ _id }),
    getShoppingCartByUser: async (userId) => await ShoppingCart.find({ "user._id": userId }),
    createShoppingCart: async (args) => {
        const shoppingCart = new ShoppingCart(args);
        let subtotal = 0;
        for (let i = 0; i < shoppingCart.product.length; i++) {
            subtotal += shoppingCart.product[i].price;
        }
        const iva = subtotal * 0.16;
        const total = subtotal + iva;
        shoppingCart.subtotal = subtotal;
        shoppingCart.IVA = iva;
        shoppingCart.total = total;
        return await shoppingCart.save();
    },
    updateShoppingCart: async (cartId, updates) => {
        const cart = await ShoppingCart.findById(cartId);
        if (cart && cart.status === 'ACTIVE') {
            Object.assign(cart, updates);
            return await cart.save();
        }
        throw new Error('El carrito no está activo, no se puede actualizar');
    },
    deleteShoppingCart: async (_id) => {
        const shoppingCart = await ShoppingCart.findByIdAndDelete(_id);
        return shoppingCart;
    },
    // Mutaciones extra
    addProductToCart: async (cartId, product) => {
        const cart = await ShoppingCart.findById(cartId);
        if (cart && cart.status === 'ACTIVE') {
            cart.product.push(product);
            let newSubtotal = 0;
            newSubtotal = product.price + cart.subtotal;
            const iva = newSubtotal * 0.16;
            const total = newSubtotal + iva;
            cart.subtotal = newSubtotal;
            cart.IVA = iva;
            cart.total = total;
            return await cart.save();
        }
        throw new Error('El carrito no está activo, no se puede agregar un producto');
    },
    removeProductFromCart: async (cartId, product) => {
        const cart = await ShoppingCart.findById(cartId);
        if (cart && cart.status === 'ACTIVE') {
            const productRemove = cart.product.find(p => p._id === product._id);

            if (!productRemove) {
                throw new Error('El producto no se encuentra en el carrito');
            }
            cart.product = cart.product.filter(p => p._id !== product._id);
            let newSubtotal = cart.subtotal - productRemove.price;
            const iva = newSubtotal * 0.16;
            const total = newSubtotal + iva;
            cart.subtotal = newSubtotal;
            cart.IVA = iva;
            cart.total = total;
            return await cart.save();
        }
        throw new Error('El carrito no está activo, no se puede eliminar un producto');
    },
    closeCart: async (cartId) => {
        const cart = await ShoppingCart.findById(cartId);
        if (cart) {
            cart.status = 'INACTIVE';
            cart.endDate = new Date();
            console.log("Enviando email...");

            //Construyendo tabla de productos
            const productTable = `
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                    <thead>
                        <tr style="background-color: #f1f1f1;">
                            <th style="border: 1px solid #ddd; padding: 8px;">Nombre</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Descripción</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Precio</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Cantidad</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${cart.product.map(product => `
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 8px;">${product.name}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">${product.description}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">${product.price.toFixed(2)}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">${product.quantity || 1}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">${(product.price * (product.quantity || 1)).toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;

            email.sendEmail(
                cart.user,
                `Carrito cerrado!`,
                `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Carrito cerrado</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                margin: 0;
                                padding: 0;
                                background-color: #f8f8f8;
                            }
                            .email-container {
                                max-width: 600px;
                                margin: 0 auto;
                                background-color: #ffffff;
                                border-radius: 8px;
                                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                                overflow: hidden;
                            }
                            .header {
                                background-color: #$CAF50;
                                color: #ffffff;
                                text-align: center;
                                padding: 20px;
                            }
                            .header h1 {
                                margin: 0;
                                font-size: 24px;
                            }
                            .content {
                                padding: 20px;
                                color: #333333;
                            }
                            .content h2 {
                                margin: 0 0 10px;
                                font-size: 20px;
                                color: #4CAF50;
                            }
                            .content p {
                                line-height: 1.6;
                                margin: 0 0 10px;
                            }
                            .content a {
                                display: inline-block;
                                margin-top: 20px;
                                padding: 10px 20px;
                                background-color: #4CAF50;
                                color: #ffffff;
                                text-decoration: none;
                                border-radius: 5px;
                                font-size: 16px;
                            }
                            .content a:hover {
                                background-color: #45a049;
                            }
                            .footer {
                                text-align: center;
                                padding: 15px;
                                font-size: 12px;
                                color: #888888;
                                background-color: #f1f1f1;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="email-container">
                            <div class="header">
                                <h1>Carrito de Compras Cerrado</h1>
                            </div>
                            <div class="content">
                                <h2>¡Hola ${cart.user.name}! Tu carrito de compras ha sido cerrado.</h2>
                                <p>Estamos emocionados de informarte que tu carrito de compras ha sido cerrado y ya puedes pagar tus productos.</p>
                                <p>Tus artículos:</p>
                                ${productTable}
                                <p>Haz clic en el siguiente botón para comenzar a comprar:</p>
                                <a href="google.com" target="_blank">Ir al carrito de compras</a>
                            </div>
                            <div class="footer">
                                <p>&copy; 2024 Venta Tec. Todos los derechos reservados.</p>
                                <p>Este es un correo generado automáticamente. Por favor, no respondas a este mensaje.</p>
                            </div>
                        </div>
                    </body>
                </html>
                `
            );

            return await cart.save();
        }
        throw new Error('Cart not found');
    }
};