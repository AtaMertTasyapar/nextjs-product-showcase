import AdminDashboard from './AdminDashboard';

type ProductWithSales = {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  sales: number;
  status: 'Active' | 'Disabled';
};

async function getProducts(): Promise<ProductWithSales[]> {
  const res = await fetch('https://fakestoreapi.com/products', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  const products = await res.json();
  
  return products.map((p: any) => ({
    ...p,
    stock: Math.floor(Math.random() * 100) + 1,
    sales: Math.floor(Math.random() * 500) + 10,
    status: 'Active',
  }));
}

export default async function AdminPage() {
  const products = await getProducts();
  return <AdminDashboard products={products} />;
}