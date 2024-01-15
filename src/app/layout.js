import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Header from './header/page'
import Footer from './footer/page'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="./street-pulse-logo.png"/>
        <title>Street Pulse</title>
      </head>
      <body className={inter.className}>
        <Header/>
        <Providers>{children}</Providers>
        <Footer/>
        </body>
    </html>
  )
}
