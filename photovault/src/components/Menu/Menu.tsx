/**
 * Floating menu component
 */

import { ReactElement, RefObject } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import MenuItem from './components/MenuItem';
import clsx from 'clsx';

interface MenuProps {
  /**
   * Children are menu items, use {@link MenuItem}
   */
  children: Array<ReactElement<typeof MenuItem>>;

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

  /**
   * Reference to the parent component containing the menu,
   * used for detecting outside clicks
   */
  ref: RefObject<HTMLElement>;
}

/**
 * Menu component
 * @note Outside clicks are handled and close the menu
 */
export default function Menu({
  children,
  className,
  open,
  setOpen,
  ref,
}: MenuProps) {
  useOnClickOutside(ref, () => setOpen(false));

  return (
    open && (
      <div
        className={clsx(
          className,
          'flex flex-col w-fit text-slate text-sm bg-white font-inter font-medium rounded-xl shadow-light absolute',
        )}
      >
        {children}
      </div>
    )
  );
}
