import "./globals.css";

export const metadata = {
  title: "Project tracker",
  description: "Manage projects and tasks",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
