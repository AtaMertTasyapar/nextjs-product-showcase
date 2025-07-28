import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartButton from '../../_components/AddToCartButton';

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

async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch product data, server responded with an error.');
  }

  const responseText = await res.text();

  if (!responseText) {
    return null;
  }

  try {
    return JSON.parse(responseText);
  } catch (error) {
    console.error("Malformed JSON for product ID:", id, error);
    return null;
  }
}


export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 lg:flex lg:items-center gap-10 animate-fade-in">
      <div className="lg:w-1/2 flex justify-center items-center p-6 bg-gray-50 rounded-lg overflow-hidden relative min-h-[300px] lg:min-h-[450px]">
        <Image
          src={product.image}
          alt={product.title}
          fill
          style={{ objectFit: "contain" }}
          className="transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="lg:w-1/2 mt-8 lg:mt-0">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 animate-slide-in-right">
          {product.title}
        </h1>
        <p className="text-lg text-blue-700 font-semibold mb-3">Category: {product.category}</p>
        <p className="text-gray-700 text-md leading-relaxed mb-6 animate-fade-in-up">
          {product.description}
        </p>
        <div className="flex items-baseline gap-4 mb-6">
          <span className="text-5xl font-bold text-blue-800 animate-fade-in-up delay-200">${product.price.toFixed(2)}</span>
          <span className="text-lg text-gray-500 line-through">${(product.price * 1.2).toFixed(2)}</span>
        </div>
        <div className="mb-8">
          <p className="text-gray-600 text-sm">
            Rating: <span className="font-semibold text-gray-800">{product.rating.rate}</span> (based on {product.rating.count} reviews)
          </p>
        </div>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}