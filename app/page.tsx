import styles from './styles/home.module.css';
import { Metadata } from 'next';
import Link from 'next/link';
import { API_URL } from '../lib/constants';

export const metadata: Metadata = {
  title: 'Home',
};

interface Billionaire {
  id: string;
  name: string;
  netWorth: number;
  squareImage: string;
  industries: string[];
}

async function getBillionaires(): Promise<Billionaire[]> {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}

function BillionaireCard({ billionaire }: { billionaire: Billionaire }) {
  const netWorthInBillions = (billionaire.netWorth / 1000).toFixed(2);
  const formattedNetWorth = `$${netWorthInBillions}B`;

  return (
    <div key={billionaire.id} className={styles.billionlist}>
      <Link href={`/person/${billionaire.id}`}>
        <img src={billionaire.squareImage} alt={billionaire.name} />
      </Link>
      <h3>{billionaire.name}</h3>
      <p>
        {formattedNetWorth} / {billionaire.industries[0]}
      </p>
    </div>
  );
}

export default async function Home() {
  const billionaires = await getBillionaires();
  
  return (
    <div className={styles.container}>
      {billionaires.map((billionaire) => (
        <BillionaireCard 
          key={billionaire.id} 
          billionaire={billionaire} 
        />
      ))}
    </div>
  );
}
