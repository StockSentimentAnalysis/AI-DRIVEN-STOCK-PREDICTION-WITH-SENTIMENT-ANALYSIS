import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "HBL Stock Prediction Dashboard — AI-Driven Sentiment Analysis Study",
  description:
    "Interactive research dashboard for the FYP study: AI-Driven Stock Prediction Using Sentiment Analysis — A Negative-Result Study of Habib Bank Limited on the Pakistan Stock Exchange. Hamdard University, BS CS 2026.",
  keywords: [
    "HBL",
    "stock prediction",
    "sentiment analysis",
    "BiLSTM",
    "FinBERT",
    "Pakistan Stock Exchange",
    "PSX",
    "negative result",
    "machine learning",
    "fintech",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
