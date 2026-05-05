export default function Component({ x = 0, children }) {
  return (
    <>
      <p>Paragraph {x + 1}</p>
      {/* <p>Paragraph x</p> */}
      {children}
    </>
  );
}
