import "./globals.css";

export const metadata = {
  title: "Country Facts",
  description: "General facts about countries",
};

export default async function Root({ children }) {
  return (
    <html lang="en">
      <body className="p-3">{children}</body>
    </html>
  );
}

{
  /* <Root>
  <Page params={} searchParams={}></Page>
</Root> */
}
