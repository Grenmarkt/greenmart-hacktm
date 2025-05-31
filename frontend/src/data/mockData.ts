import type { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Mere Roșii Ecologice",
    description: "Mere proaspete și crocante, crescute fără pesticide. Perfecte pentru gustări, copt sau pentru sos de mere făcut în casă.",
    price: 3.99,
    imageUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6",
    category: "fructe",
    farmName: "Livada Valea Verde",
    location: {
      lat: 45.7489,
      lng: 21.2087
    },
    rating: 4.8,
    reviewCount: 24
  },
  {
    id: 2,
    name: "Morcovi Baby Proaspeți",
    description: "Morcovi baby fragezi și dulci, proaspăt recoltați din ferma noastră sustenabilă. Excelenti pentru salate sau ca gustare sănătoasă.",
    price: 2.49,
    imageUrl: "https://images.unsplash.com/photo-1598170845058-c2eec1a2c461",
    category: "legume",
    farmName: "Ferma Soarelui",
    location: {
      lat: 45.7589,
      lng: 21.2287
    },
    rating: 4.6,
    reviewCount: 18
  },
  {
    id: 3,
    name: "Vin Roșu Cabernet Sauvignon",
    description: "Vin roșu corpolent cu note de cireșe negre și stejar. Asociere perfectă cu preparatele din carne roșie.",
    price: 19.99,
    imageUrl: "https://images.unsplash.com/photo-1553361371-9b22c37a411d",
    category: "sucuri_si_bauturi_alcoolice",
    farmName: "Via Dealuri",
    location: {
      lat: 45.7689,
      lng: 21.2387
    },
    rating: 4.9,
    reviewCount: 32
  },
  {
    id: 4,
    name: "Căpșuni Proaspete",
    description: "Căpșuni dulci și suculente culese la maturitatea optimă. Excelente pentru deserturi sau consum proaspăt.",
    price: 4.99,
    imageUrl: "https://images.unsplash.com/photo-1518635017498-87f514b751ba",
    category: "fructe",
    farmName: "Ferma Berry Best",
    location: {
      lat: 45.7789,
      lng: 21.1987
    },
    rating: 4.7,
    reviewCount: 29
  },
  {
    id: 5,
    name: "Spanac Organic",
    description: "Verdeață bogată în nutrienți. Perfectă pentru salate, sotare sau adăugat în smoothie-uri.",
    price: 3.49,
    imageUrl: "https://images.unsplash.com/photo-1576045057995-568f588f82fb",
    category: "legume",
    farmName: "Green Acres",
    location: {
      lat: 45.7889,
      lng: 21.2487
    },
    rating: 4.5,
    reviewCount: 15
  },
  {
    id: 6,
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
  },
  {
    id: 7,
    name: "Pere Bartlett Organice",
    description: "Pere dulci și suculente, organice. Excelente consumate proaspete sau folosite în salate și deserturi.",
    price: 4.49,
    imageUrl: "https://images.unsplash.com/photo-1514756331096-242fdeb70d4a",
    category: "fructe",
    farmName: "Livada Înaltă",
    location: {
      lat: 45.8089,
      lng: 21.2687
    },
    rating: 4.6,
    reviewCount: 17
  },
  {
    id: 8,
    name: "Vin Alb Chardonnay",
    description: "Vin alb de corp mediu cu note de mere, pere și fructe tropicale. Perfect alături de preparate din pește sau pui.",
    price: 17.99,
    imageUrl: "https://images.unsplash.com/photo-1586370434639-0fe43b2d32e6",
    category: "sucuri_si_bauturi_alcoolice",
    farmName: "Via Pantă Însorită",
    location: {
      lat: 45.8189,
      lng: 21.2787
    },
    rating: 4.7,
    reviewCount: 26
  },
  {
    id: 9,
    name: "Broccoli Proaspăt",
    description: "Buchete de broccoli crocante și fragede. Bogate în nutrienți și versatile pentru multe rețete.",
    price: 2.99,
    imageUrl: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc",
    category: "legume",
    farmName: "Ferma Valley View",
    location: {
      lat: 45.8289,
      lng: 21.2887
    },
    rating: 4.5,
    reviewCount: 14
  },
  {
    id: 10,
    name: "Miere de Salcâm",
    description: "Miere naturală, culeasă din flori de salcâm. Gust delicat și textură cremoasă.",
    price: 8.49,
    imageUrl: "https://images.unsplash.com/photo-1587049352851-8d4e89133924",
    category: "miere_si_gemuri",
    farmName: "Stupina Albina Harnică",
    location: {
      lat: 45.8389,
      lng: 21.2987
    },
    rating: 4.9,
    reviewCount: 31
  },
  {
    id: 11,
    name: "Castraveți Murați",
    description: "Castraveți murați după rețetă tradițională. Crocanți și plini de aromă.",
    price: 3.99,
    imageUrl: "https://images.unsplash.com/photo-1593629718768-e8860d846178",
    category: "muraturi",
    farmName: "Gospodăria Bunătăți",
    location: {
      lat: 45.8489,
      lng: 21.3087
    },
    rating: 4.4,
    reviewCount: 19
  },
  {
    id: 12,
    name: "Făină de Grâu Integrală",
    description: "Făină de grâu integral, măcinată lent la piatră. Ideală pentru pâine și produse de patiserie sănătoase.",
    price: 2.79,
    imageUrl: "https://images.unsplash.com/photo-1568254183919-78a4f43a2877",
    category: "cereale",
    farmName: "Moara Veche",
    location: {
      lat: 45.8589,
      lng: 21.3187
    },
    rating: 4.7,
    reviewCount: 22
  },
  {
    id: 13,
    name: "Pulpă de Porc",
    description: "Carne de porc proaspătă de la animale crescute în mod natural, fără hormoni sau antibiotice.",
    price: 9.99,
    imageUrl: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f",
    category: "carne",
    farmName: "Ferma Porcul Fericit",
    location: {
      lat: 45.8689,
      lng: 21.3287
    },
    rating: 4.6,
    reviewCount: 27
  },
];