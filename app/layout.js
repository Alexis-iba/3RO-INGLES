import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const baloo = localFont({
  src: "./fonts/baloo-2-latin.woff2",
  display: "swap",
  variable: "--font-baloo",
  weight: "400 800",
});

const nunito = localFont({
  src: "./fonts/nunito-latin.woff2",
  display: "swap",
  variable: "--font-nunito",
  weight: "400 800",
});

export const metadata = {
  title: "EnglishKids — Aprende inglés jugando",
  description: "Libros y recursos de inglés para niños de 3° de primaria.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${baloo.variable} ${nunito.variable}`}>
      <body className="flex min-h-screen flex-col bg-bg-page text-navy antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
