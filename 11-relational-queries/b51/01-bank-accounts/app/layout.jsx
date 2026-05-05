import "./globals.css";

export const metadata = {
  title: "Bank accounts",
  description: "Bank account and transaction manager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
