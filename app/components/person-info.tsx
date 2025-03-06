import { API_URL } from '../page';

async function getPerson(id: string) {
  const res = await fetch(`${API_URL}/person/${id}`);
  const data = await res.json();
  return data;
}

export default async function PersonInfo({ id }: { id: string }) {
  const person = await getPerson(id);
  return (
    <div>
      <div>
        <img src={person.squareImage}></img>
        <div>{person.name}</div>
        <div>netWorth: {person.netWorth}</div>
        <div>country: {person.country}</div>
        <div>industries: {person.industries}</div>
        <div>{person.bio}</div>
      </div>
      <div>
        {person.financialAssets.map((a) => (
          <div>
            <div>ticker: {a.ticker}</div>
            <div>numberOfShares: {a.numberOfShares}</div>
            <div>exerciseOptionPrice: {a.exerciseOptionPrice}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
