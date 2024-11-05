import en from './messages/en.json';

type Messages = typeof en;

declare global {
  // eslint-disable-next-line
  interface IntlMessages extends Messages {}
}
