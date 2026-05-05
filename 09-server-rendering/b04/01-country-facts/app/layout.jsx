import "./globals.css";

export const metadata = {
  title: "Country Facts",
  description: "General facts about countries",
};

export default async function Root({ children }) {
  return (
    <html lang="en">
      <body className="m-2 bg-zinc-0 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-0">
        {children}
      </body>
    </html>
  );
}
