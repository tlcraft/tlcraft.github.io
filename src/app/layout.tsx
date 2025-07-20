import '../index.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Travis L Craft - About Me',
    description: 'Web site created with Next.js.',
};

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <html lang="en">
          <head>
            <link rel="icon" href="/favicon.png" />
            <meta name="theme-color" content="#000000" />
          </head>
          <body>
            <div id="root">{children}</div>
          </body>
        </html>           
    )
  }
