'use client';

import { usePhotos } from '@/services/query/photo';
import LoadedQuery from '@/components/LoadedQuery/LoadedQuery';

export default function Photos() {
  const query = usePhotos();
  const photos = query.data;

  return (
    <div>
      <LoadedQuery handleError={true} query={query}>
        {photos && (
          <>
            {photos.map((photo) => (
              <div key={photo.id}>
                <picture>
                  <img src={photo.photoURL} alt='' />
                </picture>
              </div>
            ))}
          </>
        )}
      </LoadedQuery>
    </div>
  );
}
