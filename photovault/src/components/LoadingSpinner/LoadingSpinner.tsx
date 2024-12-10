import { TailSpin } from 'react-loader-spinner';

interface SpinnerProps {
  width?: number | string;
  height?: number | string;
}

function Spinner({ width = 80, height = 80 }: SpinnerProps) {
  return <TailSpin width={width} height={height} color='black' />;
}

export default function LoadingSpinner() {
  return (
    <div className='w-full p-8 flex items-center justify-center'>
      <Spinner />
    </div>
  );
}
