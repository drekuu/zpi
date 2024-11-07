/**
 * Floating menu component
 */

import { ReactElement, forwardRef, RefObject } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import MenuItem from './components/MenuItem';
import clsx from 'clsx';

interface MenuProps {
  /**
   * Children are menu items, use {@link MenuItem}
   */
  children:
    | Array<ReactElement<typeof MenuItem>>
    | ReactElement<typeof MenuItem>;

  /**
   * Additional styling for menu, pass the positioning here
   */
  className?: string;

  /**
   * Menu open state
   */
  open: boolean;

  /**
   * Menu open state setter
   * @param state New state
   */
  setOpen: (state: boolean) => void;
}

/**
 * Menu component
 * @note Pass the `ref` prop to automatically close the menu on outside clicks
 */
const Menu = forwardRef<HTMLElement, MenuProps>(
  ({ children, className, open, setOpen }, ref) => {
    useOnClickOutside(ref as RefObject<HTMLElement>, () => setOpen(false));

    return (
      open && (
        <div
          className={clsx(
            className,
            'flex flex-col w-fit text-slate text-sm bg-white font-inter font-medium rounded-xl shadow-light absolute top-[calc(100%+16px)] right-0',
          )}
        >
          {children}
        </div>
      )
    );
  },
);
Menu.displayName = 'Menu';

export default Menu;
