import { notFound } from 'next/navigation';
import Photo from './_components/Photo';

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  if (!Number.isInteger(+id)) {
    notFound();
  }

  return <Photo id={+id} />;
}
