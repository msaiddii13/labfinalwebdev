import "./globals.css";

export const metadata = {
  title: "Country Facts",
  description: "Facts about countries around the world",
};

export default async function Root({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
