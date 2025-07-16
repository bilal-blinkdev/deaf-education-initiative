import LogoWithText from '@/graphics/LogoWithText';
import Link from 'next/link';
import Container from '../Container';
import Button from '@/components/elements/Button';
import HEADER_ITEMS from '@/app/constants';
import styles from './styles.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.flex}>
          <section className={styles.logo}>
            <LogoWithText />
          </section>
          {HEADER_ITEMS && (
            <section className={styles.navMenu}>
              {HEADER_ITEMS?.navItems && (
                <nav>
                  <ul>
                    {HEADER_ITEMS?.navItems.map((item, index) => (
                      <li key={index}>
                        <Link href={item.href}>{item.text}</Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
              {HEADER_ITEMS?.buttons &&
                HEADER_ITEMS?.buttons.map((btn, index) => (
                  <Button link={{ href: btn.href ?? '' }} key={index}>
                    Donate
                  </Button>
                ))}
            </section>
          )}
        </div>
      </Container>
    </header>
  );
}
