import './globals.css';
import { Toaster } from 'sonner';



export default function RootLayout({ children }) {
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
        <title>Bookkrlo - Effortless Ticket Booking</title>
       

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
