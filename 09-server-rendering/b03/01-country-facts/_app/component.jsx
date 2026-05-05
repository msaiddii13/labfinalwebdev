// let x = 5;

export default function Component({ children, x = 0, firstName }) {
  // x += 1;
  // let content;
  // if (children) {
  //   content = <div className="border rounded-md my-2 p-2">{children}</div>;
  // }

  return (
    <>
      <div>Component {x + 1}</div>
      {children && <div className="border rounded-md my-2 p-2">{children}</div>}
      {/* {content} */}
    </>
  );
  // `Hello ${name}`
}
