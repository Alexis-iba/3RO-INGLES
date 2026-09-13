import { Baloo_2, Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
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
