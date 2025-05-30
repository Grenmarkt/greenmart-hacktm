import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";


// pagina pentru search produse locale , de modificat in stil airbnb maine la prima ora

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  rating: number;
  reviews: number;
  location: [number, number];
  address: string;
  imageUrl: string;
  category: string;
  farmer: string;
}

const ProductSearchPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [mapStyle, setMapStyle] = useState<string>("mapbox://styles/mapbox/streets-v11");
  
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  //const popupRef = useRef<mapboxgl.Popup | null>(null);

  // Initialize Mapbox
  mapboxgl.accessToken = 'pk.eyJ1IjoidGFnZXN0dWRpbyIsImEiOiJjbTlrM3o5eXUwaWVjMmtzZ3ltcDAwazR6In0.tLphe6RSpLB4jbjdYuBg4g';

useEffect(() => {
  // Mock product data for local farm products
  const mockProducts: Product[] = [
    {
      id: 1,
      name: "Organic Apples",
      price: 3.5,
      description: "Fresh organic apples from local orchard",
      rating: 4.8,
      reviews: 24,
      location: [-74.006, 40.7128] as [number, number],
      address: "123 Farm Rd, New York",
      imageUrl: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
      category: "Fruits",
      farmer: "Green Valley Farm"
    },
    {
      id: 2,
      name: "Free-range Eggs",
      price: 5.2,
      description: "Dozen free-range chicken eggs",
      rating: 4.5,
      reviews: 18,
      location: [-73.9942, 40.7282] as [number, number],
      address: "456 Countryside Ln, New York",
      imageUrl: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
      category: "Dairy & Eggs",
      farmer: "Sunny Side Farm"
    },
    {
      id: 3,
      name: "Artisanal Cheese",
      price: 8.9,
      description: "Handcrafted goat cheese",
      rating: 4.9,
      reviews: 32,
      location: [-73.9851, 40.7589] as [number, number],
      address: "789 Pasture Ave, New York",
      imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
      category: "Dairy & Eggs",
      farmer: "Happy Goat Dairy"
    },
    {
      id: 4,
      name: "Heirloom Tomatoes",
      price: 4.5,
      description: "Organic heirloom tomatoes",
      rating: 4.7,
      reviews: 15,
      location: [-73.9872, 40.7309] as [number, number],
      address: "101 Garden St, New York",
      imageUrl: "https://images.unsplash.com/photo-1592841200221-a6899c250b17?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
      category: "Vegetables",
      farmer: "Heritage Gardens"
    },
    {
      id: 5,
      name: "Fresh Honey",
      price: 7.5,
      description: "Raw local honey",
      rating: 4.6,
      reviews: 21,
      location: [-74.017, 40.7033] as [number, number],
      address: "222 Meadow St, New York",
      imageUrl: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
      category: "Pantry",
      farmer: "Busy Bee Apiary"
    },
    {
      id: 6,
      name: "Organic Kale",
      price: 3.8,
      description: "Freshly picked organic kale",
      rating: 4.4,
      reviews: 12,
      location: [-73.9998, 40.7214] as [number, number],
      address: "333 Harvest Ln, New York",
      imageUrl: "https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
      category: "Vegetables",
      farmer: "Leafy Greens Farm"
    },
  ];
  setProducts(mockProducts);
}, []);
  useEffect(() => {
    if (!mapContainer.current || products.length === 0) return;

    // Initialize map only once
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: mapStyle,
        center: [-74.006, 40.7128],
        zoom: 11
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    }

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add markers for each product
    products.forEach(product => {
      const el = document.createElement('div');
      el.className = `marker ${selectedProduct === product.id ? 'selected' : ''}`;
      
      const marker = new mapboxgl.Marker(el)
        .setLngLat(product.location)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="popup-content">
                <h3 class="font-semibold">${product.name}</h3>
                <p class="text-sm">$${product.price.toFixed(2)}</p>
                <p class="text-xs text-gray-600">${product.farmer}</p>
              </div>
            `)
        )
        .addTo(map.current!);

      el.addEventListener('click', () => {
        setSelectedProduct(product.id);
        const productElement = document.getElementById(`product-${product.id}`);
        if (productElement) {
          productElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      });

      markers.current.push(marker);
    });

    // Update map style when changed
    if (map.current) {
      map.current.setStyle(mapStyle);
    }

    return () => {
      // Clean up markers when component unmounts
      markers.current.forEach(marker => marker.remove());
    };
  }, [products, selectedProduct, mapStyle]);

  const handleProductHover = (productId: number) => {
    setSelectedProduct(productId);
    // Highlight the corresponding marker
    markers.current.forEach(marker => {
      const el = marker.getElement();
      if (el) {
        el.className = `marker ${marker.getLngLat().toString() === products.find(p => p.id === productId)?.location.toString() ? 'selected' : ''}`;
      }
    });
  };

  const handleProductLeave = () => {
    setSelectedProduct(null);
    // Reset all markers
    markers.current.forEach(marker => {
      const el = marker.getElement();
      if (el) {
        el.className = 'marker';
      }
    });
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.farmer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesRating =
      ratingFilter === null || product.rating >= ratingFilter;
    return matchesSearch && matchesPrice && matchesRating;
  });

  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<i key={i} className="fas fa-star text-yellow-400"></i>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <i key={i} className="fas fa-star-half-alt text-yellow-400"></i>,
        );
      } else {
        stars.push(<i key={i} className="far fa-star text-yellow-400"></i>);
      }
    }
    return stars;
  };

  const toggleMapStyle = () => {
    setMapStyle(prev => 
      prev === "mapbox://styles/mapbox/streets-v11" 
        ? "mapbox://styles/mapbox/satellite-streets-v11" 
        : "mapbox://styles/mapbox/streets-v11"
    );
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      {/* Coloana din stânga - Lista produse */}
      <div className="w-2/5 h-full flex flex-col border-r border-gray-200 bg-white">
        {/* Filtre și căutare */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Caută produse locale..."
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search absolute right-3 top-2.5 text-gray-400"></i>
          </div>
        </div>

        {/* Lista produse - 3 pe rând */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow border border-gray-200 p-3">
                <div className="h-40 mb-2 overflow-hidden rounded">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-green-600 font-bold">{product.price} RON</p>
                <p className="text-sm text-gray-500">{product.farmer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Coloana din dreapta - Harta */}
      <div className="w-3/5 h-full relative">
        <div ref={mapContainer} className="w-full h-full" />
        
        {/* Legenda */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3 z-10">
          <h4 className="font-medium mb-2">Legenda Hartă</h4>
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm">Ferme Locale</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSearchPage;