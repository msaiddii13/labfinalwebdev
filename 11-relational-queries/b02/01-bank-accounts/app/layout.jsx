import "./globals.css";

export const metadata = {
  title: "Banks accounts",
  description: "Manage bank clients, accounts, and transactions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
