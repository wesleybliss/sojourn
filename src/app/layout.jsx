import '../envConfig'
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar.jsx'
import QueryProvider from '@/components/providers/QueryProvider'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
    return (
        <html lang="en" data-arp="">
            <body className={inter.className}>
                <QueryProvider>
                    <Navbar />
                    {children}
                </QueryProvider>
            </body>
        </html>
    )
}
