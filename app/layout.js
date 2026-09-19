import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import InstallAppBanner from "@/components/InstallAppBanner";
import PwaServiceWorker from "@/components/PwaServiceWorker";

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
  title: "Ploopi — Aprende inglés jugando",
  description: "Libros y recursos de inglés para niños de 3° de primaria.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Ploopi",
  },
};

export const viewport = {
  themeColor: "#ffd83d",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${baloo.variable} ${nunito.variable}`}>
      <body className="flex min-h-screen flex-col bg-bg-page text-navy antialiased">
        <Header />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <MobileBottomNav />
        <InstallAppBanner />
        <PwaServiceWorker />
      </body>
    </html>
  );
}
