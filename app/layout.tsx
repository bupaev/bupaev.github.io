import type { Metadata } from "next";
import "@/styles/tailwind.css";
import "@/styles/global.scss";

export const metadata: Metadata = {
  title: "Paul Buramensky",
  description:
    "Creative front-end developer who cares about user experience and tries to make the world a better place",
  formatDetection: {
    telephone: false,
  },
  robots: "all",
  openGraph: {
    type: "website",
    siteName: "My personal page",
    url: "https://paulbu.com",
    title: "Hi! I'm Paul Buramensky and that's my page",
    description:
      "I'm front-end developer who cares about user experience and tries to make the world a better place",
    images: [
      {
        url: "https://paulbu.com/pics/portrait-1-og.jpg",
        width: 968,
        height: 504,
      },
    ],
    locale: "en",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="color-scheme" content="light dark" />
        <link rel="stylesheet" href="/fonts/index.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
