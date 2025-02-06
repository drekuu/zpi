import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { DeliveryData } from '@/models/user';
import { immer } from 'zustand/middleware/immer';

interface DeliveryDataState {
  deliveryData: DeliveryData;
}

interface DeliveryDataActions {
  setName: (state: string) => void;
  setSurname: (state: string) => void;
  setCountry: (state: string) => void;
  setCity: (state: string) => void;
  setStreet: (state: string) => void;
  setZipCode: (state: string) => void;
  setTelephone: (state: string) => void;
}

type DeliveryDataStore = DeliveryDataState & DeliveryDataActions;

export const useDeliveryDataStore = create<DeliveryDataStore>()(
  devtools(
    immer(
      (set): DeliveryDataStore => ({
        deliveryData: {
          name: '',
          surname: '',
          country: '',
          city: '',
          street: '',
          zipCode: '',
          telephone: '',
        },
        setName: (name: string) =>
          set((state) => {
            state.deliveryData.name = name;
          }),
        setSurname: (surname: string) =>
          set((state) => {
            state.deliveryData.surname = surname;
          }),
        setCountry: (country: string) =>
          set((state) => {
            state.deliveryData.country = country;
          }),
        setCity: (city: string) =>
          set((state) => {
            state.deliveryData.city = city;
          }),
        setStreet: (street: string) =>
          set((state) => {
            state.deliveryData.street = street;
          }),
        setZipCode: (zipCode: string) =>
          set((state) => {
            state.deliveryData.zipCode = zipCode;
          }),
        setTelephone: (telephone: string) =>
          set((state) => {
            state.deliveryData.telephone = telephone;
          }),
      }),
    ),
  ),
);
