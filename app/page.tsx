import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Home',
};

export const API_URL = 'https://billions-api.nomadcoders.workers.dev';

async function getBillions() {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}

export default async function Home() {
  const billions = await getBillions();
  return (
    <>
      {billions.map((p) => {
        const netWorthInBillions = (p.netWorth / 1000).toFixed(2);
        const formattedNetWorth = `${netWorthInBillions} billion`;

        return (
          <div key={p.id}>
            <Link href={`/person/${p.id}`}>
              <img src={p.squareImage} />
            </Link>
            <div>{p.name}</div>
            <div>
              {formattedNetWorth} / {p.industries[0]}
            </div>
          </div>
        );
      })}
    </>
  );
}
