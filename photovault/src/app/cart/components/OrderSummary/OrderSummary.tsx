import { CartPhoto } from '@/models/cart';
import { CartPhotosDetails } from '@/models/photo';
import { calculateSubtotal } from '@/utils/cart';
import Section from '@/app/cart/components/Section';
import Button from '@/components/Form/Button';
import RightArrowLineIcon from '@/../public/icons/right-arrow-line.svg';
import SummaryRow from './SummaryRow';
import { useTranslations } from 'next-intl';

function Separator() {
  return <div className='w-full border-b border-b-black border-opacity-10' />;
}

interface OrderSummaryProps {
  className?: string;
  cartPhotos: Array<CartPhoto>;
  photos: CartPhotosDetails;
}

export default function OrderSummary({
  className,
  cartPhotos,
  photos,
}: OrderSummaryProps) {
  const t = useTranslations('Cart.OrderSummary');
  const subtotal = calculateSubtotal(cartPhotos, photos);
  const deliveryFee = 0;
  const total = subtotal + deliveryFee;

  return (
    <Section className={className} title={t('title')}>
      <div className='flex flex-col gap-5'>
        <SummaryRow name={t('subtotal')} value={subtotal} />
        <SummaryRow name={t('delivery-fee')} value={deliveryFee} />

        <Separator />
        <SummaryRow name={t('total')} value={total} total={true} />

        <Button>
          <div className='flex items-center justify-center gap-2'>
            <p>{t('checkout')}</p>
            <RightArrowLineIcon />
          </div>
        </Button>
      </div>
    </Section>
  );
}
