import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Travis L Craft - About Me',
  description: 'Web site created with Next.js.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body
        className='antialiased'
      >
        {children}
      </body>
    </html>
  );
}
