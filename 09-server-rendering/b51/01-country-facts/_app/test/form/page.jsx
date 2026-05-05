export default async function Form({ searchParams }) {
  // const data = await formData;
  // console.log(data);
  const { name } = await searchParams;

  return (
    <>
      <form>
        <input name="name" placeholder="Name" />
        <button type="submit">Submit</button>
      </form>
      {name && <div>Hello, {name}!</div>}
    </>
  );
}
