import '../envConfig'
import './globals.css'
import { Inter } from 'next/font/google'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import Navbar from '@/components/Navbar'
import QueryProvider from '@/components/providers/QueryProvider'
import { AuthProvider } from '@/components/providers/AuthProvider'
import { Toaster } from 'sonner'

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
