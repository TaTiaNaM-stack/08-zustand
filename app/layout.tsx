import type { Metadata } from "next";
import { Roboto } from 'next/font/google';
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

export const metadata: Metadata = {
  title: "NoteHub",
  description: "A simple and efficient application for managing personal notes.",
  openGraph: {
    title: 'Create a NoteHub',
    description: 'Application for managing personal notes.',
    url: 'https://notehub.com/',
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630
      }
    ]
  }
};

const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-roboto', 
  display: 'swap', 
});


export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <TanStackProvider>
          <Header />
          <main>
            {modal}
            {children}            
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
