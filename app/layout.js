import './globals.css';
import { Toaster } from 'sonner';



export default function RootLayout({ children }) {
    return (
        <html lang='en'>
        <head>
        
        <title>Bookkrlo - Effortless Ticket Booking</title>
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
        <meta property="og:image" content="@/assets/images/logo.svg" />
        <meta property="og:url" content="https://bookkrlo.com" />

            <script>
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
          </noscript>
 
              
      </head>
              
            <body>
                {children}
                <Toaster />
            </body>
        </html>
    );
}
