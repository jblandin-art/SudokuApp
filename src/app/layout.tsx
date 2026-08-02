import { Geist, Geist_Mono, Poppins, Playfair_Display, Inter } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider.jsx";
import type { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = "https://webpages.charlotte.edu/jblandin";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Sudoku Solver - Free Online Sudoku Game",
  description:
    "Play Sudoku online for free! Challenge yourself with easy, medium, and expert difficulty levels. The classic number puzzle game is now available in your browser.",
  keywords: [
    "Sudoku",
    "puzzle game",
    "online Sudoku",
    "free Sudoku",
    "number puzzle",
    "logic game",
    "brain game",
    "daily puzzle",
  ],
  authors: [{ name: "Josiah Blanding" }],
  creator: "Josiah Blanding",
  publisher: "Josiah Blanding",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  openGraph: {
    title: "Sudoku Solver - Free Online Sudoku Game",
    description:
      "Play Sudoku online for free! Challenge yourself with easy, medium, and expert difficulty levels.",
    url: "/",
    siteName: "Sudoku Solver",
    images: [
      {
        url: "/headshotExtended.jpg",
        width: 1689,
        height: 1127,
        alt: "Sudoku game interface",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sudoku Solver - Free Online Sudoku Game",
    description: "Play Sudoku online for free! Challenge yourself with multiple difficulty levels.",
    images: ["/headshotExtended.jpg"],
  },
};

export default function RootLayout({ children } : Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en" suppressHydrationWarning
    >
      <body className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${playfairDisplay.variable} ${inter.variable} px-6 py-4`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
