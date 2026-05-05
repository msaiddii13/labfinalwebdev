import "./globals.css";

export const metadata = {
  title: "Country Facts",
  description: "General facts about countries",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <main className="border p-10">{children}</main>
      </body>
    </html>
  );
}
