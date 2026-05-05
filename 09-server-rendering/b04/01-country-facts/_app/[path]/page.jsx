export default async function Page({ params, searchParams }) {
  const { path } = await params;
  const { name } = await searchParams;

  // let content;
  // if (name) {
  //   content = <span> - {name}</span>;
  // }

  return (
    <div>
      <span>{path}</span>
      {name && <span> - {name}</span>}
      {/* {content} */}
      {[
        { key: 0, value: 1 },
        { key: 1, value: 2 },
        { key: 2, value: 3 },
      ].map((x) => (
        <div key={x.key}>{x.value}</div>
      ))}
      {/* {[1, 2, 3]} */}
    </div>
  );
}

// `${path}`
