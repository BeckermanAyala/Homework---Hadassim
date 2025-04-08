export interface Product {
  name: string;
  quantity: number;
}

export interface Supplier {
  _id: string;
  companyName: string;
  productsOffered: {
    name: string;
    price: number;
    minQuantity: number;
  }[];
  representativeName?: string;
  phoneNumber?: string;
}

export interface Order {
  _id: string;
  orderId: string;
  products: Product[];
  status: 'חדש' | 'בתהליך' | 'הושלמה';
  supplierId?: Supplier;
  createdAt: string;
  storeOwnerId: string;
  supplierdytels: {
    companyName: string;
    phoneNumber: string;
    _id: string;
  };


}

export interface DecodedToken {
  id: string;
  role: string;
}