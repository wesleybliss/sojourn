import '../envConfig'
import './globals.css'
import { Inter } from 'next/font/google'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import Navbar from '@/components/Navbar'
import QueryProvider from '@/components/providers/QueryProvider'
import NextAuthProvider from '@/components/providers/NextAuthProvider.jsx'
import OfflineSync from '@/components/OfflineSync'
import { Toaster } from 'sonner'

dayjs.extend(advancedFormat)

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
    
    return (
        
        <html lang="en" data-arp="">
            <body className={inter.className}>
                
                <NextAuthProvider>
                    <QueryProvider>
                        <OfflineSync />
                        <Navbar />
                        {children}
                        <Toaster />
                    </QueryProvider>
                </NextAuthProvider>
            
            </body>
        </html>
        
    )
    
}
