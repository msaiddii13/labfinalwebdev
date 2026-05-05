import "./globals.css";

export const metadata = {
  title: "Country Facts",
  description: "General facts about countries",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="antialiased">
      <body className="p-4">{children}</body>
    </html>
  );
}
