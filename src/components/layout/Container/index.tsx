import styles from './styles.module.scss';

type ContainerProps = {
  children: React.ReactNode;
  customClass?: string;
};

export default function Container({ children, customClass }: ContainerProps) {
  return <div className={[styles.container, customClass && customClass].join(' ')}>{children}</div>;
}
