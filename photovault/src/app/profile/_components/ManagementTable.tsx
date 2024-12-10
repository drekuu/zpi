import { useEffect, useMemo, useState } from 'react';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  // createRow,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Chip,
  Autocomplete,
  TextField,
  Stack
} from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { values } from 'lodash';
import { putFile } from '@/app/api/_lib/cloud';
import { getPhotosByPhotographer, putPhoto } from '@/app/api/photo';
import { useGetPhotosByPhotographerWithDetails, usePhotos, usePutPhoto } from '@/services/query/photo';
import { StreamingBlobPayloadInputTypes } from '@smithy/types';
import { getAllTags } from '@/app/api/tag';
import { Photo as PhotoType } from '@/models/photo';
import { getAllCategories } from '@/app/api/category';
import { useSessionStorage } from 'usehooks-ts';
import { useUserStore } from '@/stores/user';

type Photo = {
  id: number;
  photoUrl: string;
  title: string;
  tags: string[];
  status: 'Visible' | 'Hidden';
  categories: string[];
  additionalcategories?: string[];
  license?: string;
  price: number;
}

// const photos: Photo[] = [
//   {
//     id: 1,
//     image:
//       'https://cdn.builder.io/api/v1/image/assets/TEMP/1931d5d1c17694c6da1c5360d8955aa360679067164f2aca17044fc0b0db554f?placeholderIfAbsent=true&apiKey=3db36c7a47f0421d9f87c365488106cc',
//     title: 'Laying cat',
//     tags: ['cat', 'animal', 'nature'],
//     status: 'Visible',
//     categories: ['Animals', 'Nature'],
//     license: '465zł',
//     price: '100 zł',
//   },
//   {
//     id: 2,
//     image:
//       'https://cdn.builder.io/api/v1/image/assets/TEMP/044c3c09b4b4108d2480c0aafa363627043ad0df7814c95fd1830be57a8eed1d?placeholderIfAbsent=true&apiKey=3db36c7a47f0421d9f87c365488106cc',
//     title: 'Horse in mountains',
//     tags: ['horse', 'animal', 'nature'],
//     status: 'Hidden',
//     categories: ['Animals', 'Nature'],
//     price: '150zł',
//   },
//   {
//     id: 3,
//     image:
//       'https://cdn.builder.io/api/v1/image/assets/TEMP/099d10e267291aedff3d6f2a402521bde5258095a16ade67afbf1f38b590c30b?placeholderIfAbsent=true&apiKey=3db36c7a47f0421d9f87c365488106cc',
//     title: 'Person in front of a sun...',
//     tags: ['person', 'people', 'sunset'],
//     status: 'Visible',
//     categories: ['People', 'Landscape'],
//     price: '30zł',
//   },
// ];

/* 
const ManagementTable = () => {
  return (
    <section className='flex z-0 flex-col justify-center p-6 mt-16 w-full bg-white max-md:px-5 max-md:mt-10 max-md:max-w-full'>
      <div className='flex flex-col w-full max-md:max-w-full'>
        <div className='flex flex-wrap gap-4 px-4 py-2 w-full border-b border-solid border-b-neutral-300 min-h-[64px] max-md:max-w-full'>
          <div className='flex overflow-hidden flex-col justify-center p-0.5 my-auto w-6 rounded-lg'>
            <div className='flex shrink-0 w-5 h-5 bg-white rounded-md border-2 border-solid border-zinc-300' />
          </div>
          <div className='flex flex-wrap flex-1 shrink gap-2 justify-center items-center h-full text-sm font-bold tracking-normal leading-5 whitespace-nowrap basis-0 min-w-[240px] text-zinc-800 max-md:max-w-full'>
            {['Photos', 'Status', 'categories', 'License', 'Price'].map(
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
 */

interface ManagamentTableProps {
  username: string;
}

