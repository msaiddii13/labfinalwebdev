// import React from "react";

// import Component from "./component"
import Component from "@/_app/component";

export default function Home() {
  // localStorage?
  // window?
  // onclick?
  // return <p onClick={() => {}}>Paragraph</p>;
  // React.createElement("p", null, "Paragraph");
  // .addEventListener("click", () => {});
  // `Hello ${name}`

  return (
    <>
      <Component x={5}>
        <span>alpha</span>
      </Component>
      <Component x={5}>
        <Component x={7} />
      </Component>
      <Component x={5} />
      <Component x={5} />
      <Component />
    </>
  );
  // <label htmlFor=""></label>
  // <div className=""></div>
}
