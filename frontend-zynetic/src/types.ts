export interface Product {
    _id?: string;
    name: string;
    description: string;
    category: string;
    price: number;
    rating: number;
    image?: string;
  }
  
  export interface UserCredentials {
    email: string;
    password: string;
  }
  