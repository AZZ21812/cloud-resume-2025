import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Amanuel Z. Alemu - Cloud Resume',
  description: 'AWS Solutions Architect and Full-Stack Developer specializing in cloud-native architectures, fintech solutions, and scalable applications. Experienced with AWS, Kubernetes, and modern web technologies.',
  keywords: ['cloud engineer', 'aws', 'solutions architect', 'fintech', 'full-stack developer', 'serverless', 'nextjs', 'java', 'kotlin', 'nodejs'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
