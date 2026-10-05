import type { Metadata } from "next";
import Footer from '../../components/Footer'
import Navbar from "@/components/Navbar"; // ha máshol van, módosítsd az útvonalat: pl. '../../components/Navbar'
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Bizánci Forrás Egyesület",
  description: "A keleti keresztény hagyomány, liturgia és kultúra élő forrása.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hu">
      <body suppressHydrationWarning className="min-h-screen bg-[#fcfbf9] text-stone-900 antialiased selection:bg-amber-100 selection:text-amber-900">
        {/* Felső rögzített navigációs sáv */}
        <Navbar />

        {/* pt-20 térköz szükséges, hogy a 80px magas rögzített menü ne takarja ki az oldal tetejét */}
        <main className="pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}