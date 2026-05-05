import "./globals.css";

export const metadata = {
  title: "Country Facts",
  description: "General facts about countries",
};

export default async function Root({ children }) {
  return (
    <html lang="en">
      <body>
        <main>
          <h1>Root layout</h1>
          {children}
        </main>
      </body>
    </html>
  );
}
