import Section from './Section';
import InputField from '@/components/Form/InputField';
import { useEffect } from 'react';
import { useMyself } from '@/services/query/user';
import LoadedQuery from '@/components/LoadedQuery/LoadedQuery';
import { useDeliveryDataStore } from '@/stores/deliveryData';
import { useTranslations } from 'next-intl';

export default function BuyerDetails() {
  const t = useTranslations('Cart.BuyerDetails');
  const query = useMyself();
  const user = query.data;

  const loggedIn = !!user;
  const userDeliveryData = user?.deliveryData;
  const hasDeliveryData = loggedIn && !!userDeliveryData;

  const deliveryData = useDeliveryDataStore((store) => store.deliveryData);
  const {
    setName,
    setSurname,
    setCity,
    setCountry,
    setStreet,
    setTelephone,
    setZipCode,
  } = useDeliveryDataStore((store) => store);

  useEffect(() => {
    if (hasDeliveryData) {
      setName(userDeliveryData.name);
      setSurname(userDeliveryData.surname);
      setCity(userDeliveryData.city);
      setCountry(userDeliveryData.country);
      setStreet(userDeliveryData.street);
      setTelephone(userDeliveryData.telephone);
      setZipCode(userDeliveryData.zipCode);
    }
  }, [
    hasDeliveryData,
    userDeliveryData,
    setName,
    setSurname,
    setCity,
    setCountry,
    setStreet,
    setTelephone,
    setZipCode,
  ]);

  return (
    <Section title={t('title')}>
      <LoadedQuery query={query} handleError={true}>
        <div className='flex flex-col gap-5'>
          <InputField
            label={t('first-name')}
            type='text'
            value={deliveryData.name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputField
            label={t('surname')}
            type='text'
            value={deliveryData.surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <InputField
            label={t('country')}
            type='text'
            value={deliveryData.country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <InputField
            label={t('city')}
            type='text'
            value={deliveryData.city}
            onChange={(e) => setCity(e.target.value)}
          />
          <InputField
            label={t('street')}
            type='text'
            value={deliveryData.street}
            onChange={(e) => setStreet(e.target.value)}
          />
          <InputField
            label={t('zip-code')}
            type='text'
            value={deliveryData.zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
          <InputField
            label={t('phone-number')}
            type='text'
            value={deliveryData.telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />
        </div>
      </LoadedQuery>
    </Section>
  );
}
