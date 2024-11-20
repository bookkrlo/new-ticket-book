import './globals.css';
import { Toaster } from 'sonner';
import Head from 'next/head';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Default meta tags (Main page)
  const defaultMeta = {
    title: "Bookkrlo - Book and Sell Tickets for Events, Movies, and Travel",
    description:
      "Explore and book tickets for events, movies, and travel. Your one-stop platform for easy ticketing.",
    image:
      "https://res.cloudinary.com/di0zgxtka/image/upload/v1732079706/book_kr_lo_logo_500_x_500_lohroq.webp",
    url: "https://bookkrlo.com",
  };

  // Custom meta tags for specific routes
  const meta =
    pathname === "/inspirecon24"
      ? {
          title: "InspireCon'24 - Empowering Entrepreneurs",
          description:
            "Join the biggest entrepreneurial event of the year. Gain insights from renowned speakers and network with like-minded individuals.",
          image:
            "https://res.cloudinary.com/di0zgxtka/image/upload/v1732079438/inspirecon-dropdown-banner_sgrdmj.webp",
          url: "https://bookkrlo.com/inspirecon24",
        }
      : defaultMeta;

  return (
    <html lang="en">
      <head>
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Bookkrlo",
              url: "https://bookkrlo.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://bookkrlo.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* Meta Tags */}
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.image} />
        <meta property="og:url" content={meta.url} />
      </head>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
