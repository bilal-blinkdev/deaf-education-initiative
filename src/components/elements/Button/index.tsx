'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import Plus from '@/graphics/Plus';
import LongArrowRight from '@/graphics/LongArrowRight';
import styles from './styles.module.scss';
import CircleNotch from '@/graphics/CircleNotch';

type ButtonProps = {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  style?: 'default' | 'soft' | 'text' | 'outline';
  size?: 'small' | 'medium' | 'large';
  width?: 'half' | 'full' | 'auto' | 'maxContent';
  icons?: {
    leading?: boolean;
    trailing?: boolean;
    width?: string;
    height?: string;
    color?: string;
    type?: ReactNode;
  } | null;
  link?: { href: string; target?: string } | null;
  loading?: boolean;
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
  loading = false,
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
            !loading &&
            (icons?.type
              ? icons.type
              : !icons?.type && (
                  <Plus width={icons.width} height={icons.height} color={icons.color} />
                ))}
          {loading ? (
            <CircleNotch width="24" height="24" className={styles.loadingIcon} />
          ) : (
            children
          )}
          {icons && icons.leading && !disabled && !loading && (
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
            !loading &&
            (icons?.type
              ? icons.type
              : !icons?.type && (
                  <Plus width={icons.width} height={icons.height} color={icons.color} />
                ))}
          {loading ? (
            <CircleNotch width="24" height="24" className={styles.loadingIcon} />
          ) : (
            children
          )}
          {icons && icons.leading && !loading && (
            <LongArrowRight width={icons.width} height={icons.height} color={icons.color} />
          )}
        </Link>
      )}
    </>
  );
}
