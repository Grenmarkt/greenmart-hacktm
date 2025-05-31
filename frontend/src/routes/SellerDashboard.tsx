import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, Plus, Edit, MapPin, Clock, Camera, Trash2, X } from 'lucide-react';

// Types
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  farmName: string;
  location: {
    lat: number;
    lng: number;
  };
  rating: number;
  reviewCount: number;
}

interface ProductEdit extends Omit<Product, 'price'> {
  price: string | number;
}

interface Review {
  id: number;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  productName: string;
}

interface WorkingHours {
  luni: string;
  marti: string;
  miercuri: string;
  joi: string;
  vineri: string;
  sambata: string;
  duminica: string;
}

interface SellerProfile {
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  workingHours: WorkingHours;
  gallery: string[];
}

interface ProfileEdit {
  description: string;
  address: string;
  lat: string;
  lng: string;
  workingHours: WorkingHours;
}

interface NewProduct {
  name: string;
  description: string;
  price: string;
  category: string;
  farmName: string;
  imageUrl: string;
  location: {
    lat: number;
    lng: number;
  };
}

// Mock data
const mockProducts: Product[] = [
  {
    id: 5,
    name: "Brânză de Capră Artizanală",
    description: "Brânză cremoasă de capră, preparată în loturi mici, din laptele caprelor noastre crescute în libertate.",
    price: 6.99,
    imageUrl: "https://images.unsplash.com/photo-1452195100486-9cc805987862",
    category: "lactate",
    farmName: "Laptăria Capra Fericită",
    location: {
      lat: 45.7989,
      lng: 21.2587
    },
    rating: 4.8,
    reviewCount: 21
  }
];

const initialReviews: Review[] = [
  {
    id: 1,
    customerName: 'Maria Popescu',
    rating: 5,
    comment: 'Merele au fost delicioase! Foarte proaspete și dulci.',
    date: '2024-05-20',
    productName: 'Mere Roșii Ecologice'
  },
];

