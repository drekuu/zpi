import clsx from 'clsx';
import SearchIcon from '@/../public/icons/search.svg';
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
      <SearchIcon className='absolute pointer-events-none' />
      <input
        className='bg-inherit pl-9 w-full rounded-[inherit]'
        placeholder={t('placeholder')}
      />
    </div>
  );
}
