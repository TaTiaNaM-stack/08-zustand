import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "Sorry, the page you are looking for does not exist.",
  openGraph: {
    title: "404 - Page Not Found",
    description: "Sorry, the page you are looking for does not exist.",
    url: "https://notehub.com/404",
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: "404 - Page Not Found",
      },
    ],
    type: 'article',
  },

};

const NotFound = () => {
  return (
    <div>
     <h1 style={{color: '#1a1a1a', marginBottom: '60px', fontSize: '36px', fontWeight: 'bold', textAlign: 'center'}}>404 - Page not found</h1>
    <p style={{color: '#444444', marginBottom: '16px', fontSize: '18px', lineHeight: '28px'}}>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;

