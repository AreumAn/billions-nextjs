import styles from './styles/home.module.css';
import { Metadata } from 'next';
import Link from 'next/link';
import { API_URL } from '../lib/constants';

export const metadata: Metadata = {
  title: 'Home',
};

async function getBillions() {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}

export default async function Home() {
  const billions = await getBillions();
  return (
    <div className={styles.container}>
      {billions.map((p) => {
        const netWorthInBillions = (p.netWorth / 1000).toFixed(2);
        const formattedNetWorth = `$${netWorthInBillions}B`;

        return (
          <div key={p.id} className={styles.billionlist}>
            <Link href={`/person/${p.id}`}>
              <img src={p.squareImage} alt={p.name} />
            </Link>
            <h3>{p.name}</h3>
            <p>
              {formattedNetWorth} • {p.industries[0]}
            </p>
          </div>
        );
      })}
    </div>
  );
}
