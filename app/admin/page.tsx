import AdminDashboard, { ProductWithSales } from "./AdminDashboard";

interface ApiProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

async function getProductsWithSales(): Promise<ProductWithSales[]> {
  const res = await fetch('https://fakestoreapi.com/products', {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const products: ApiProduct[] = await res.json();
  
  return products.map((p) => ({
    id: p.id,
    title: p.title,
    price: p.price,
    category: p.category,
    image: p.image,
    stock: Math.floor(Math.random() * 100) + 1,
    sales: Math.floor(Math.random() * 500),
    status: 'Active',
  }));
}

export default async function AdminPage() {
  const productsWithSales = await getProductsWithSales();
  return <AdminDashboard products={productsWithSales} />;
}