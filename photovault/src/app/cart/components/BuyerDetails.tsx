import Section from './Section';
import InputField from '@/components/Form/InputField';
import { useState } from 'react';
import { useMyself } from '@/services/query/user';
import LoadedQuery from '@/components/LoadedQuery/LoadedQuery';

export default function BuyerDetails() {
  const query = useMyself();
  const user = query.data;

  const loggedIn = !!user;
  const hasDeliveryData = !!user?.deliveryData;

  const [fullname, setFullname] = useState(hasDeliveryData ? `${user.deliveryData.}`);

  return (
    <Section title='Buyer details'>
      <LoadedQuery query={query} handleError={true}>
        <div className='flex flex-col gap-5'>
          <InputField
            label='Full name'
            type='text'
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
      </LoadedQuery>
    </Section>
  );
}
