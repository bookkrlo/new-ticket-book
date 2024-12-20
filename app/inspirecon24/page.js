'use client';

import Head from 'next/head';
import Script from 'next/script';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, MapPin, Calendar, Clock, ChevronRight, Facebook, Instagram, X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toaster, toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

import banner from '@/assets/images/banner.png';
import ahmedRauf from '@/assets/images/speakers/ahmedRauf.png';
import kiranNayab from '@/assets/images/speakers/kiranNayab.png';
import maryamRao from '@/assets/images/speakers/maryamRao.png';
import mushPanjwani from '@/assets/images/speakers/mushPanjwani.png';
import saadAfridi from '@/assets/images/speakers/saadAfridi.png';
import saadLakhi from '@/assets/images/speakers/saadLakhi.png';
import usamaGhori from '@/assets/images/speakers/usamaGhori.png';
import usmanSaleem from '@/assets/images/speakers/usmanSaleem.png';
import wajihUdDin from '@/assets/images/speakers/wajihUdDin.png';
import faraz from '@/assets/images/speakers/faraz-bw.jpg';
import laman from '@/assets/images/speakers/laman-riaz.jpg';
import logo from '@/assets/images/logo.svg';
import dropdown from '@/assets/images/inspirecon-dropdown-banner.webp';


