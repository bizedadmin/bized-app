import "./globals.css";

export const metadata = {
  title: "Bized App - Universal",
  description: "Universal Monorepo App",
};

import { ClientProviders } from "../components/ClientProviders";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
