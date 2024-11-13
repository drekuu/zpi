import React from 'react';

interface Photo {
  image: string;
  title: string;
  tags: string;
  status: 'Visible' | 'Hidden';
  category: string;
  license?: string;
  price: string;
}

interface PhotoTableRowProps {
  photo: Photo;
}

const PhotoTableRow = ({ photo }: PhotoTableRowProps) => {
  return (
    <div className="flex flex-wrap gap-4 px-4 py-2 w-full border-t border-b border-solid border-y-neutral-300 min-h-[64px] max-md:max-w-full">
      <div className="flex overflow-hidden flex-col justify-center p-0.5 my-auto w-6 rounded-lg">
        <div className="flex shrink-0 w-5 h-5 bg-white rounded-md border-2 border-solid border-zinc-300" />
      </div>
      <div className="flex flex-wrap flex-1 shrink justify-center items-center h-full basis-0 min-w-[240px] max-md:max-w-full">
        <div className="flex overflow-hidden flex-col flex-1 shrink justify-center self-stretch py-1 my-auto tracking-normal basis-4">
          <div className="flex gap-2 items-center px-2">
            <img
              loading="lazy"
              src={photo.image}
              alt={photo.title}
              className="object-contain shrink-0 self-stretch my-auto w-9 aspect-square rounded-[100px]"
            />
            <div className="flex flex-col flex-1 shrink self-stretch my-auto basis-0">
              <div className="text-sm leading-none text-black">{photo.title}</div>
              <div className="mt-1 text-xs leading-none whitespace-nowrap text-ellipsis text-zinc-500">
                {photo.tags}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 shrink gap-2.5 items-center self-stretch px-2 my-auto text-sm tracking-normal leading-none basis-0 min-h-[50px] text-neutral-800">
          <div
            className={`overflow-hidden gap-2.5 self-stretch px-3 py-1.5 my-auto rounded-3xl min-h-[30px] ${
              photo.status === 'Visible' ? 'bg-emerald-100' : 'bg-red-300'
            }`}
          >
            {photo.status}
          </div>
        </div>
        <div className="flex flex-col flex-1 shrink self-stretch px-2 my-auto text-sm tracking-normal leading-5 basis-0 min-h-[50px] text-zinc-800">
          <div className="flex-1 shrink gap-2.5 self-stretch w-full">{photo.category}</div>
        </div>
        <div className="flex flex-col flex-1 shrink self-stretch px-2 my-auto basis-0 min-h-[50px]">
          <div className="flex gap-2.5 w-full min-h-[50px]">{photo.license}</div>
        </div>
        <div className="flex flex-col flex-1 shrink self-stretch px-2 my-auto text-sm tracking-normal leading-5 whitespace-nowrap basis-0 min-h-[50px] text-zinc-800">
          <div className="flex-1 shrink gap-2.5 self-stretch w-full">{photo.price}</div>
        </div>
      </div>
    </div>
  );
};

export default PhotoTableRow;