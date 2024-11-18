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
        <meta property="og:image" content="/assets/images/logo.svg" />
        <meta property="og:url" content="https://bookkrlo.com" />
      </head>
              
            <body>
                {children}
                <Toaster />
            </body>
        </html>
    );
}
