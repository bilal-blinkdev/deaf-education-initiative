import React, { ReactNode, CSSProperties } from 'react';
import styles from './styles.module.scss';

type ParagraphProps = {
  children: ReactNode;
  align?: 'left' | 'right' | 'center' | 'justify';
  color?: string;
  bold?: boolean;
  className?: string;
};

const Paragraph: React.FC<ParagraphProps> = ({
  children,
  align = 'left',
  color,
  bold = false,
  className = '',
}) => {
  const style: CSSProperties = {
    textAlign: align,
    color,
    fontWeight: bold ? 'bold' : 'normal',
  };

  return (
    <p className={`${styles.text} ${className}`} style={style}>
      {children}
    </p>
  );
};

export default Paragraph;
