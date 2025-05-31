import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowLeft,
  CreditCard,
  Tag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

interface PromoCode {
  code: string;
  discount: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Laptop Gaming ASUS ROG",
      price: 2499.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300&h=200&fit=crop",
      category: "Electronics"
    },
    {
      id: 2,
      name: "Căști Wireless Sony",
      price: 299.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop",
      category: "Audio"
    },
    {
      id: 3,
      name: "Smartphone Samsung Galaxy",
      price: 1199.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop",
      category: "Mobile"
    }
  ]);

  const [promoCode, setPromoCode] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'SAVE10') {
      setAppliedPromo({ code: 'SAVE10', discount: 0.1 });
      setPromoCode('');
    } else if (promoCode.toUpperCase() === 'WELCOME20') {
      setAppliedPromo({ code: 'WELCOME20', discount: 0.2 });
      setPromoCode('');
    } else {
      alert('Cod promoțional invalid');
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = appliedPromo ? subtotal * appliedPromo.discount : 0;
  const shipping = subtotal > 500 ? 0 : 29.99;
  const total = subtotal - discount + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center py-16">
            <ShoppingCart className="mx-auto h-24 w-24 text-gray-400 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Coșul tău este gol</h2>
            <p className="text-gray-600 mb-8">Adaugă produse pentru a începe cumpărăturile</p>
            <Link to="/search">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Continuă cumpărăturile
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/search">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Înapoi la produse
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Coșul meu</h1>
          </div>
          <Badge variant="secondary" className="text-sm">
            {cartItems.length} {cartItems.length === 1 ? 'produs' : 'produse'}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
                          <Badge variant="outline" className="mt-1">
                            {item.category}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center border rounded-lg">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-10 w-10 p-0"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="px-4 py-2 min-w-[3rem] text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-10 w-10 p-0"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">
                            {(item.price * item.quantity).toLocaleString('ro-RO', {
                              style: 'currency',
                              currency: 'RON'
                            })}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.price.toLocaleString('ro-RO', {
                              style: 'currency',
                              currency: 'RON'
                            })} / bucată
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Promo Code */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Cod promoțional
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <div className="font-medium text-green-800">{appliedPromo.code}</div>
                      <div className="text-sm text-green-600">
                        Reducere {(appliedPromo.discount * 100)}%
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={removePromoCode}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Introdu codul..."
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && applyPromoCode()}
                    />
                    <Button onClick={applyPromoCode} variant="outline">
                      Aplică
                    </Button>
                  </div>
                )}
                <div className="text-sm text-gray-500">
                  Coduri disponibile: SAVE10, WELCOME20
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Sumar comandă</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">
                    {subtotal.toLocaleString('ro-RO', {
                      style: 'currency',
                      currency: 'RON'
                    })}
                  </span>
                </div>
                
                {appliedPromo && (
                  <div className="flex justify-between text-green-600">
                    <span>Reducere ({appliedPromo.code})</span>
                    <span className="font-medium">
                      -{discount.toLocaleString('ro-RO', {
                        style: 'currency',
                        currency: 'RON'
                      })}
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>Livrare</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'GRATUIT' : shipping.toLocaleString('ro-RO', {
                      style: 'currency',
                      currency: 'RON'
                    })}
                  </span>
                </div>
                
                {shipping === 0 && (
                  <div className="text-sm text-green-600">
                    ✓ Livrare gratuită pentru comenzi peste 500 RON
                  </div>
                )}
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>
                    {total.toLocaleString('ro-RO', {
                      style: 'currency',
                      currency: 'RON'
                    })}
                  </span>
                </div>
                
                <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Finalizează comanda
                </Button>
                
                <div className="text-center">
                  <Link to="/search">
                    <Button variant="outline" className="w-full">
                      Continuă cumpărăturile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;