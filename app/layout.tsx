import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavbarClient from "./_components/NavbarWrapper";
import CartAnimationOverlay from "./_components/CartAnimationOverlay";
import ThemeManager from "./_components/ThemeManager";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mobiversite Product Showcase",
  description: "A professional product showcase built with Next.js",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 text-gray-800 antialiased flex flex-col min-h-screen transition-colors duration-300`}>
        <ThemeManager />
        <NavbarClient />
        <main className="container mx-auto p-4 flex-grow w-full">
          {children}
        </main>
        <footer className="bg-gray-800 text-white text-center p-4">
          <div className="container mx-auto">
            <p>&copy; {new Date().getFullYear()} Mobiversite Product Showcase.</p>
          </div>
        </footer>
        <CartAnimationOverlay />
      </body>
    </html>
  );
}
