import React from 'react';
import PhotoTableRow from '../../profile/_components/PhotoTableRow';

interface Photo {
  id: number;
  image: string;
  title: string;
  tags: string;
  status: 'Visible' | 'Hidden';
  category: string;
  license?: string;
  price: string;
}

const photos: Photo[] = [
  {
    id: 1,
    image:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/1931d5d1c17694c6da1c5360d8955aa360679067164f2aca17044fc0b0db554f?placeholderIfAbsent=true&apiKey=3db36c7a47f0421d9f87c365488106cc',
    title: 'Laying cat',
    tags: '#cat #nature',
    status: 'Visible',
    category: 'Animals, Nature',
    license: '465zł',
    price: '100 zł',
  },
  {
    id: 2,
    image:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/044c3c09b4b4108d2480c0aafa363627043ad0df7814c95fd1830be57a8eed1d?placeholderIfAbsent=true&apiKey=3db36c7a47f0421d9f87c365488106cc',
    title: 'Horse in mountains',
    tags: '#horse #nature #mountains',
    status: 'Hidden',
    category: 'Animals, Nature',
    price: '150zł',
  },
  {
    id: 3,
    image:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/099d10e267291aedff3d6f2a402521bde5258095a16ade67afbf1f38b590c30b?placeholderIfAbsent=true&apiKey=3db36c7a47f0421d9f87c365488106cc',
    title: 'Person in front of a sun...',
    tags: '#person #people #sunset',
    status: 'Visible',
    category: 'People, Landsccape',
    price: '30zł',
  },
];

const ManagementTable = () => {
  return (
    <section className='flex z-0 flex-col justify-center p-6 mt-16 w-full bg-white max-md:px-5 max-md:mt-10 max-md:max-w-full'>
      <div className='flex flex-col w-full max-md:max-w-full'>
        <div className='flex flex-wrap gap-4 px-4 py-2 w-full border-b border-solid border-b-neutral-300 min-h-[64px] max-md:max-w-full'>
          <div className='flex overflow-hidden flex-col justify-center p-0.5 my-auto w-6 rounded-lg'>
            <div className='flex shrink-0 w-5 h-5 bg-white rounded-md border-2 border-solid border-zinc-300' />
          </div>
          <div className='flex flex-wrap flex-1 shrink gap-2 justify-center items-center h-full text-sm font-bold tracking-normal leading-5 whitespace-nowrap basis-0 min-w-[240px] text-zinc-800 max-md:max-w-full'>
            {['Photos', 'Status', 'Category', 'License', 'Price'].map(
              (header, index) => (
                <div
                  key={index}
                  className='flex flex-1 shrink gap-2 self-stretch my-auto basis-0 min-h-[50px]'
                >
                  <div className='flex flex-1 shrink gap-2 px-2 basis-0 size-full'>
                    <div className='flex-1 shrink gap-2 size-full'>
                      {header}
                      {header === 'Photos' && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          loading='lazy'
                          src='https://cdn.builder.io/api/v1/image/assets/TEMP/25408c89777d130b5ea9602ff169a4f834929cbd86a708e8bc19778a0afe65e0?placeholderIfAbsent=true&apiKey=3db36c7a47f0421d9f87c365488106cc'
                          alt=''
                          className='object-contain shrink-0 my-auto w-6 aspect-square'
                        />
                      )}
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
        {photos.map((photo) => (
          <PhotoTableRow key={photo.id} photo={photo} />
        ))}
      </div>
    </section>
  );
};

export default ManagementTable;