// Component ProductCard
const ProductCard = ({ product, onEdit, onDelete }: { product: Product; onEdit: (product: Product) => void; onDelete: (productId: number) => void }) => {
  const getCategoryLabel = (category: string): string => {
    const categoryMap: Record<string, string> = {
      'fructe': 'Fructe',
      'legume': 'Legume',
      'sucuri_si_bauturi_alcoolice': 'Băuturi',
      'lactate': 'Lactate',
      'miere_si_gemuri': 'Miere & Gemuri',
      'muraturi': 'Murături',
      'cereale': 'Cereale',
      'carne': 'Carne'
    };
    return categoryMap[category] || category;
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold line-clamp-2">{product.name}</CardTitle>
            <CardDescription className="text-sm text-gray-600 mt-1">
              {getCategoryLabel(product.category)} • {product.farmName}
            </CardDescription>
          </div>
          <Badge variant="default" className="bg-green-100 text-green-800">
            Activ
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-48 object-cover rounded-md bg-gray-100"
          />
          <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-green-600">
              {product.price.toFixed(2)} RON
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-gray-500">({product.reviewCount})</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <MapPin className="w-4 h-4" />
            <span>Lat: {product.location.lat.toFixed(4)}, Lng: {product.location.lng.toFixed(4)}</span>
          </div>
          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="outline" onClick={() => onEdit(product)} className="flex-1">
              <Edit className="w-4 h-4 mr-1" />
              Editează
            </Button>
            <Button size="sm" variant="destructive" onClick={() => onDelete(product.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Component ProductList
const ProductList = ({ products, onEdit, onDelete }: { products: Product[]; onEdit: (product: Product) => void; onDelete: (productId: number) => void }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {review.customerName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{review.customerName}</p>
              <p className="text-sm text-gray-500">{review.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-blue-600 font-medium mb-2">{review.productName}</p>
        <p className="text-gray-800">{review.comment}</p>
      </CardContent>
    </Card>
  );
};

const SellerDashboard = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [reviews] = useState<Review[]>(initialReviews);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductEdit | null>(null);
  
  // Seller profile state
  const [sellerProfile, setSellerProfile] = useState<SellerProfile>({
    description: 'Fermă specializată în produse organice și naturale de calitate superioară. Oferim produse proaspete, crescute cu grijă și pasiune.',
    location: { 
      lat: 45.7494, 
      lng: 21.2272, 
      address: 'Timișoara, Timiș' 
    },
    workingHours: {
      luni: '08:00-18:00',
      marti: '08:00-18:00',
      miercuri: '08:00-18:00',
      joi: '08:00-18:00',
      vineri: '08:00-18:00',
      sambata: '09:00-15:00',
      duminica: 'Închis'
    },
    gallery: [
      'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=200',
      'https://images.unsplash.com/photo-1598170845058-c2eec1a2c461?w=300&h=200',
      'https://images.unsplash.com/photo-1553361371-9b22c37a411d?w=300&h=200',
      'https://images.unsplash.com/photo-1518635017498-87f514b751ba?w=300&h=200'
    ]
  });

  const [newProduct, setNewProduct] = useState<NewProduct>({
    name: '',
    description: '',
    price: '',
    category: '',
    farmName: '',
    imageUrl: '',
    location: { lat: 45.7494, lng: 21.2272 }
  });

  const [profileEdit, setProfileEdit] = useState<ProfileEdit>({
    description: sellerProfile.description,
    address: sellerProfile.location.address,
    lat: sellerProfile.location.lat.toString(),
    lng: sellerProfile.location.lng.toString(),
    workingHours: { ...sellerProfile.workingHours }
  });

  const categories = [
    'fructe', 'legume', 'sucuri_si_bauturi_alcoolice', 'lactate', 
    'miere_si_gemuri', 'muraturi', 'cereale', 'carne'
  ];

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.category && newProduct.description) {
      const product: Product = {
        id: Math.max(...products.map(p => p.id), 0) + 1,
        ...newProduct,
        price: parseFloat(newProduct.price),
        rating: 0,
        reviewCount: 0,
        location: {
          lat: newProduct.location.lat,
          lng: newProduct.location.lng
        }
      };
      setProducts([...products, product]);
      setNewProduct({
        name: '', description: '', price: '', category: '', farmName: '', 
        imageUrl: '', location: { lat: 45.7494, lng: 21.2272 }
      });
      setIsAddingProduct(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct({
      ...product,
      price: product.price.toString()
    });
  };

  const handleUpdateProduct = () => {
    if (editingProduct) {
      const updatedProduct: Product = {
        ...editingProduct,
        price: typeof editingProduct.price === 'string' 
          ? parseFloat(editingProduct.price) 
          : editingProduct.price
      };
      
      setProducts(products.map(p => 
        p.id === updatedProduct.id ? updatedProduct : p
      ));
      setEditingProduct(null);
    }
  };

  const handleDeleteProduct = (productId: number) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const updateSellerProfile = () => {
    setSellerProfile({
      ...sellerProfile,
      description: profileEdit.description,
      location: {
        lat: parseFloat(profileEdit.lat),
        lng: parseFloat(profileEdit.lng),
        address: profileEdit.address
      },
      workingHours: { ...profileEdit.workingHours }
    });
  };

  const addImageToGallery = (imageUrl: string) => {
    if (imageUrl && !sellerProfile.gallery.includes(imageUrl)) {
      setSellerProfile({
        ...sellerProfile,
        gallery: [...sellerProfile.gallery, imageUrl]
      });
    }
  };

  const removeImageFromGallery = (imageUrl: string) => {
    setSellerProfile({
      ...sellerProfile,
      gallery: sellerProfile.gallery.filter(img => img !== imageUrl)
    });
  };

  const totalProducts = products.length;
  const averageRating = products.length > 0 
    ? products.reduce((sum, product) => sum + product.rating, 0) / products.length 
    : 0;
  const totalReviews = products.reduce((sum, product) => sum + product.reviewCount, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Gestionează produsele și profilul tau</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Produse</CardDescription>
              <CardTitle className="text-2xl">{totalProducts}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Rating Mediu</CardDescription>
              <CardTitle className="text-2xl flex items-center gap-1">
                {averageRating.toFixed(1)}
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Review-uri</CardDescription>
              <CardTitle className="text-2xl">{totalReviews}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Câștiguri Estimative</CardDescription>
              <CardTitle className="text-2xl text-green-600">
                {products.reduce((sum, p) => sum + p.price, 0).toFixed(0)} RON
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">Produse</TabsTrigger>
            <TabsTrigger value="reviews">Review-uri</TabsTrigger>
            <TabsTrigger value="profile">Profil Fermă</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Produsele Tale</h2>
              <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Adaugă Produs
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Adaugă Produs Nou</DialogTitle>
                    <DialogDescription>
                      Completează informațiile despre noul produs
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Nume Produs</Label>
                      <Input
                        id="name"
                        value={newProduct.name}
                        onChange={(e) => 
                          setNewProduct({...newProduct, name: e.target.value})}
                        placeholder="ex. Mere Roșii Ecologice"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="description">Descriere</Label>
                      <Textarea
                        id="description"
                        value={newProduct.description}
                        onChange={(e) => 
                          setNewProduct({...newProduct, description: e.target.value})}
                        placeholder="Descriere detaliată..."
                        rows={3}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="price">Preț (RON)</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          value={newProduct.price}
                          onChange={(e) => 
                            setNewProduct({...newProduct, price: e.target.value})}
                          placeholder="0.00"
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="category">Categorie</Label>
                        <select
                          id="category"
                          value={newProduct.category}
                          onChange={(e) => 
                            setNewProduct({...newProduct, category: e.target.value})}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                          <option value="">Selectează...</option>
                          {categories.map(cat => (
                            <option key={cat} value={cat}>{cat.replace('_', ' ')}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="farmName">Numele Fermei</Label>
                      <Input
                        id="farmName"
                        value={newProduct.farmName}
                        onChange={(e) => 
                          setNewProduct({...newProduct, farmName: e.target.value})}
                        placeholder="ex. Ferma Valle Verde"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="imageUrl">URL Imagine</Label>
                      <Input
                        id="imageUrl"
                        value={newProduct.imageUrl}
                        onChange={(e) => 
                          setNewProduct({...newProduct, imageUrl: e.target.value})}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAddProduct} className="flex-1">Adaugă Produs</Button>
                    <Button variant="outline" onClick={() => setIsAddingProduct(false)}>
                      Anulează
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <ProductList 
              products={products} 
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />

            {/* Edit Product Dialog */}
            <Dialog open={!!editingProduct} onOpenChange={(open: boolean) => !open && setEditingProduct(null)}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Editează Produs</DialogTitle>
                </DialogHeader>
                {editingProduct && (
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label>Nume Produs</Label>
                      <Input
                        value={editingProduct.name}
                        onChange={(e) => 
                          setEditingProduct({...editingProduct, name: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Descriere</Label>
                      <Textarea
                        value={editingProduct.description}
                        onChange={(e) => 
                          setEditingProduct({...editingProduct, description: e.target.value})}
                        rows={3}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Preț (RON)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={editingProduct.price.toString()}
                        onChange={(e) => 
                          setEditingProduct({...editingProduct, price: e.target.value})}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleUpdateProduct} className="flex-1">
                        Salvează Modificările
                      </Button>
                      <Button variant="outline" onClick={() => setEditingProduct(null)}>
                        Anulează
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <h2 className="text-2xl font-bold">Review-uri Primite</h2>
            <div className="grid gap-4">
              {reviews.map(review => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <h2 className="text-2xl font-bold">Profil Fermă</h2>
            
            <div className="grid gap-6">
              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Descrierea Fermei</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    value={profileEdit.description}
                    onChange={(e) => 
                      setProfileEdit({...profileEdit, description: e.target.value})}
                    rows={4}
                    placeholder="Descrie ferma ta..."
                  />
                  <Button onClick={updateSellerProfile}>
                    Salvează Descrierea
                  </Button>
                </CardContent>
              </Card>

              {/* Location */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Locația Fermei
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label>Adresa</Label>
                      <Input
                        value={profileEdit.address}
                        onChange={(e) => 
                          setProfileEdit({...profileEdit, address: e.target.value})}
                        placeholder="ex. Timișoara, Timiș"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label>Latitudine</Label>
                        <Input
                          type="number"
                          step="0.0001"
                          value={profileEdit.lat}
                          onChange={(e) => 
                            setProfileEdit({...profileEdit, lat: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Longitudine</Label>
                        <Input
                          type="number"
                          step="0.0001"
                          value={profileEdit.lng}
                          onChange={(e) => 
                            setProfileEdit({...profileEdit, lng: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                  <Button onClick={updateSellerProfile}>
                    Salvează Locația
                  </Button>
                </CardContent>
              </Card>

              {/* Working Hours */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Orarul de Funcționare
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    {Object.entries(profileEdit.workingHours).map(([day, hours]) => (
                      <div key={day} className="flex items-center gap-4">
                        <Label className="w-20 capitalize">{day}</Label>
                        <Input
                          value={hours}
                          onChange={(e) => setProfileEdit({
                            ...profileEdit,
                            workingHours: {
                              ...profileEdit.workingHours, 
                              [day]: e.target.value
                            }
                          })}
                          placeholder="ex. 08:00-18:00 sau Închis"
                        />
                      </div>
                    ))}
                  </div>
                  <Button onClick={updateSellerProfile}>
                    Salvează Orarul
                  </Button>
                </CardContent>
              </Card>

              {/* Gallery */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    Galeria Fermei
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {sellerProfile.gallery.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Galerie ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImageFromGallery(image)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="URL imagine nouă..."
                      onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter') {
                          const target = e.target as HTMLInputElement;
                          addImageToGallery(target.value);
                          target.value = '';
                        }
                      }}
                    />
                    <Button
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        const button = e.currentTarget;
                        const input = button.parentElement?.querySelector('input') as HTMLInputElement;
                        if (input) {
                          addImageToGallery(input.value);
                          input.value = '';
                        }
                      }}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// TanStack Router route configuration
export const Route = createFileRoute('/SellerDashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SellerDashboard />
}