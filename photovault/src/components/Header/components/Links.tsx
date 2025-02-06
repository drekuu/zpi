import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Links() {
  const t = useTranslations('Pages');
  const links = [
    { name: 'home', href: '/home' },
    { name: 'new', href: '/new' },
    // { name: 'explore', href: '/explore' },
  ] as const;

  return (
    <div className='flex gap-10 w-fit md:w-full md:mx-10 md:max-w-[300px]'>
      {links.map((link) => (
        <Link href={link.href} key={link.name}>
          {t(link.name)}
        </Link>
      ))}
    </div>
  );
}
