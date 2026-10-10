import Link from 'next/link';
import Layout from '../components/Layout';

export default function NotFound() {
  return (
    <Layout title="Page not found | Pokémon Explorer">
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-5xl font-extrabold">Pokémon not found</h1>
        <p className="mt-4 text-lg text-ink/70">That Pokédex number doesn’t exist. Valid numbers are 1 to 1025.</p>
        <Link href="/" className="mt-8 inline-block rounded-full border-2 border-ink bg-dex px-6 py-3 font-bold text-white">
          Back to all Pokémon
        </Link>
      </div>
    </Layout>
  );
}
