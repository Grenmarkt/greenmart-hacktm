export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category:
    | 'fructe'
    | 'legume'
    | 'lactate'
    | 'cereale'
    | 'carne'
    | 'miere_si_gemuri'
    | 'muraturi'
    | 'sucuri_si_bauturi_alcoolice';
  farmName: string;
  location: {
    lat: number;
    lng: number;
  };
  rating: number;
  reviewCount: number;
}


export type Category = 'Toate' |'fructe' | 'legume' | 'lactate' | 'cereale' | 'carne' | 'miere_si_gemuri' | 'muraturi' | 'sucuri_si_bauturi_alcoolice';