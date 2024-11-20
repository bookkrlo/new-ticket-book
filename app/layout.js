import './globals.css';
import { Toaster } from 'sonner';
import Head from 'next/head';
import useRouter from 'next/router';

{/*
        <meta
          name="description"
          content="Book tickets for events, movies, and travel easily with Bookkrlo."
        />
        <meta name="keywords" content="bookkrlo, book karlo, book krlo, bookkarlo.com, bookkrlo.com ,tickets, events, movies, travel" />
        <meta name="author" content="Bookkrlo Team" />
        <meta property="og:title" content="Bookkrlo - Book Tickets Online" />
        <meta
          property="og:description"
          content="Events Near or Far! Just Book Krlo, Yaar!"
        />
        <meta property="og:image" content="https://res.cloudinary.com/di0zgxtka/image/upload/v1732079706/book_kr_lo_logo_500_x_500_lohroq.webp" />
        <meta property="og:url" content="https://bookkrlo.com" />
*/}

export default function RootLayout({ children }) {
     const router = useRouter();

    {/* Default meta tags (Main page)  */}
  const defaultMeta = {
    title: "Bookkrlo - Book and Sell Tickets for Events, Movies, and Travel",
    description: "Explore and book tickets for events, movies, and travel. Your one-stop platform for easy ticketing.",
    image: "https://res.cloudinary.com/di0zgxtka/image/upload/v1732079706/book_kr_lo_logo_500_x_500_lohroq.webp",
    url: "https://bookkrlo.com",
  };

    {/* Custom meta tags for specific routes */}
  const meta = router.pathname === "/inspirecon24"
    ? {
        title: "InspireCon'24 - Empowering Entrepreneurs",
        description:
          "Join the biggest entrepreneurial event of the year. Gain insights from renowned speakers and network with like-minded individuals.",
        image: "https://res.cloudinary.com/di0zgxtka/image/upload/v1732079438/inspirecon-dropdown-banner_sgrdmj.webp",
        url: "https://bookkrlo.com/inspirecon24",
      }
    : defaultMeta;


    
    return (
        <html lang='en'>
        <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Bookkrlo",
              "url": "https://bookkrlo.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://bookkrlo.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
            
         <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.image} />
        <meta property="og:url" content={meta.url} />
       

              {/* <script>
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '943134844582031');
                fbq('track', 'PageView');
                </script>
                <noscript><img height="1" width="1" style="display:none"
                src="https://www.facebook.com/tr?id=943134844582031&ev=PageView&noscript=1"
                />
          </noscript> */}
 
              
      </head>
              
            <body>
                {children}
                <Toaster />
            </body>
        </html>
    );
}
