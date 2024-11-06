import clsx from 'clsx';
import SearchIcon from '@/../public/icons/search.svg';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface SearchProps {
  className?: string;
}

export default function Search({ className }: SearchProps) {
  const t = useTranslations('Search');

  return (
    <div
      className={clsx(
        'bg-gray flex items-center gap-3 relative rounded-4xl px-3 py-2',
        className,
      )}
    >
      <Image className='absolute pointer-events-none' src={SearchIcon} alt='' />
      <input
        className='bg-inherit pl-9 w-full rounded-[inherit]'
        placeholder={t('placeholder')}
      />
    </div>
  );
}
