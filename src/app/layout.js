import { Salsa } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Header from './header/page'
import Footer from './footer/page'


const salsa = Salsa({ subsets: ['latin'], weight: '400' })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="./street-pulse-logo.png"/>
        <title>Street Pulse</title>
      </head>
      <body className={salsa.className}>
        <Header/>
        <Providers>{children}</Providers>
        <Footer/>
        </body>
    </html>
  )
}
