import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';

export default function Loading() {
  return (
    <div className='p-8 flex items-center justify-center'>
      <LoadingSpinner />
    </div>
  );
}