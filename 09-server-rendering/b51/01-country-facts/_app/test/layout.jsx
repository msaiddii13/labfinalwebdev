import "./globals.css";

export const metadata = {
  title: "Country Facts",
  description: "Facts about countries around the world",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="p-4" style={{ backgroundColor: "lightgray" }}>
        <div>Root Layout</div>
        {children}
      </body>
    </html>
  );
}
