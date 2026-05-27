import '../envConfig'
import './globals.css'

import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { Hanken_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import { JSX, ReactNode } from 'react'
import { Toaster } from 'sonner'

import AppShell from '@/components/AppShell'
import Navbar from '@/components/Navbar'
import { AuthProvider } from '@/components/providers/AuthProvider'
import QueryProvider from '@/components/providers/QueryProvider'

dayjs.extend(advancedFormat)

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
})

const hankenGrotesk = Hanken_Grotesk({
    subsets: ['latin'],
    variable: '--font-hanken-grotesk',
})

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains-mono',
})

export default function RootLayout({ children }: { children: ReactNode | JSX.Element }) {
    
    return (
        
        <html lang="en" data-arp="">
            <body className={`${inter.variable} ${hankenGrotesk.variable} ${jetbrainsMono.variable}`}>
                
                <AuthProvider>
                    <QueryProvider>
                        <AppShell>
                            <Navbar />
                            {children}
                        </AppShell>
                        <Toaster />
                    </QueryProvider>
                </AuthProvider>
            
            </body>
        </html>
        
    )
    
}
