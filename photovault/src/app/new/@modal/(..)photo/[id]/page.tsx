import { notFound } from 'next/navigation';
import Modal from './_components/Modal';
import Photo from '@/app/photo/[id]/_components/Photo';

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  if (!Number.isInteger(+id)) {
    notFound();
  }

  return (
    <Modal>
      xddd
      <Photo id={+id} />
    </Modal>
  );
}
