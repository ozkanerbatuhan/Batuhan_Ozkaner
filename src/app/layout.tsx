import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://batuhanozkaner.vercel.app"),
  title: "Batuhan Özkaner — Full-Stack Developer & Engineer",
  description:
    "Portfolio of Batuhan Özkaner — double-major engineer (Energy Systems + Electrical & Electronics) and full-stack developer building mobile apps, web platforms, and hardware systems.",
  keywords: [
    "Batuhan Özkaner",
    "Full-Stack Developer",
    "React Native",
    "Next.js",
    "FPGA",
    "Energy Systems Engineering",
    "Embedded",
  ],
  authors: [{ name: "Batuhan Özkaner" }],
  openGraph: {
    title: "Batuhan Özkaner — Full-Stack Developer & Engineer",
    description:
      "Double-major engineer and full-stack developer. Mobile apps, web platforms, and hardware systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${inter.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
