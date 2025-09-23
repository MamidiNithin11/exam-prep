import './globals.css'
import Footer from '../components/common/Footer'

import { Albert_Sans, Montserrat_Alternates } from "next/font/google"

const albertSans = Albert_Sans({
  subsets: ["latin"],
  display: "swap"
})

const montserratAlternates = Montserrat_Alternates({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat-alternates"
})


export const metadata = {
  title: 'User Mongo App',
  description: 'Next.js + MongoDB App',
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${albertSans.className} ${montserratAlternates.variable}`}>
        <main>{children}</main>
      </body>
    </html>
  )
}
