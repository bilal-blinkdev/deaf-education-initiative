import React, { ReactNode } from 'react';
import styles from './styles.module.scss';

type BlockquoteProps = {
  children: ReactNode;
  align?: 'left' | 'right' | 'center' | 'justify';
  color?: string;
  italic?: boolean;
  borderColor?: string;
  className?: string;
};

const Blockquote: React.FC<BlockquoteProps> = ({
  children,
  align = 'left',
  color,
  italic = true,
  borderColor,
  className = '',
}) => {
  return (
    <blockquote
      className={`${styles.blockquote} ${className}`}
      style={{
        textAlign: align,
        color,
        fontStyle: italic ? 'italic' : 'normal',
        borderLeft: borderColor ? `4px solid ${borderColor}` : undefined,
        paddingLeft: '1em',
        margin: '1em 0',
      }}
    >
      {children}
    </blockquote>
  );
};

export default Blockquote;
