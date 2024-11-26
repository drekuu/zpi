import { notFound } from 'next/navigation';
import Photo from '@/app/photo/[id]/_components/Photo';
import Modal from '@/components/Modal/Modal';

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
      <Photo id={+id} />
    </Modal>
  );
}
