export default function Layout({ children }) {
  return (
    <div style={{ backgroundColor: "lightblue" }}>
      <div>Layout B</div>
      {children}
    </div>
  );
}
