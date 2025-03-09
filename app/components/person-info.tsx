import styles from '../styles/person-info.module.css';
import { API_URL } from '../../lib/constants';

async function getPerson(id: string) {
  const res = await fetch(`${API_URL}/person/${id}`);
  const data = await res.json();
  return data;
}

interface Person {
  id: string;
  name: string;
  squareImage: string;
  netWorth: number;
  country: string;
  industries: string;
  bio: string;
  financialAssets: FinancialAsset[];
}

interface FinancialAsset {
  ticker: string;
  numberOfShares: number;
  exerciseOptionPrice?: number;
}


function ProfileSection({ person }: { person: Person }) {
  const netWorthInBillions = (person.netWorth / 1000).toFixed(1);
  
  return (
    <div className={styles.profileSection}>
      <img src={person.squareImage} alt={person.name} />
      <h1 className={styles.name}>{person.name}</h1>
      <div className={styles.info}>Networth: ${netWorthInBillions} Billion</div>
      <div className={styles.info}>Country: {person.country}</div>
      <div className={styles.info}>Industry: {person.industries}</div>
      <div className={styles.bio}>{person.bio}</div>
    </div>
  );
}

function AssetCard({ asset }: { asset: FinancialAsset }) {
  return (
    <div className={styles.assetCard}>
      <div className={styles.assetInfo}>Ticker: {asset.ticker}</div>
      <div className={styles.assetInfo}>
        Shares: {asset.numberOfShares.toLocaleString()}
      </div>
      {asset.exerciseOptionPrice && (
        <div className={styles.assetInfo}>
          Exercise Price: ${asset.exerciseOptionPrice}
        </div>
      )}
    </div>
  );
}

function FinancialSection({ assets }: { assets: FinancialAsset[] }) {
  return (
    <div className={styles.financialSection}>
      <h2 className={styles.financialTitle}>Financial Assets</h2>
      <div className={styles.assetsGrid}>
        {assets.map((asset, index) => (
          <AssetCard key={index} asset={asset} />
        ))}
      </div>
    </div>
  );
}

export default async function PersonInfo({ id }: { id: string }) {
  const person = await getPerson(id);
  
  return (
    <div className={styles.container}>
      <ProfileSection person={person} />
      <FinancialSection assets={person.financialAssets} />
    </div>
  );
}
