import Link from 'next/link';
import UsersDisplay from './UsersDisplay';

export default function Home() {
  return (
    <>
      <Link href="/users">Získání dat ze strany serveru</Link>
      <UsersDisplay />
    </>
  );
}
