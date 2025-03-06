import { Metadata } from 'next';
import PersonInfo from '../../components/person-info';

export const metadata: Metadata = {
  title: 'Billion Details',
};

export default async function Person({ params }: { params: { id: string } }) {
  return <PersonInfo id={params.id}></PersonInfo>;
}
