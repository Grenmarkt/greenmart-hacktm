import React, { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowLeft,
  CreditCard,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export const Route = createFileRoute('/cartPage')({
  component: RouteComponent,
});

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

function RouteComponent() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "rosii",
      price: 24,
      quantity: 1,
      image: "https://imgs.search.brave.com/k2U5OLRl5WTUiImfn3waMJIm61CLCMcGsG-bJ3yAzWw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNS8w/NS8xNi8xNS8wMy90/b21hdG9lcy03Njk5/OTlfNjQwLmpwZw",
      category: "Legume"
    },
    {
      id: 2,
      name: "Mere",
      price: 29,
      quantity: 2,
      image: "https://imgs.search.brave.com/k2U5OLRl5WTUiImfn3waMJIm61CLCMcGsG-bJ3yAzWw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNS8w/NS8xNi8xNS8wMy90/b21hdG9lcy03Njk5/OTlfNjQwLmpwZw",
      category: "Fructe"
    },

  ]);

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

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 29.99;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center py-16">
            <ShoppingCart className="mx-auto h-24 w-24 text-gray-400 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Coșul tău este gol</h2>
            <p className="text-gray-600 mb-8">Adaugă produse pentru a începe cumpărăturile</p>
            <Link to="/search">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
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
                
                <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
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
}
