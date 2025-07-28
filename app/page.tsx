import ProductGrid from './_components/ProductGrid';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch('https://fakestoreapi.com/products', { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}

export default async function HomePage() {
  let products: Product[] = [];
  let error: string | null = null;

  try {
    products = await getProducts();
  } catch (err) {
    error = (err as Error).message;
  }

  return (
    <section className="py-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10 tracking-tight leading-tight animate-fade-in-down">
        Explore Our Products
      </h1>
      {error ? (
        <div className="text-center text-red-600 text-xl font-semibold">
          Error loading products: {error}. Please try again later.
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </section>
  );
}