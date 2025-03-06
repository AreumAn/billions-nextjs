import styles from '../styles/person-info.module.css';
import { API_URL } from '../page';

async function getPerson(id: string) {
  const res = await fetch(`${API_URL}/person/${id}`);
  const data = await res.json();
  return data;
}

export default async function PersonInfo({ id }: { id: string }) {
  const person = await getPerson(id);
  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <img src={person.squareImage} alt={person.name} />
        <h1 className={styles.name}>{person.name}</h1>
        <div className={styles.info}>Networth: ${(person.netWorth / 1000).toFixed(1)} Billion</div>
        <div className={styles.info}>Country: {person.country}</div>
        <div className={styles.info}>Industry: {person.industries}</div>
        <div className={styles.bio}>{person.bio}</div>
      </div>

      <div className={styles.financialSection}>
        <h2 className={styles.financialTitle}>Financial Assets</h2>
        <div className={styles.assetsGrid}>
          {person.financialAssets.map((asset, index) => (
            <div key={index} className={styles.assetCard}>
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
          ))}
        </div>
      </div>
    </div>
  );
}
