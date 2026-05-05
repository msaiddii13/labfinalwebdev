export default async function Page({ params, searchParams }) {
  let [region, subregion, country] = (await params).slug || [];

  if (region) {
    region = decodeURI(region);
    if (subregion) {
      subregion = decodeURI(subregion);
      if (country) {
        country = decodeURI(country);
      }
    }
  }

  console.log(region, subregion, country);

  return (
    <div>
      {region && <h1>Region: {region}</h1>}
      {subregion && <h2>Subregion: {subregion}</h2>}
      {country && <h3>Country: {country}</h3>}
    </div>
  );
}

export async function generateMetadata({ params }) {
  let [region, subregion, country] = (await params).slug || [];

  if (region) {
    region = decodeURI(region);
    if (subregion) {
      subregion = decodeURI(subregion);
      if (country) {
        country = decodeURI(country);
      }
    }
  }

  return {
    title: country || subregion || region || "Country Facts",
  };
}

export async function generateStaticParams() {
  const data = await fetch(
    "https://restcountries.com/v3.1/all?fields=region,subregion,name",
  ).then((r) => r.json());

  const params = [];

  data.forEach((country) => {
    const { region, subregion, name } = country;
    if (region) {
      params.push({ slug: [region] });
      if (subregion) {
        params.push({ slug: [region, subregion] });
        if (name) {
          params.push({ slug: [region, subregion, name.common] });
        }
      }
    }
  });

  return params;
}

// f_n = n * f_{n-1}

// f(n) {
//   if (!f[n]) {
//     f[n] = n * f(n - 1);
//   }
//   return f[n];
// }

// [@Memoize]
// fib(n) {
//   if (!fib[n]) {
//     fib[n] = fib(n - 1) + fib(n - 2);
//   }
//   return fib[n];
// }
