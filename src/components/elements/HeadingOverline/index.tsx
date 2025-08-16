import React, { ReactNode } from 'react';
import styles from './styles.module.scss';

type HeadingOverlineProps = {
  children: ReactNode;
  align?: 'left' | 'right' | 'center' | 'justify';
  color?: string;
  uppercase?: boolean;
  className?: string;
};

const HeadingOverline: React.FC<HeadingOverlineProps> = ({
  children,
  align = 'left',
  color = '#121127',
  uppercase = false,
  className = '',
}) => {
  return (
    <p
      className={`${styles.headingOverline} ${className}`}
      style={{
        textAlign: align,
        color,
        textTransform: uppercase ? 'uppercase' : 'none',
        fontWeight: 'bold',
        letterSpacing: '0.1em',
      }}
    >
      {children}
    </p>
  );
};

export default HeadingOverline;
