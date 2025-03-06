import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Billions',
    default: 'Billions',
  },
  description: 'Billions List generated by Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
