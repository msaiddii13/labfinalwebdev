export default function Layout({ children }) {
  return (
    <div className="border rounded-lg p-4">
      <h2>Nested</h2>
      {children}
    </div>
  );
}