const ManagementTable = ({ username } : ManagamentTableProps) => {

  const [tags, setTags] = useState<{ id: number; name: string; }[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string; }[]>([]);

  getAllTags().then(fetchedTags => {
    if(tags.length === 0){
      console.log(fetchedTags)
      setTags(fetchedTags)
    }
  })

  getAllCategories().then(fetchedCategories => {
    if(categories.length === 0){
      console.log(fetchedCategories)
      setCategories(fetchedCategories)
    }
  })

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  const [fileUploaded, setUploadedFile] = useState<Blob>();
  const [photoFilename, setPhotoFilename] = useState<string>();


  // const queryClient = new QueryClient();
  
  // const ExampleWithProviders = () => (
  //   //Put this with your other react-query providers near root of your app
  //   <QueryClientProvider client={queryClient}>
  //     <ManagementTable />
  //   </QueryClientProvider>
  // );
    
  const validateRequired = (value: string | string[]) => Array.isArray(value) ? value.length > 0 : !!value.length;
  function validatePhoto(photo: Photo) {
    return {
      title: validateRequired(photo.title) ? undefined : 'Title is required',
      tags: validateRequired(photo.tags) ? undefined : 'Tags are required',
      status: validateRequired(photo.status) ? undefined : 'Status is required',
      categories: validateRequired(photo.categories) ? undefined : 'categories is required',
      price: validateRequired(photo.price) ? undefined : 'Price is required',
    };
  }
  
  const columns = useMemo<MRT_ColumnDef<Photo>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'photoUrl',
        header: 'Image',
        enableEditing: true,
        Cell: ({ row }) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <img
                  alt="photo"
                  height={30}
                  src={row.original.photoUrl}
                  loading="lazy"
                  style={{ borderRadius: '50%' }}
                />
              </Box>
            ),
        muiEditTextFieldProps: {
          type: 'file',
          accept: 'image/*',
          required: true,
          error: !!validationErrors.image,
          helperText: validationErrors.image,
          onChange: (e: any) => {
            var file = e.target.files[0];
            var reader = new FileReader();
            setPhotoFilename(file.name);
            debugger
          
            reader.onload = (event) => {
              setUploadedFile(event.target?.result); 
            };
          
            reader.readAsDataURL(file); 
          
          }
        },
      },
      {
        accessorKey: 'title',
        header: 'Title',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors.title,
          helperText: validationErrors.title,
        },
      },
      {
        accessorKey: 'tags',
        header: 'Tags',
        editSelectOptions: tags.map(tag => tag.name),
        muiEditTextFieldProps: {
          select: true,
          required: true,
          error: !!validationErrors.tags,
          helperText: validationErrors.tags,
        },
      //   editComponent: ({ cell, column, row, table }) => (
      //     <Autocomplete
      //       multiple
      //       freeSolo
      //       value={cell.getValue() || []}
      //       onChange={(event, newValue) => {
      //         cell.setValue(newValue);
      //       }}
      //       // options={tags} 
      //       value={cell.getValue() || []}
      //   onChange={(event, newValue) => {
      //   // Ensure only the 'value' property is stored in the cell
      //   const valuesOnly = newValue.map(tag => typeof tag === 'string' ? tag : tag.value); 
      //   cell.setValue(valuesOnly); 
      // }}
      //       renderTags={(value, getTagProps) =>
      //         value.map((option, index) => (
      //           <Chip variant="outlined" label={option} {...getTagProps({ index })} />
      //         ))
      //       }
      //       renderInput={(params) => (
      //         <TextField 
      //           {...params} 
      //           label="Tags" 
      //           placeholder="Add tags" 
      //           error={!!validationErrors.tags} // Apply error state 
      //           helperText={validationErrors.tags} // Display error message
      //         />
      //       )}
      //     />
      //   ),
        
      },
      {
        accessorKey: 'status',
        header: 'Status',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors.status,
          helperText: validationErrors.status,
        },
      }, 
    {
        accessorKey: 'categories',
        header: 'categories',
        editVariant: 'select',
        editSelectOptions: categories.map(categories => categories.name),
        muiEditTextFieldProps: {
          select: true,
          required: true,
          error: !!validationErrors.categories,
          helperText: validationErrors.categories,
        },
      
      },
      {
        accessorKey: 'additionalcategories',
        header: 'Additional categories',
        editVariant: 'select',
        editSelectOptions: categories.map(categories => categories.name),
        muiEditTextFieldProps: {
          select: true,
          required: false,
          error: !!validationErrors.categories,
          helperText: validationErrors.categories,
        },
        
      },
      {
        accessorKey: 'license',
        header: 'License',
        muiEditTextFieldProps: {
          required: false,
          error: !!validationErrors.license,
          helperText: validationErrors.license,
        }
      },
      {
        accessorKey: 'price',
        header: 'Price',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors.price,
          helperText: validationErrors.price,
        }
      },
    ],
    [validationErrors, tags],
  );


  //hooks
  const {
    mutateAsync: addPhoto,
    isPending: isAddingPhoto
  } = useAddPhoto();

  const {
    data: fetchedPhotos = [],
    isError: isLoadingPhotosError,
    isFetching: isFetchingPhotos,
    isLoading: isLoadingPhotos,
  } = useGetPhotosByPhotographerWithDetails(username)

  console.log(fetchedPhotos)

  const {
    mutateAsync: updatePhoto,
    isPending: isUpdatingPhoto,
  } = useUpdatePhoto();

  const {
    mutateAsync: deletePhoto,
    isPending: isDeletingPhoto,
  } = useDeletePhoto();

  function useAddPhoto() {
    const { mutate } = usePutPhoto(); 

    return useMutation({
      mutationFn: async (photo: PhotoType) => {
        console.log(photo)
        photo.categories = [photo.categories, photo.additionalcategories];
        photo.tags = [photo.tags]
        photo.tags = photo.tags.map(tag => tags.find(t => t.name === tag)!.id);
        photo.categories = photo.categories.map(category => categories.find(c => c.name === category)!.id);
        console.log(photoFilename)
        mutate({
          photoname: photoFilename ?? "missing",
          photofile: fileUploaded!!,
          photo: photo
        });
        return Promise.resolve();
      },
    });
  }

    //UPDATE hook (put user in api)
    function useUpdatePhoto() {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: async (photo: Photo) => {
          //send api update request here
          await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
          return Promise.resolve();
        },
        //client side optimistic update
        onMutate: (newPhotoInfo: Photo) => {
          queryClient.setQueryData(['photos'], (prevPhotos: any) =>
            prevPhotos?.map((prevPhoto: Photo) =>
              prevPhoto.id === newPhotoInfo.id ? newPhotoInfo : prevPhoto,
            ),
          );
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
      });
    }
    
    //DELETE hook (delete user in api)
    function useDeletePhoto() {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: async (photoId: number) => {
          //send api update request here
          await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
          return Promise.resolve();
        },
        //client side optimistic update
        onMutate: (photoId: number) => {
          queryClient.setQueryData(['photo'], (prevPhotos: any) =>
            prevPhotos?.filter((photo: Photo) => photo.id !== photoId),
          );
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
      });
    }
    
  //actions
  const handleAddPhoto: MRT_TableOptions<Photo>['onCreatingRowSave'] = async ({
    values,
    table,
  }) => {
    const newValidationErrors = validatePhoto(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await addPhoto(values);  
    table.setCreatingRow(null);
  };

  const handleSavePhoto: MRT_TableOptions<Photo>['onEditingRowSave'] = async ({
    values,
    table,
  }) => {
    const newValidationErrors = validatePhoto(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updatePhoto(values);
    table.setEditingRow(null);
  };

  const openDeleteConfirmModal = (row: MRT_Row<Photo>) => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      deletePhoto(row.original.id);
    }
  };


  const table = useMaterialReactTable({
    columns,
    data: fetchedPhotos,
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingPhotosError
      ? {
        color: 'error',
        children: 'Error loading data',
      }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleAddPhoto,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSavePhoto,

    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Add new photo</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {internalEditComponents} { }
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edit photo</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true); //simplest way to open the create row modal with no default values
          //or you can pass in a row object to set default values with the `createRow` helper function
          // table.setCreatingRow(
          //   createRow(table, {
          //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
          //   }),
          // );
        }}
      >
        Add photo
      </Button>
    ),
    state: {
      isLoading: isLoadingPhotos,
      isSaving: isAddingPhoto || isUpdatingPhoto || isDeletingPhoto,
      showAlertBanner: isLoadingPhotosError,
      showProgressBars: isFetchingPhotos,
    },
  });

  return <MaterialReactTable table={table} />;
};

export default ManagementTable;