export default function Component() {
    const [activeTab, setActiveTab] = useState('tickets');
    const [ticketCount, setTicketCount] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('easypaisa');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [transactionDetails, setTransactionDetails] = useState(null);
    const [paymentError, setPaymentError] = useState(null);
    const [isListEventModalOpen, setIsListEventModalOpen] = useState(false);
    const [selectedTicketType, setSelectedTicketType] = useState('standard');
    const [screenshot, setScreenshot] = useState(null);

    const ticketPrices = {
        standard: 1000,
        pack: 4000,
    };

    const originalPrices = {
        standard: 1200,
        pack: 6000,
    };

    const packOfFivePrice = 4000;

    const speakers = [
       
          {
            name: 'Kiran Nayab',
            title: 'Event Host',
            handle: '',
            image: kiranNayab,
        },
        {
            name: 'Ahmed Rauf',
            title: 'Founder',
            handle: '@telemartofficalpage',
            image: ahmedRauf,
        },
        {
            name: 'Mush Panjwani',
            title: 'Founder',
            handle: '@Coffee Wagera',
            image: mushPanjwani,
        },
       
        {
            name: 'Saad Lakhi',
            title: 'Founder',
            handle: '@SRL Commercify',
            image: saadLakhi,
        },
         {
            name: 'Faraz',
            title: 'CEO',
            handle: '@Blackenwhite',
            image: faraz,
        },
         {
            name: 'Laman Riaz',
            title: 'CFO ',
            handle: '@BusCaro',
            image: laman,
        },
        
      
        {
            name: 'Wajih Uddin',
            title: 'Speaker',
            handle: '@Youth Club',
            image: wajihUdDin,
        },
      
    ];

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleScreenshotChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setScreenshot(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        setPaymentError(null);

        try {
            let response;
            if (paymentMethod === 'bank_transfer') {
                if (!screenshot) {
                    throw new Error(
                        'Please upload a screenshot of your bank transfer.'
                    );
                }

                response = await fetch('/api/payment/bank-transfer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        ticketCount:
                            selectedTicketType === 'standard' ? ticketCount : 5,
                        amountPaid:
                            selectedTicketType === 'standard'
                                ? ticketPrices.standard * ticketCount
                                : ticketPrices.pack,
                        screenshot,
                    }),
                });
            } else {
                response = await fetch(`/api/payment/${paymentMethod}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        amount:
                            selectedTicketType === 'standard'
                                ? ticketPrices.standard * ticketCount
                                : ticketPrices.pack,
                        ticketCount:
                            selectedTicketType === 'standard' ? ticketCount : 5,
                        phone: formData.phone,
                        email: formData.email,
                        orderId: Date.now().toString(),
                        type: 'wallet',
                    }),
                });
            }

            const data = await response.json();

            if (data.success) {
                setPaymentSuccess(true);
                setTransactionDetails(data.data);
                toast.success('Payment Successful!', {
                    description:
                        'Your payment has been processed and saved successfully.',
                    duration: 5000,
                });
            } else {
                throw new Error(data.message || 'Failed to process payment.');
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            setPaymentError(
                error.message || 'Failed to process payment. Please try again.'
            );
            toast.error('Payment Failed', {
                description:
                    error.message ||
                    'Failed to process payment. Please try again.',
            });
            setPaymentSuccess(false);
        } finally {
            setIsProcessing(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
        });
        setPaymentSuccess(false);
        setPaymentError(null);
        setTransactionDetails(null);
        setIsModalOpen(false);
        setScreenshot(null);
    };

    const handleTicketSelection = (type) => {
        setSelectedTicketType(type);
        if (type === 'pack') {
            setTicketCount(5);
        } else {
            setTicketCount(1);
        }
    };

    return (
            <>
         <Head>

        {/* schemas script started  */}
         <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              "name": "InspireCon'24",
              "startDate": "2024-11-26T11:00:00+05:00",
              "endDate": "2024-11-26T17:00:00+05:00",
              "location": {
                "@type": "Place",
                "name": "ST-13 Abul Hasan Isphahani Rd, Block 7 Gulshan-e-Iqbal",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "ST-13 Abul Hasan Isphahani Rd, Block 7 Gulshan-e-Iqbal",
                  "addressLocality": "Karachi",
                  "addressRegion": "Sindh",
                  "postalCode": "75300",
                  "addressCountry": "PK"
                }
              },
              "image": "https://bookkrlo.com/assets/images/inspirecon.jpg",
              "description": "InspireCon'24 is the biggest entrepreneurial event of the year, dedicated to empowering the next generation of rising entrepreneurs and freelancers.",
              "offers": {
                "@type": "Offer",
                "url": "https://bookkrlo.com/inspirecon24",
                "price": "1000",
                "priceCurrency": "PKR",
                "availability": "https://schema.org/InStock",
                "validFrom": "2024-10-01T00:00:00+05:00"
              },
              "performer": {
                "@type": "Person",
                "name": "Renowned Speakers"
              },
              "eventStatus": "https://schema.org/EventScheduled",
              "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode"
            }),
          }}
        />

        {/* schemas script ended  */}

             {/* Facebook Meta Pixel NoScript Fallback started */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=943134844582031&ev=PageView&noscript=1"
          />
        </noscript>

                 <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
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
          `,
        }}
      />

          {/* Facebook Meta Pixel NoScript Fallback ended  */}
          
        <title>Speakers - Bookkrlo</title>

             {/* GOOGLE META SEO STARTED  */}
        <meta
          name="description"
          content="InspireCon'24 is the biggest entrepreneurial event of the year, 
              dedicated to empowering the next generation of rising entrepreneurs and freelancers.
              This flagship event will bring together renowned speakers who will share their personal journeys, 
              insights, and expert advice on navigating the world of entrepreneurship.
              It's a unique opportunity for aspiring entrepreneurs to learn directly
              from successful business leaders and gain valuable guidance for building their own paths to success."
        />
        <meta
          name="keywords"
          content="inspirecon24,bookkrlo, Ahmed Rauf essa, Saad Afridi, and Mush Panjwani, event speakers, book events, conferences, talks"
        />
        <meta property="og:title" content="Inspirecon'24 - Bookkrlo" />
        <meta
          property="og:description"
          content="InspireCon'24: Empower Your Entrepreneurial Journey!"
        />
        <meta property="og:image" content="https://res.cloudinary.com/di0zgxtka/image/upload/v1732079438/inspirecon-dropdown-banner_sgrdmj.webp" />
        <meta property="og:url" content="https://bookkrlo.com/inspirecon24" />

                   {/* GOOGLE META SEO ENDED  */}
              
              </Head>
              
        <div className='min-h-screen bg-black text-white flex flex-col'>
            <nav className='border-b border-gray-800'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex justify-between items-center h-16'>
                        <div className='flex items-center'>
                            <Link
                                href='/'
                                className='text-2xl font-bold text-primary-400'
                            >
                                <Image
                                    src={logo}
                                    alt='Company Logo'
                                    width={100}
                                    height={100}
                                    priority
                                />
                            </Link>
                            <div className='hidden md:block ml-10'>
                                <div className='flex items-center space-x-4'>
                                    <Link
                                        href='/'
                                        className='text-gray-300 hover:text-white px-3 py-2'
                                    >
                                        Events
                                    </Link>
                                    <Link
                                        href='/'
                                        className='text-gray-300 hover:text-white px-3 py-2'
                                    >
                                        About
                                    </Link>
                                    <Link
                                        href='/'
                                        className='text-gray-300 hover:text-white px-3 py-2'
                                    >
                                        Contact
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <Button
                            className='bg-primary-600 hover:bg-primary-700 rounded-full'
                            onClick={() => setIsListEventModalOpen(true)}
                        >
                            List Your Event
                        </Button>
                    </div>
                </div>
            </nav>

            <div className='fill max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 relative w-full rounded-3xl overflow-hidden'>
                <div className='rounded-3xl overflow-hidden'>
                    <Image
                        src={banner}
                        alt='Event banner'
                        objectFit='cover'
                        priority
                        className='rounded-3xl overflow-hidden'
                    />
                </div>
            </div>

            <div className='flex-grow'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'>
                    <div>
                        <h1 className='text-4xl font-bold mb-2 text-primary-600'>
                            InspireCon'24 (Sold out)
                        </h1>
                        <h2 className='text-xl mb-4'>
                            Inspiring Journeys from Vision to Reality.
                        </h2>
                        <div className='flex flex-col items-start space-y-2 text-gray-200'>
                            <div className='flex items-center'>
                                <Calendar className='w-5 h-5 mr-2' />
                                <span>26 Nov 2024</span>
                            </div>
                            <div className='flex items-center'>
                                <Clock className='w-5 h-5 mr-2' />
                                <span>11:00 am</span>
                            </div>
                            <div className='flex items-center'>
                                <MapPin className='w-5 h-5 mr-2' />
                                <span>
                                    Main Auditorium, UIT University, Karachi
                                </span>
                            </div>
                        </div>
                    </div>

                    <Tabs defaultValue='tickets' className='w-full'>
                        <TabsList className='w-full grid grid-cols-3 rounded-full bg-gray-800'>
                            <TabsTrigger
                                value='tickets'
                                className='rounded-full'
                            >
                                Tickets
                            </TabsTrigger>
                            <TabsTrigger
                                value='details'
                                className='rounded-full'
                            >
                                Event Details
                            </TabsTrigger>
                            <TabsTrigger
                                value='location'
                                className='rounded-full'
                            >
                                Location
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value='tickets'>
                            <Card className='bg-gray-800 border-gray-700 rounded-3xl'>
                                <CardContent className='p-6'>
                                    <div className='space-y-6'>
                                        <div className='space-y-4'>
                                            <div
                                                onClick={() =>
                                                    handleTicketSelection(
                                                        'standard'
                                                    )
                                                }
                                                className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
                                                    selectedTicketType ===
                                                    'standard'
                                                        ? 'bg-primary-600 bg-opacity-20'
                                                        : 'hover:bg-gray-700'
                                                }`}
                                            >
                                                <div>
                                                    <h3 className='text-lg font-semibold text-gray-200'>
                                                        Early Bird Ticket
                                                    </h3>
                                                    <p className='text-gray-300'>
                                                        <span className='line-through mr-2'>
                                                            Rs{' '}
                                                            {
                                                                originalPrices.standard
                                                            }
                                                        </span>
                                                        Rs{' '}
                                                        {ticketPrices.standard}
                                                    </p>
                                                </div>
                                                {selectedTicketType ===
                                                    'standard' && (
                                                    <div className='flex items-center space-x-4'>
                                                        <Button
                                                            variant='outline'
                                                            size='icon'
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setTicketCount(
                                                                    Math.max(
                                                                        1,
                                                                        ticketCount -
                                                                            1
                                                                    )
                                                                );
                                                            }}
                                                            className='rounded-full border-gray-700'
                                                        >
                                                            <Minus className='h-4 w-4' />
                                                        </Button>
                                                        <span className='w-8 text-center text-gray-200'>
                                                            {ticketCount}
                                                        </span>
                                                        <Button
                                                            variant='outline'
                                                            size='icon'
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setTicketCount(
                                                                    ticketCount +
                                                                        1
                                                                );
                                                            }}
                                                            className='rounded-full border-gray-700'
                                                        >
                                                            <Plus className='h-4 w-4' />
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>

                                            <div
                                                onClick={() =>
                                                    handleTicketSelection(
                                                        'pack'
                                                    )
                                                }
                                                className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
                                                    selectedTicketType ===
                                                    'pack'
                                                        ? 'bg-primary-600 bg-opacity-20'
                                                        : 'hover:bg-gray-700'
                                                }`}
                                            >
                                                <div>
                                                    <h3 className='text-lg font-semibold text-gray-200'>
                                                        Pack of 5 Tickets
                                                    </h3>
                                                    <p className='text-gray-300'>
                                                        <span className='line-through mr-2'>
                                                            Rs{' '}
                                                            {
                                                                originalPrices.pack
                                                            }
                                                        </span>
                                                        Rs {ticketPrices.pack}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='border-t border-gray-700 pt-4'>
                                            <div className='flex justify-between text-lg font-semibold text-gray-200'>
                                                <span>Total Amount</span>
                                                <span>
                                                    Rs{' '}
                                                    {selectedTicketType ===
                                                    'standard'
                                                        ? ticketPrices.standard *
                                                          ticketCount
                                                        : ticketPrices.pack}
                                                </span>
                                            </div>
                                        </div>

                                        {/* <Button
                                            className='w-full bg-primary-600 hover:bg-primary-700 rounded-full'
                                            onClick={() => setIsModalOpen(true)}
                                        >
                                            Proceed to Checkout
                                            <ChevronRight className='ml-2 h-4 w-4' />
                                        </Button> */}
                                        <Button
                                            className='w-full bg-gray-600 hover:bg-gray-600 rounded-full cursor-not-allowed'
                                        >
                                            Sold out
                                            <ChevronRight className='ml-2 h-4 w-4' />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value='details'>
                            <Card className='bg-gray-800 border-gray-700 rounded-3xl'>
                                <CardContent className='p-6 space-y-4'>
                                    <h3 className='text-2xl font-bold text-primary-600'>
                                        About the Event
                                    </h3>
                                    <p className='text-gray-200'>
                                       InspireCon'24 is the biggest entrepreneurial event of the year,
                                                dedicated to empowering the next generation of rising
                                                entrepreneurs and freelancers. This flagship event will bring
                                                    together renowned speakers who will share their personal journeys,
                                                        insights, and expert advice on navigating the world of entrepreneurship.
                                                        It's a unique opportunity for aspiring entrepreneurs to learn directly from 
                                                        successful business leaders and gain valuable guidance for building their own paths to success.
                                    </p>
                                    <div className='space-y-2'>
                                        <p className='text-gray-200'>
                                            <strong>Date:</strong> 26 Nov 2024
                                        </p>
                                        <p className='text-gray-200'>
                                            <strong>Gates Open:</strong> 10:00 AM
                                        </p>
                                        <p className='text-gray-200'>
                                            <strong>Event Time:</strong> 11:00 am - 4:00pm

                                        </p>
                                        <p className='text-gray-200'>
                                            <strong>Venue:</strong> Main
                                            Auditorium, UIT University, Karachi
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value='location'>
                            <Card className='bg-gray-800 border-gray-700 rounded-3xl'>
                                <CardContent className='p-6 space-y-4'>
                                    <div className='flex items-center mb-4'>
                                        <MapPin className='text-white w-5 h-5 mr-2' />
                                        <span className='text-gray-200'>
                                            Main Auditorium, UIT University,
                                            Karachi
                                        </span>
                                    </div>
                                    <div className='h-[400px] w-full bg-gray-800 rounded-3xl overflow-hidden'>
                                        <iframe
                                            src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14472.50780329386!2d67.1088845!3d24.9277448!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb338c700571b09%3A0xd86779b29e77f36a!2sUIT%20University!5e0!3m2!1sen!2s!4v1731139443563!5m2!1sen!2s'
                                            width='100%'
                                            height='100%'
                                            style={{ border: 0 }}
                                            allowFullScreen=''
                                            loading='lazy'
                                            referrerPolicy='no-referrer-when-downgrade'
                                            className='rounded-3xl'
                                        ></iframe>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                        <h2 className='text-3xl font-bold mb-8 text-center'>
                            <span className='text-primary-600 '>OUR SPEAKERS</span>
                        </h2>
                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                            {speakers.map((speaker, index) => (
                                <Card
                                    key={index}
                                    className='bg-gray-800 border-gray-700 rounded-3xl'
                                >
                                    <CardContent className='p-4'>
                                        <div className='aspect-square relative mb-4 rounded-3xl overflow-hidden'>
                                            <Image
                                                src={speaker.image}
                                                alt={speaker.name}
                                                layout='fill'
                                                objectFit='cover'
                                                sizes='(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw'
                                            />
                                        </div>
                                        <h3 className='text-lg font-bold text-gray-200 break-words hyphens-auto'>
                                            {speaker.name}
                                        </h3>
                                        <p className='text-sm text-primary-600 break-words'>
                                            {speaker.title}
                                        </p>
                                        {speaker.handle && (
                                            <p className='text-xs text-gray-400 break-words'>
                                                {speaker.handle}
                                            </p>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

 <footer className='bg-gray-800 border-t border-gray-700'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                    <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
                        <div>
                            <h3 className='text-lg font-semibold mb-4 text-primary-600 text-center'>
                                Socials
                            </h3>
                            <div className='flex space-x-4 items-center justify-center'>
                                <Link
                                    href='https://www.facebook.com/bookkrlo'
                                    aria-label='Facebook'
                                    className='text-gray-300 hover:text-white'
                                >
                                    <Facebook className='w-6 h-6' />
                                </Link>
                                <Link
                                    href='https://www.instagram.com/bookkrlo/'
                                    aria-label='Instagram'
                                    className='text-gray-300 hover:text-white'
                                >
                                    <Instagram className='w-6 h-6' />
                                </Link>
                            </div>
                        </div>
                        {/* <div>
                            <h3 className='text-lg font-semibold mb-4 text-white'>
                                Resources
                            </h3>
                            <ul className='space-y-2'>
                                <li>
                                    <Link
                                        href='/'
                                        className='text-gray-300 hover:text-white'
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href='/'
                                        className='text-gray-300 hover:text-white'
                                    >
                                        Terms
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href='/'
                                        className='text-gray-300 hover:text-white'
                                    >
                                        Privacy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href='/'
                                        className='text-gray-300 hover:text-white'
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div> */}
                        <div>
                            <h3 className='text-lg font-semibold mb-4 text-primary-600 text-center'>
                                Contact
                            </h3>
                            <p className='text-gray-300 text-center'>
                                bookkrlo.info@gmail.com
                            </p>
                        </div>
                        <div className='flex flex-col items-center justify-center space-y-2'>
                            <Link
                                href='/'
                                className='text-2xl font-bold text-primary-600 text-center'
                            >
                                <Image
                                    src={logo}
                                    alt='Company Logo'
                                    width={100}
                                    height={100}
                                    priority
                                />
                            </Link>
                            <p className='text-gray-300 mt-2 text-center'>
                                Event near or far, just book krlo yaar!
                            </p>
                        </div>
                    </div>
                </div>
            </footer>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className='bg-gray-800 border-gray-700 text-gray-200 rounded-3xl'>
                    <DialogHeader>
                        <DialogTitle>
                            {paymentSuccess ? 'Payment Successful' : 'Checkout'}
                        </DialogTitle>
                    </DialogHeader>
                    {paymentSuccess ? (
                        <div className='space-y-4'>
                            <div className='flex items-center justify-center'>
                                <CheckCircle className='text-primary-600 w-16 h-16' />
                            </div>
                            <h3 className='text-xl font-semibold text-center'>
                                Thank you for your purchase!
                            </h3>
                            <div className='space-y-2'>
                                <p>
                                    <strong>Transaction ID:</strong>{' '}
                                    {transactionDetails.txnNo}
                                </p>
                                <p>
                                    <strong>Amount Paid:</strong> Rs{' '}
                                    {selectedTicketType === 'standard'
                                        ? ticketPrices.standard * ticketCount
                                        : ticketPrices.pack}
                                </p>
                                <p>
                                    <strong>Payment Method:</strong>{' '}
                                    {paymentMethod === 'easypaisa'
                                        ? 'EasyPaisa'
                                        : 'Bank Transfer'}
                                </p>
                                <p>
                                    <strong>Tickets:</strong>{' '}
                                    {selectedTicketType === 'standard'
                                        ? ticketCount
                                        : 5}
                                </p>
                                <p>
                                    <strong>Email:</strong> {formData.email}
                                </p>
                            </div>
                            <p className='text-sm text-gray-400'>
                                Your tickets and receipt have been sent to your
                                email. Please check your inbox (and spam folder)
                                for details.
                            </p>
                            <Button
                                className='w-full bg-primary-600 hover:bg-primary-700 rounded-full'
                                onClick={resetForm}
                            >
                                Close
                            </Button>
                        </div>
                    ) : paymentError ? (
                        <div className='space-y-4'>
                            <div className='flex items-center justify-center'>
                                <X className='text-red-500 w-16 h-16' />
                            </div>
                            <h3 className='text-xl font-semibold text-center'>
                                Payment Failed
                            </h3>
                            <p className='text-center'>{paymentError}</p>
                            <Button
                                className='w-full bg-primary-600 hover:bg-primary-700 rounded-full'
                                onClick={() => setPaymentError(null)}
                            >
                                Try Again
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className='space-y-6'>
                            <div className='space-y-2'>
                                <Label htmlFor='paymentMethod'>
                                    Select Payment Method
                                </Label>
                                <RadioGroup
                                    defaultValue='easypaisa'
                                    onValueChange={setPaymentMethod}
                                    className='grid grid-cols-2 gap-4'
                                >
                                    <div>
                                        <RadioGroupItem
                                            value='easypaisa'
                                            id='easypaisa'
                                            className='peer sr-only'
                                        />
                                        <Label
                                            htmlFor='easypaisa'
                                            className='flex flex-col items-center justify-between rounded-md border-2 border-gray-700 bg-gray-800 p-4 hover:bg-gray-700 hover:text-white peer-data-[state=checked]:border-primary-600 [&:has([data-state=checked])]:border-primary-600'
                                        >
                                            <img
                                                src='/easypaisa-logo.png'
                                                alt='EasyPaisa'
                                                className='h-12 mb-2'
                                            />
                                            EasyPaisa
                                        </Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem
                                            value='bank_transfer'
                                            id='bank_transfer'
                                            className='peer sr-only'
                                        />
                                        <Label
                                            htmlFor='bank_transfer'
                                            className='flex flex-col items-center justify-between rounded-md border-2 border-gray-700 bg-gray-800 p-4 hover:bg-gray-700 hover:text-white peer-data-[state=checked]:border-primary-600 [&:has([data-state=checked])]:border-primary-600'
                                        >
                                            <img
                                                src='/bank-transfer-logo.png'
                                                alt='Bank Transfer'
                                                className='h-12 mb-2'
                                            />
                                            Bank Transfer
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='name'>Name</Label>
                                <Input
                                    id='name'
                                    placeholder='Enter your name'
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className='bg-gray-700 border-gray-600 rounded-full'
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='email'>Email</Label>
                                <Input
                                    id='email'
                                    type='email'
                                    placeholder='Enter your email'
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className='bg-gray-700 border-gray-600 rounded-full'
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='phone'>Phone Number</Label>
                                <Input
                                    id='phone'
                                    type='tel'
                                    placeholder='Enter your phone number'
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                    className='bg-gray-700 border-gray-600 rounded-full'
                                />
                            </div>
                            {paymentMethod === 'bank_transfer' && (
                                <div className='space-y-2'>
                                 <p className='text-gray-300 text-center'>
                                        MUHAMMAD TAQI ARIF GANATRA <br />
                                        Meezan bank <br />
                                        Account Number: 01500108093059
                                    </p>
                                    <Label htmlFor='screenshot'>
                                        Upload Payment Screenshot
                                    </Label>
                                    <Input
                                        id='screenshot'
                                        type='file'
                                        accept='image/*'
                                        onChange={handleScreenshotChange}
                                        required
                                        className='bg-gray-700 border-gray-600 rounded-full'
                                    />
                                    {!screenshot && (
                                        <p className='text-red-500 text-sm'>
                                            Please upload a screenshot of your
                                            bank transfer.
                                        </p>
                                    )}
                                </div>
                            )}
                            <Button
                                type='submit'
                                className='w-full bg-primary-600 hover:bg-primary-700 rounded-full'
                                disabled={
                                    isProcessing ||
                                    (paymentMethod === 'bank_transfer' &&
                                        !screenshot)
                                }
                            >
                                {isProcessing
                                    ? 'Processing...'
                                    : paymentMethod === 'bank_transfer'
                                    ? 'Submit'
                                    : 'Pay Now'}
                            </Button>
                        </form>
                    )}
                </DialogContent>
            </Dialog>

            <Dialog
                open={isListEventModalOpen}
                onOpenChange={setIsListEventModalOpen}
            >
                <DialogContent className='bg-gray-800 border-gray-700 text-gray-200 rounded-3xl'>
                    <DialogHeader>
                        <DialogTitle>List Your Event</DialogTitle>
                        <DialogDescription className='text-gray-200'>
                            For registration, contact bookkrlo.info@gmail.com
                        </DialogDescription>
                    </DialogHeader>
                    <div className='grid gap-4 py-4'>
                        <p>
                            Please reach out to us via email to list your event.
                            We'll be happy to assist you with the process.
                        </p>
                    </div>
                    <Button
                        onClick={() => setIsListEventModalOpen(false)}
                        className='bg-primary-600 hover:bg-primary-700 rounded-full'
                    >
                        Close
                    </Button>
                </DialogContent>
            </Dialog>

            <Toaster />
        </div>
 </>  
);
}
