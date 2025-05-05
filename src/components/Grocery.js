import { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { Badge } from 'primereact/badge';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';

const Grocery = () => {
    const [cart, setCart] = useState([]);
    const [searchText, setSearchText] = useState('');
    const toast = useRef(null);

    // Sample grocery categories and products
    const categories = [
        {
            id: 1,
            name: 'Fruits & Vegetables',
            icon: 'pi pi-apple',
            products: [
                { id: 101, name: 'Fresh Apples', price: 2.99, unit: 'kg', image: 'https://primefaces.org/cdn/primereact/images/product/apple.jpg' },
                { id: 102, name: 'Organic Bananas', price: 1.49, unit: 'dozen', image: 'https://primefaces.org/cdn/primereact/images/product/banana.jpg' },
                { id: 103, name: 'Fresh Tomatoes', price: 3.99, unit: 'kg', image: 'https://primefaces.org/cdn/primereact/images/product/tomato.jpg' }
            ]
        },
        {
            id: 2,
            name: 'Dairy & Eggs',
            icon: 'pi pi-box',
            products: [
                { id: 201, name: 'Fresh Milk', price: 2.49, unit: 'liter', image: 'https://primefaces.org/cdn/primereact/images/product/milk.jpg' },
                { id: 202, name: 'Free Range Eggs', price: 4.99, unit: 'dozen', image: 'https://primefaces.org/cdn/primereact/images/product/eggs.jpg' },
                { id: 203, name: 'Greek Yogurt', price: 3.49, unit: '500g', image: 'https://primefaces.org/cdn/primereact/images/product/yogurt.jpg' }
            ]
        },
        {
            id: 3,
            name: 'Bakery',
            icon: 'pi pi-bars',
            products: [
                { id: 301, name: 'Whole Grain Bread', price: 2.99, unit: 'loaf', image: 'https://primefaces.org/cdn/primereact/images/product/bread.jpg' },
                { id: 302, name: 'Croissants', price: 3.99, unit: 'pack of 4', image: 'https://primefaces.org/cdn/primereact/images/product/croissant.jpg' },
                { id: 303, name: 'Bagels', price: 2.49, unit: 'pack of 6', image: 'https://primefaces.org/cdn/primereact/images/product/bagel.jpg' }
            ]
        }
    ];

    const addToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });

        toast.current.show({
            severity: 'success',
            summary: 'Added to Cart',
            detail: `${product.name} has been added to your cart`,
            life: 2000
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const getTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    const filteredCategories = categories.map(category => ({
        ...category,
        products: category.products.filter(product =>
            product.name.toLowerCase().includes(searchText.toLowerCase())
        )
    }));

    return (
        <div className="surface-ground p-4">
            <Toast ref={toast} />
            <div className="grid">
                <div className="col-12 md:col-8">
                    <Card className="mb-4">
                        <div className="flex justify-content-between align-items-center mb-4">
                            <h2 className="text-2xl font-bold m-0">Grocery Store</h2>
                            <span className="p-input-icon-left">
                                <i className="pi pi-search" />
                                <InputText
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    placeholder="Search products..."
                                    className="w-20rem"
                                />
                            </span>
                        </div>

                        {filteredCategories.map(category => (
                            <div key={category.id} className="mb-5">
                                <div className="flex align-items-center gap-2 mb-3">
                                    <i className={category.icon}></i>
                                    <h3 className="text-xl font-bold m-0">{category.name}</h3>
                                </div>
                                <div className="grid">
                                    {category.products.map(product => (
                                        <div key={product.id} className="col-12 md:col-4">
                                            <Card className="h-full">
                                                <div className="flex flex-column h-full">
                                                    <div className="flex justify-content-center mb-3">
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="border-round"
                                                            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                                        />
                                                    </div>
                                                    <div className="flex flex-column flex-grow-1">
                                                        <h4 className="text-lg font-bold mb-2">{product.name}</h4>
                                                        <p className="text-500 mb-2">${product.price} / {product.unit}</p>
                                                        <div className="mt-auto">
                                                            <Button
                                                                icon="pi pi-shopping-cart"
                                                                label="Add to Cart"
                                                                onClick={() => addToCart(product)}
                                                                className="p-button-outlined w-full"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </Card>
                </div>

                <div className="col-12 md:col-4">
                    <Card title="Shopping Cart" className="sticky-top">
                        {cart.length === 0 ? (
                            <div className="text-center p-4">
                                <i className="pi pi-shopping-cart text-6xl text-500 mb-3"></i>
                                <p className="text-500">Your cart is empty</p>
                            </div>
                        ) : (
                            <div className="flex flex-column gap-3">
                                {cart.map(item => (
                                    <div key={item.id} className="flex justify-content-between align-items-center">
                                        <div className="flex align-items-center gap-2">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                                            />
                                            <div>
                                                <p className="font-bold mb-1">{item.name}</p>
                                                <p className="text-500">${item.price} / {item.unit}</p>
                                            </div>
                                        </div>
                                        <div className="flex align-items-center gap-2">
                                            <InputNumber
                                                value={item.quantity}
                                                onChange={(e) => updateQuantity(item.id, e.value)}
                                                showButtons
                                                buttonLayout="horizontal"
                                                min={1}
                                                max={10}
                                                decrementButtonClassName="p-button-secondary"
                                                incrementButtonClassName="p-button-secondary"
                                                incrementButtonIcon="pi pi-plus"
                                                decrementButtonIcon="pi pi-minus"
                                                style={{ width: '100px' }}
                                            />
                                            <Button
                                                icon="pi pi-trash"
                                                className="p-button-danger p-button-text"
                                                onClick={() => removeFromCart(item.id)}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <Divider />
                                <div className="flex justify-content-between align-items-center">
                                    <span className="font-bold">Total:</span>
                                    <span className="font-bold">${getTotal()}</span>
                                </div>
                                <Button
                                    label="Proceed to Checkout"
                                    icon="pi pi-shopping-bag"
                                    className="p-button-success"
                                />
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Grocery;