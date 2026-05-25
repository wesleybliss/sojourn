import '../envConfig'
import './globals.css'

import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'

import Navbar from '@/components/Navbar'
import { AuthProvider } from '@/components/providers/AuthProvider'
import QueryProvider from '@/components/providers/QueryProvider'

dayjs.extend(advancedFormat)

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
    
    return (
        
        <html lang="en" data-arp="">
            <body className={inter.className}>
                
                <AuthProvider>
                    <QueryProvider>
                        <Navbar />
                        {children}
                        <Toaster />
                    </QueryProvider>
                </AuthProvider>
            
            </body>
        </html>
        
    )
    
}
