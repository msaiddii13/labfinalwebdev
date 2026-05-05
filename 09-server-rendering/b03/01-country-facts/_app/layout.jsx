import "./globals.css";

export const metadata = {
  title: "Country Facts",
  description: "General facts about countries",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <Header></Header> */}
        <div>Root layout</div>
        {children}
        {/* <Footer></Footer> */}
      </body>
    </html>
  );
}

{
  /* <RootLayout>
  <Layout1>
    <Layout2>
      <Home></Home>
    </Layout2>
  </Layout1>
</RootLayout>; */
}
