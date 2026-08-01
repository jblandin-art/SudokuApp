import { Geist, Geist_Mono, Poppins, Playfair_Display, Inter } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider.jsx";

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

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Josiah Blanding - Full Stack Developer",
  description:
    "Full stack software developer specializing in React, Next.js, and modern web development. Explore my portfolio and projects.",
  keywords: [
    "Josiah Blanding",
    "software developer",
    "full stack",
    "React",
    "Next.js",
    "JavaScript",
    "web development",
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
    title: "Josiah Blanding - Full Stack Developer",
    description:
      "Explore my portfolio of web development projects and experience",
    url: "/",
    siteName: "Josiah Blanding Portfolio",
    images: [
      {
        url: "/headshotExtended.jpg",
        width: 1689,
        height: 1127,
        alt: "Josiah Blanding headshot",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Josiah Blanding - Full Stack Developer",
    description: "Check out my portfolio and projects",
    images: ["/headshotExtended.jpg"],
  },
};

export default function RootLayout({ children }) {
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
