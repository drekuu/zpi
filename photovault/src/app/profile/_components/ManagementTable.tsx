import { useEffect, useMemo, useState } from 'react';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  // createRow,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
  createRow,
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
  Stack,
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
import { useDeletePhoto, useGetPhotosByPhotographerWithDetails, usePhotos, usePutPhoto, useUpdatePhoto } from '@/services/query/photo';
import { StreamingBlobPayloadInputTypes } from '@smithy/types';
import { getAllTags } from '@/app/api/tag';
import { FullPhoto as PhotoType } from '@/models/photo';
import { getAllCategories } from '@/app/api/category';
import { useSessionStorage } from 'usehooks-ts';
import { useUserStore } from '@/stores/user';

type Photo = {
  id: number;
  photoUrl: string;
  title: string;
  tags: string[];
  categories: string[];
  additionalcategories?: string[];
  license?: string;
  price: number;
};

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

const ManagementTable = ({ username }: ManagamentTableProps) => {
  const [tags, setTags] = useState<{ id: number; name: string }[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    [],
  );
  const [isEditing, setIsEditing] = useState(false);

  getAllTags().then((fetchedTags) => {
    if (tags.length === 0) {
      setTags(fetchedTags);
    }
  });

  getAllCategories().then((fetchedCategories) => {
    if (categories.length === 0) {
      setCategories(fetchedCategories);
    }
  });

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  const [fileUploaded, setUploadedFile] = useState<File>();
  const [photoFilename, setPhotoFilename] = useState<string>();


  const validateRequired = (value: string | string[] | number) =>
    value !== undefined && value !== null && value !== '' && value != [];
  function validatePhoto(photo: Photo) {
    return {
      title: validateRequired(photo.title) ? undefined : 'Title is required',
      tags: validateRequired(photo.tags) ? undefined : 'Tags are required',
      categories: validateRequired(photo.categories)
        ? undefined
        : 'categories is required',
      price: validateRequired(photo.price) ? undefined : 'Price is required',
    };
  }

  const columns = useMemo<MRT_ColumnDef<Photo>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        Edit: () => null,
        size: 80,
      },
      {
        accessorKey: 'photoUrl',
        enableEditing: !isEditing,
        header: 'Image',
        Cell: ({ row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <img
              alt='photo'
              height="50"
              width="50"
              src={row.original.photoURL}
              loading='lazy'
              style={{ borderRadius: '13%' }}
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
            setUploadedFile(file);
            setPhotoFilename(file.name);
          },
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
        editSelectOptions: tags.map(tag => (tag.name)),
        muiEditTextFieldProps: {
          select: true,
          required: true,
          error: !!validationErrors.tags,
          helperText: validationErrors.tags,
          SelectProps: {
            multiple: true,
          },
        },
        Cell: ({ cell }) => (
          <div>
            {cell.getValue().map((tag) => (
              <div key={tag}>{tag}</div>
            ))}
          </div>
        ),
      },
      {
        accessorKey: 'categories',
        header: 'Categories',
        editVariant: 'select',
        editSelectOptions: categories.map(categories => categories.name),
        muiEditTextFieldProps: {
          select: true,
          required: true,
          error: !!validationErrors.categories,
          helperText: validationErrors.categories,
          SelectProps: {
            multiple: true,
          },
        },
        Cell: ({ cell }) => (
          <div>
            {cell.getValue().map((category) => (
              <div key={category}>{category}</div>
            ))}
          </div>
        ),
      
      
      },
      // {
      //   accessorKey: 'additionalcategories',
      //   header: 'Additional categories',
      //   editVariant: 'select',
      //   editSelectOptions: categories.map((categories) => categories.name),
      //   muiEditTextFieldProps: {
      //     select: true,
      //     required: false,
      //   },
      // },
      {
        accessorKey: 'license',
        header: 'License',
        muiEditTextFieldProps: {
          required: false,
          error: !!validationErrors.license,
          helperText: validationErrors.license,
        },
      },
      {
        accessorKey: 'price',
        header: 'Price',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors.price,
          helperText: validationErrors.price,
        },
      },
    ],
    [validationErrors, tags, isEditing],
  );

  const { mutateAsync: addPhoto, isPending: isAddingPhoto } = usePutPhoto();

  const {
    data: fetchedPhotos = [],
    isError: isLoadingPhotosError,
    isFetching: isFetchingPhotos,
    isLoading: isLoadingPhotos,
    refetch: refetchPhotos,
  } = useGetPhotosByPhotographerWithDetails(username);

  const {
    mutateAsync: updatePhoto,
    isPending: isUpdatingPhoto,
  } = useUpdatePhoto();

  const { mutateAsync: deletePhoto, isPending: isDeletingPhoto } =
    useDeletePhoto();

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
    console.log(values)
    values.tags = values.tags.map(tag => tag.id);
    values.categories = values.categories.map(category => category.id);
    console.log(values)
    const formData = new FormData();
    formData.append('image', fileUploaded!);

    await addPhoto({photoname: photoFilename!, photofile: formData, photo: values });
    table.setCreatingRow(null);
    await refetchPhotos()
  };

  const handleSavePhoto: MRT_TableOptions<Photo>['onEditingRowSave'] = async ({
    values,
    table,
  }) => {
    console.log("checking edit values")
    console.log(values)
    console.log(categories.find(c => c.name == 'Nature'))
    const newValidationErrors = validatePhoto(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    const cat = categories.filter((c) => values.categories.includes(c.name)).map((c) => c.id);
    const tag = tags.filter((t) => values.tags.includes(t.name)).map((t) => t.id);
    await updatePhoto({ photo: {
      ...values,
      tags: tag,
      categories: cat
    } });
    table.setEditingRow(null);
  };

  const openDeleteConfirmModal = async (row: MRT_Row<Photo>) => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      deletePhoto(row.original.id);
      await refetchPhotos()
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
        <DialogTitle variant='h3'>Add new photo</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {internalEditComponents} {}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant='text' table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => {
    setIsEditing(true);
    return <>
        <DialogTitle variant='h3'>Edit photo</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant='text' table={table} row={row} />
        </DialogActions>
      </>
    },
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title='Edit'>
          <IconButton onClick={() => {
            setIsEditing(true);
            table.setEditingRow(row)
          }}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Delete'>
          <IconButton color='error' onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant='contained'
        onClick={() => {
          setIsEditing(false);
          table.setCreatingRow(
            createRow(table, {
              tags: [],
              categories: [],
            }),
          );
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
