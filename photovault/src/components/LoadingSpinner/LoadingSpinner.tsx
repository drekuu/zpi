import { TailSpin } from 'react-loader-spinner';

interface LoadingSpinnerProps {
  width?: number | string;
  height?: number | string;
}

export default function LoadingSpinner({
  width = 80,
  height = 80,
}: LoadingSpinnerProps) {
  return <TailSpin width={width} height={height} color='black' />;
}
