import { NextResponse } from 'next/server';
import connectDB from '@/config/database';
import Ticket from '@/models/Ticket';
import nodemailer from 'nodemailer';

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT || 587,
    secure: process.env.MAIL_PORT == 465,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.APP_PASSWORD,
    },
});

export async function POST(request) {
    await connectDB();

    try {
        const body = await request.json();

        // Format the request payload to match the API requirements
        const payload = {
            orderId: body.orderId || `D${Date.now()}`,
            amount: body.amount.toString(),
            phone: body.phone,
            email: body.email,
            type: 'wallet',
        };

        const response = await fetch(
            'https://api.sahulatpay.com/payment/initiate-ep/b93fb70c-6ac3-4c2d-b92f-a6869b6306bc',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            }
        );

        const data = await response.json();

        if (data.success) {
            // Save the ticket data to MongoDB
            const newTicket = new Ticket({
                name: body.name,
                email: body.email,
                phone: body.phone,
                paymentMethod: 'easypaisa',
                ticketCount: body.ticketCount,
                amountPaid: body.amount,
                transactionId: data.data.txnNo,
            });

            await newTicket.save();

            // Send confirmation email
            const mailOptions = {
                from: {
                    name: 'BookKrlo',
                    address: process.env.EMAIL_ADDRESS,
                },
                to: body.email,
                subject: 'Your BookKrlo Purchase Confirmation',
                text: `Dear ${body.name},

Subject: Your Payment is Confirmed – Ticket Will Be Sent Soon

We are pleased to inform you that we have successfully received and verified your payment for your ticket booking!

Our team is now preparing your ticket, and you will receive it in a separate email very shortly.

Transaction Details:
- Transaction ID: ${data.data.txnNo}
- Amount Paid: Rs ${body.amount}
- Number of Tickets: ${body.ticketCount}
- Payment Method: EasyPaisa

Thank you for your trust in us. If you have any questions or need assistance in the meantime, please don't hesitate to reach out to us by replying to this email or contacting our support team.

Thank you for choosing book krlo! We wish you a pleasant journey ahead.

Best regards,
The BookKrlo Team`,
            };

            try {
                await transporter.sendMail(mailOptions);
                console.log('Confirmation email sent successfully');
            } catch (emailError) {
                console.error('Error sending confirmation email:', emailError);
            }

            return NextResponse.json({
                success: true,
                message: 'Payment initiated successfully',
                data: {
                    txnNo: data.data.txnNo,
                    txnDateTime: data.data.txnDateTime,
                },
            });
        } else {
            return NextResponse.json({
                success: false,
                message: data.message || 'Operation failed',
                statusCode: data.statusCode || 400,
            });
        }
    } catch (error) {
        console.error('Error processing EasyPaisa payment:', error);
        return NextResponse.json({
            success: false,
            message: 'Internal server error',
            statusCode: 500,
        });
    }
}
