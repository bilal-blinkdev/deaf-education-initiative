import React, { ReactNode } from 'react';
import { JSX } from 'react/jsx-runtime';
import styles from './styles.module.scss';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingProps = {
  children: ReactNode;
  level?: HeadingLevel;
  align?: 'left' | 'right' | 'center' | 'justify';
  color?: string;
  bold?: boolean;
  className?: string;
};

const Heading: React.FC<HeadingProps> = ({
  children,
  level = 1,
  align = 'left',
  color,
  bold = true,
  className = '',
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag
      className={`${styles.heading} ${className}`}
      style={{
        textAlign: align,
        color,
        fontWeight: bold ? 'bold' : 'normal',
      }}
    >
      {children}
    </Tag>
  );
};

export default Heading;
