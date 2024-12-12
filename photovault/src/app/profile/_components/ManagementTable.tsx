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
import { MRT_Localization_PL } from 'material-react-table/locales/pl';
import { MRT_Localization_EN } from 'material-react-table/locales/en';
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
  FormControlLabel,
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
import {
  useDeletePhoto,
  useGetPhotosByPhotographerWithDetails,
  usePhotos,
  usePutPhoto,
  useUpdatePhoto,
} from '@/services/query/photo';
import { StreamingBlobPayloadInputTypes } from '@smithy/types';
import { getAllTags } from '@/app/api/tag';
import { FullPhoto, FullPhoto as PhotoType } from '@/models/photo';
import { getAllCategories } from '@/app/api/category';
import { useSessionStorage } from 'usehooks-ts';
import { useUserStore } from '@/stores/user';
import { useTranslations } from 'next-intl';
import { NodeNextRequest } from 'next/dist/server/base-http/node';
import { Afacad } from 'next/font/google';

type Photo = {
  id: number;
  photoURL: string;
  title: string;
  tags: string[];
  categories: string[];
  additionalcategories?: string[];
  license?: boolean;
  licensePrice?: any;
  price: number;
};

interface ManagamentTableProps {
  username: string;
}

const ManagementTable = ({ username }: ManagamentTableProps) => {
  const [tags, setTags] = useState<{ id: number; name: string }[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    [],
  );
  const [isEditing, setIsEditing] = useState(false);
  const t = useTranslations('Profile');

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
    value !== undefined &&
    value !== null &&
    value !== '' &&
    (!Array.isArray(value) || value.length > 0);
  function validatePhoto(photo: Photo) {
    return {
      title: validateRequired(photo.title) ? undefined : t('title-required'),
      tags: validateRequired(photo.tags) ? undefined : t('tags-required'),
      categories: validateRequired(photo.categories)
        ? undefined
        : t('categories-required'),
      price: validateRequired(photo.price) ? undefined : t('price-required'),
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
        header: t('images'),
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
              height='50'
              width='50'
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
        header: t('title'),
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors.title,
          helperText: validationErrors.title,
        },
      },
      {
        accessorKey: 'tags',
        header: t('tags'),
        editSelectOptions: tags.map((tag) => tag.name),
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
            {(cell.getValue() as string[]).map((tag) => (
              <div key={tag}>{tag}</div>
            ))}
          </div>
        ),
      },
      {
        accessorKey: 'categories',
        header: t('categories'),
        editVariant: 'select',
        editSelectOptions: categories.map((categories) => categories.name),
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
            {(cell.getValue() as string[]).map((category) => (
              <div key={category}>{category}</div>
            ))}
          </div>
        ),
      },
      {
        accessorKey: 'license',
        header: t('license'),
        editVariant: 'select',
        editSelectOptions: ['true', 'false'],
        muiEditTextFieldProps: {
          required: false,
          error: !!validationErrors.license,
          helperText: validationErrors.license,
        },
        Cell: ({ cell }) => (
          <div>{cell.getValue() ? t('available') : t('not-available')}</div>
        ),
      },
      {
        accessorKey: 'licensePrice',
        header: t('license-price'),
        muiEditTextFieldProps: {
          required: false,
          error: !!validationErrors.licensePrice,
          helperText: validationErrors.licensePrice,
        },
      },
      {
        accessorKey: 'price',
        header: t('price'),
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

  const { mutateAsync: updatePhoto, isPending: isUpdatingPhoto } =
    useUpdatePhoto();

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
    values.tags = values.tags.map((tag: { id: number }) => tag.id);
    values.categories = values.categories.map(
      (category: { id: number }) => category.id,
    );
    const formData = new FormData();
    formData.append('image', fileUploaded!);

    await addPhoto({
      photoname: photoFilename!,
      photofile: formData,
      photo: values,
    });
    table.setCreatingRow(null);
    await refetchPhotos();
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
    const cat = categories
      .filter((c) => values.categories.includes(c.name))
      .map((c) => c.id);
    const tag = tags
      .filter((t) => values.tags.includes(t.name))
      .map((t) => t.id);
    await updatePhoto({
      photo: {
        ...values,
        tags: tag,
        categories: cat,
      },
    });
    table.setEditingRow(null);
  };

  const openDeleteConfirmModal = async (row: MRT_Row<Photo>) => {
    if (window.confirm(t('delete-confirm'))) {
      deletePhoto(row.original.id);
      await refetchPhotos();
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
    localization:
      t('localization') === 'pl' ? MRT_Localization_PL : MRT_Localization_EN,
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleAddPhoto,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSavePhoto,

    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant='h3'>{t('add-photo')}</DialogTitle>
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
      return (
        <>
          <DialogTitle variant='h3'>{t('edit')}</DialogTitle>
          <DialogContent
            sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            {internalEditComponents}
          </DialogContent>
          <DialogActions>
            <MRT_EditActionButtons variant='text' table={table} row={row} />
          </DialogActions>
        </>
      );
    },
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title={t('edit')}>
          <IconButton
            onClick={() => {
              setIsEditing(true);
              table.setEditingRow(row);
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('delete')}>
          <IconButton color='error' onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant='contained'
        className='overflow-hidden self-center mt-16 font-medium text-white bg-black min-h-[44px] rounded-[62px] w-[236px]'
        sx={{
          overflow: 'hidden',
          alignSelf: 'center',
          fontFamily: 'inherit',
          fontWeight: 'medium',
          color: 'white',
          backgroundColor: 'black',
          minHeight: '10px',
          borderRadius: '62px',
          width: '130px',
          textTransform: 'capitalize',
        }}
        onClick={() => {
          setIsEditing(false);
          table.setCreatingRow(
            createRow(table, {
              id: 0,
              photoURL: '',
              title: '',
              tags: [],
              categories: [],
              price: 0,
            }),
          );
        }}
      >
        {t('add-photo')}
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
