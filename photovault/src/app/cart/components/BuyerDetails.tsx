import Section from './Section';
import InputField from '@/components/Form/InputField';
import { useState } from 'react';
import { useMyself } from '@/services/query/user';
import LoadedQuery from '@/components/LoadedQuery/LoadedQuery';

export default function BuyerDetails() {
  const query = useMyself();
  const user = query.data;

  const loggedIn = !!user;
  const hasDeliveryData = loggedIn && !!user?.deliveryData;

  const [name, setName] = useState(
    hasDeliveryData ? user.deliveryData!.name : '',
  );
  const [surname, setSurname] = useState(
    hasDeliveryData ? user.deliveryData!.surname : '',
  );

  return (
    <Section title='Buyer details'>
      <LoadedQuery query={query} handleError={true}>
        <div className='flex flex-col gap-5'>
          <InputField
            label='First name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputField
            label='Surname'
            type='text'
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
      </LoadedQuery>
    </Section>
  );
}
