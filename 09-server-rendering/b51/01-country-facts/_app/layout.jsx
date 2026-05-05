import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Country Facts",
  description: "Facts about countries around the world",
};

export default async function Regions({ children }) {
  const data = await fetch(
    "https://restcountries.com/v3.1/all?fields=region",
  ).then((res) => res.json());

  const regions = data
    .map((r) => r.region)
    .filter((r, i, a) => a.indexOf(r) === i)
    .sort();

  return (
    <html lang="en">
      <body className="m-2">
        <div className="flex flex-wrap gap-x-1.5 mb-2">
          {regions.map((region) => (
            <Link
              className="hover:underline text-xl"
              key={region}
              href={`/${encodeURI(region)}`}
            >
              {region}
            </Link>
          ))}
        </div>
        {children}
      </body>
    </html>
  );
}
