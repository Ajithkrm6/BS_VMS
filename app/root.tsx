import { ReactNode } from 'react';
import { LayoutPrimary } from './components/Layout/Primary';

interface RootLayoutProps {
  children: ReactNode;
}

export function Layout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>BS-VMS - Vendor Management System</title>
      </head>
      <body>
        <LayoutPrimary>{children}</LayoutPrimary>
      </body>
    </html>
  );
}
