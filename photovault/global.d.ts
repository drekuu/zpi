import pl from './messages/pl.json';

type Messages = typeof pl;

declare global {
  // eslint-disable-next-line
  interface IntlMessages extends Messages {}
}
