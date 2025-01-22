import { useMemo, useState } from 'react';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
  createRow,
  DropdownOption,
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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  useDeletePhoto,
  useGetPhotosByPhotographerWithDetails,
  usePutPhoto,
  useUpdatePhoto,
} from '@/services/query/photo';
import { useTranslations } from 'next-intl';
import { ManagementTablePhoto } from '@/models/photo';
import { mapTagsById, useTags } from '@/services/query/tag';
import { mapCategoriesById, useCategories } from '@/services/query/category';
import { useQueryClient } from '@tanstack/react-query';
import { getLocale } from '@/services/localeClient';

interface ManagamentTableProps {
  username: string;
}

const ManagementTable = ({ username }: ManagamentTableProps) => {
  const t = useTranslations('Profile');
  const tagsT = useTranslations('Tags');
  const categoriesT = useTranslations('Categories');

  const locale = getLocale();
  const queryClient = useQueryClient();

  const categoriesQuery = useCategories();
  const categories = mapCategoriesById(
    categoriesQuery.data?.map((category) => ({
      ...category,
      name:
        locale === 'en' ? category.name : categoriesT(category.hrefKey as any),
    })),
  );

  const tagsQuery = useTags();
  const tags = mapTagsById(
    tagsQuery.data?.map((tag) => ({
      ...tag,
      name: locale === 'en' ? tag.name : tagsT(tag.name as any),
    })),
  );

  const photosQuery = useGetPhotosByPhotographerWithDetails(username);
  const photos = photosQuery.data ?? [];

  const isLoading =
    categoriesQuery.isLoading || tagsQuery.isLoading || photosQuery.isLoading;
  const isError =
    categoriesQuery.isError || tagsQuery.isError || photosQuery.isError;
  const isFetching =
    categoriesQuery.isFetching ||
    tagsQuery.isFetching ||
    photosQuery.isFetching;

  const [isEditing, setIsEditing] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  const [fileUploaded, setUploadedFile] = useState<File>();
  const [photoFilename, setPhotoFilename] = useState<string>();

  const validateRequired = <T,>(value: T | Array<T>) =>
    value === undefined ||
    value === null ||
    value === '' ||
    (Array.isArray(value) && value.length === 0);
  const validateNonNegative = (value: number) => isNaN(value) || value < 0;
  function validatePhoto(photo: ManagementTablePhoto) {
    return {
      title: validateRequired(photo.title) ? t('title-required') : undefined,
      tags: validateRequired(photo.tags) ? t('tags-required') : undefined,
      categories: validateRequired(photo.categories)
        ? t('categories-required')
        : undefined,
      price: validateRequired(photo.price)
        ? t('price-required')
        : validateNonNegative(+photo.price)
          ? t('price-invalid')
          : undefined,
      licensePrice: validateRequired(photo.licensePrice)
        ? t('price-required')
        : validateNonNegative(+photo.licensePrice)
          ? t('price-invalid')
          : undefined,
    };
  }

  const columns = useMemo<MRT_ColumnDef<ManagementTablePhoto>[]>(
    () =>
      tags && categories
        ? [
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
                  <picture>
                    <img
                      alt=''
                      height='50'
                      width='50'
                      src={row.original.photoURL}
                      loading='lazy'
                      style={{ borderRadius: '13%' }}
                    />
                  </picture>
                </Box>
              ),
              muiEditTextFieldProps: {
                type: 'file',
                accept: 'image/*',
                required: true,
                error: !!validationErrors.image,
                helperText: validationErrors.image,
                onChange: (e: any) => {
                  const file = e.target.files[0];
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
              editSelectOptions: Object.values(tags).map(
                (tag): DropdownOption => ({ value: tag.id, label: tag.name }),
              ),
              muiEditTextFieldProps: {
                select: true,
                required: true,
                error: !!validationErrors.tags,
                helperText: validationErrors.tags,
                slotProps: {
                  select: { multiple: true },
                },
              },
              Cell: ({ cell }) => (
                <div>
                  {cell.getValue<Array<number>>().map((tagId) => {
                    return <div key={tagId}>{tags[tagId].name}</div>;
                  })}
                </div>
              ),
            },
            {
              accessorKey: 'categories',
              header: t('categories'),
              editSelectOptions: Object.values(categories).map(
                (category): DropdownOption => ({
                  value: category.id,
                  label: category.name,
                }),
              ),
              muiEditTextFieldProps: {
                select: true,
                required: true,
                error: !!validationErrors.categories,
                helperText: validationErrors.categories,
                slotProps: {
                  select: { multiple: true },
                },
              },
              Cell: ({ cell }) => (
                <div>
                  {cell.getValue<Array<number>>().map((categoryId) => (
                    <div key={categoryId}>{categories[categoryId].name}</div>
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
                <div>
                  {cell.getValue() ? t('available') : t('not-available')}
                </div>
              ),
            },
            {
              accessorKey: 'licensePrice',
              header: t('license-price'),
              muiEditTextFieldProps: {
                type: 'number',
                required: true,
                error: !!validationErrors.licensePrice,
                helperText: validationErrors.licensePrice,
                slotProps: {
                  input: {
                    type: 'number',
                  },
                  htmlInput: {
                    min: 0,
                  },
                },
              },
            },
            {
              accessorKey: 'price',
              header: t('price'),
              muiEditTextFieldProps: {
                type: 'number',
                required: true,
                error: !!validationErrors.price,
                helperText: validationErrors.price,
                slotProps: {
                  input: {
                    type: 'number',
                  },
                  htmlInput: {
                    min: 0,
                  },
                },
              },
            },
          ]
        : [],
    [categories, t, validationErrors, tags, isEditing],
  );

  const { mutateAsync: addPhoto, isPending: isAddingPhoto } = usePutPhoto();

  const { mutateAsync: updatePhoto, isPending: isUpdatingPhoto } =
    useUpdatePhoto();

  const { mutateAsync: deletePhoto, isPending: isDeletingPhoto } =
    useDeletePhoto();

  const handleAddPhoto: MRT_TableOptions<ManagementTablePhoto>['onCreatingRowSave'] =
    async ({ values, table }) => {
      const newValidationErrors = validatePhoto(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }
      setValidationErrors({});

      const formData = new FormData();
      formData.append('image', fileUploaded!);

      await addPhoto({
        photoname: photoFilename!,
        photofile: formData,
        photo: values,
      });
      table.setCreatingRow(null);

      await queryClient.invalidateQueries({
        queryKey: ['photographer', 'photos', username, 'details'],
      });
    };

  const handleSavePhoto: MRT_TableOptions<ManagementTablePhoto>['onEditingRowSave'] =
    async ({ values, table }) => {
      const newValidationErrors = validatePhoto(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }
      setValidationErrors({});

      await updatePhoto({
        photo: {
          ...values,
          tags: values.tags,
          categories: values.categories,
        },
      });
      table.setEditingRow(null);

      await queryClient.invalidateQueries({
        queryKey: ['photographer', 'photos', username, 'details'],
      });
    };

  const openDeleteConfirmModal = async (row: MRT_Row<ManagementTablePhoto>) => {
    if (window.confirm(t('delete-confirm'))) {
      await deletePhoto(row.original.id);
      await queryClient.invalidateQueries({
        queryKey: ['photographer', 'photos', username, 'details'],
      });
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: photos,
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    enableEditing: true,
    muiToolbarAlertBannerProps: isError
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
    localization: locale === 'pl' ? MRT_Localization_PL : MRT_Localization_EN,
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
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
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
    ),
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
              photographId: 0,
              photoURL: '',
              title: '',
              tags: [],
              categories: [],
              price: 0,
              license: false,
              licensePrice: 0,
            }),
          );
        }}
      >
        {t('add-photo')}
      </Button>
    ),
    state: {
      isLoading: isLoading,
      isSaving: isAddingPhoto || isUpdatingPhoto || isDeletingPhoto,
      showAlertBanner: isError,
      showProgressBars: isFetching,
    },
  });

  return <MaterialReactTable table={table} />;
};

export default ManagementTable;
