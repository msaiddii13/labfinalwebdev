import Component from "@/_app/component";

export default async function Page() {
  return (
    <>
      <Component x="1">Text</Component>
      <Component x="2" z="1" />
      <Component x="2" z="1" />
      {/* <button onclick=""></button>
      localStorage
      window */}
      {/* React.createElement(Component, { x: "3", z: "2" }) */}
    </>
  );
}

///

// import Root from "@/layout";
// import Page from "@/page"

// // return Root(Page())
// return <Root><Page></Page></Root>
