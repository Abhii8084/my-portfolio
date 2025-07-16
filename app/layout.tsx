import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'My Portfolio',
  description: 'Created by Abhishek Raj',
  generator: 'Abhishek Raj',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
