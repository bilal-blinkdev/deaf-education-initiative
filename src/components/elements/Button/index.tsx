'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import Plus from '@/graphics/Plus';
import LongArrowRight from '@/graphics/LongArrowRight';
import styles from './styles.module.scss';

type ButtonProps = {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  style?: 'default' | 'soft' | 'text' | 'outline';
  size?: 'small' | 'medium' | 'large';
  width?: 'half' | 'full' | 'auto';
  icons?: {
    leading?: boolean;
    trailing?: boolean;
    width?: string;
    height?: string;
    color?: string;
    type?: ReactNode;
  } | null;
  link?: { href: string; target?: string } | null;
  disabled?: boolean;
  customClass?: string | null;
  onClick?: any;
};

export default function Button({
  children,
  type = 'button',
  style = 'default',
  size = 'medium',
  width = 'auto',
  icons = null,
  link = null,
  disabled = false,
  customClass = null,
  onClick,
}: ButtonProps) {
  return (
    <>
      {!link ? (
        <button
          type={type}
          className={[
            styles.button,
            styles[style],
            styles[size],
            styles[width],
            customClass && customClass,
          ].join(' ')}
          disabled={disabled}
          onClick={(e) => onClick?.(e)}
        >
          {icons &&
            icons.trailing &&
            !disabled &&
            (icons?.type
              ? icons.type
              : !icons?.type && (
                  <Plus width={icons.width} height={icons.height} color={icons.color} />
                ))}
          {children}
          {icons && icons.leading && !disabled && (
            <LongArrowRight width={icons.width} height={icons.height} color={icons.color} />
          )}
        </button>
      ) : (
        <Link
          href={link.href}
          className={[
            styles.link,
            styles[style],
            styles[size],
            styles[width],
            customClass && customClass,
          ].join(' ')}
          target={link.target || '_self'}
        >
          {icons &&
            icons.trailing &&
            !disabled &&
            (icons?.type
              ? icons.type
              : !icons?.type && (
                  <Plus width={icons.width} height={icons.height} color={icons.color} />
                ))}
          {children}
          {icons && icons.leading && (
            <LongArrowRight width={icons.width} height={icons.height} color={icons.color} />
          )}
        </Link>
      )}
    </>
  );
}
