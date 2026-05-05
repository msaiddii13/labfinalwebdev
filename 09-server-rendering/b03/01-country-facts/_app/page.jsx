import Component from "./component";

export default function Home() {
  // window?
  // localStorage?
  // <button onclick="() => {}">?</button>

  // return Component({x: 5});
  return (
    <>
      <Component x={5} first-name="" />
      <Component x={5} />
      <Component x={10}>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
          {/* <Home /> */}
        </ul>
        <Component x={776} />
      </Component>
      <Component x={Math.random()} />
      <Component />
    </>
  );
}
