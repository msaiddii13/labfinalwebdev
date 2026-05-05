import "./globals.css";

export const metadata = {
  title: "Task Tracker",
  description: "Create and track tasks",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
