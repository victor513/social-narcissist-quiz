import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "What Type of Narcissist Are You? 😈💅",
  description:
    "Take the viral quiz and find out your narcissist archetype — funny, spicy, and way too accurate 🔥",
  openGraph: {
    title: "What Type of Narcissist Are You? 😈💅",
    description:
      "Take the viral quiz and find out your narcissist archetype — funny, spicy, and way too accurate 🔥",
    url: "https://social-narcissist-quiz.vercel.app",
    siteName: "Social Narcissist Quiz",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "What Type of Narcissist Are You?",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "What Type of Narcissist Are You? 😈💅",
    description:
      "Take the viral quiz and find out your narcissist archetype — funny, spicy, and way too accurate 🔥",
    images: ["/preview.png"],
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
