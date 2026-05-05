// import React from "react";
// "use client";

export default async function Page({ params, searchParams }) {
  // return <img src="" alt=""></img>;
  // return React.createElement("img", { src: "", alt: "" });
  // <tag className="" htmlFor=""></tag>;
  const { id } = await params;
  const { name } = await searchParams;

  // localStorage.setItem("key", "value");
  // console.log(typeof window);

  console.log("I'm here!");
  const array = [
    { id: "1", value: "a" },
    { id: "2", value: "b" },
    { id: "3", value: "c" },
  ];

  return (
    <>
      <p>ID: {id}</p>
      {name && <p>Name: {name}</p>}
      <ul>
        {array.map((item) => (
          <li key={item.id}>
            {item.id}: {item.value}
          </li>
        ))}
        {/* {Math.random() > 0.5 && <li>Random item</li>} */}
      </ul>
      <div>
        <ComponentA>
          <ComponentB border-color="red-500">I'm a child!</ComponentB>
          <ComponentB border-color="green-500">I'm a child also!</ComponentB>
          <ComponentA>Component A</ComponentA>
        </ComponentA>
        {/* {ComponentA("string")} */}
        <p>Paragraph</p>
      </div>
    </>
  );
}

// let a = 0;

function ComponentA({ children }) {
  // a = a + 1;

  return (
    <div className="mt-2 border p-4">
      {children}
      {/* a: {a} */}
    </div>
  );
  // return <div></div>;
  // `${1 + 1}`
}

function ComponentB({ children, borderColor }) {
  return (
    <div
      className={`mt-2 border-${borderColor ?? "black"} border rounded-md p-4`}
    >
      {children ?? "No content."}
    </div>
  );
}
