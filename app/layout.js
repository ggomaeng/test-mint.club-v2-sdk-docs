import { Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({ subsets: ["latin"] });

const title = "Mint Club V2 SDK example (Test)";
const description = `Minimal Mint Club SDK Example. It's currently in development, and can change at any time.`;

export const metadata = {
  title,
  description,
  metadataBase: new URL("https://test-mint-club-v2-sdk-docs.vercel.app"),
  icons: {
    icon: "/apple-touch-icon.png",
    shortcut: "/apple-touch-icon.png",
    apple: "/apple-touch-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon.png",
    },
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    url: "https://test-mint-club-v2-sdk-docs.vercel.app",
    title,
    siteName: "Mint Club",
    description,
    images: [
      {
        url: `/pattern.png`,
        width: 1200,
        height: 666,
        alt: "Mint Club",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@MintClubPro",
    images: {
      url: `/pattern.png`,
      width: 1200,
      height: 666,
      alt: "Mint Club og",
    },
  },
  robots: {},
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={raleway.className}>{children}</body>
    </html>
  );
}
