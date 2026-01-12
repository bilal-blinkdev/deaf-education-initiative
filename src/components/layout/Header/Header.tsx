import { Header as HeaderType } from '@/payload-types';

import Container from '../Container';
import Button from '@/components/elements/Button';
import LogoWithText from '@/graphics/LogoV2WithText';
import SmartLink from '@/components/elements/SmartLink';
import { fetchGlobal } from '@/app/lib/payload/fetchGlobal';
import HamburgerMenu from '@/graphics/HamburgerMenu';
import { cn } from '@/utils/ui';
import styles from './styles.module.scss';
import MobileMenu from './MobileMenu';

export default async function Header() {
  const headerData = await fetchGlobal<HeaderType>('header', 2);

  if (!headerData) {
    return null;
  }

  const { navItems, buttons } = headerData;
  console.log(navItems);

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.flex}>
          <section className={styles.logo}>
            <LogoWithText />
          </section>
          {navItems && (
            <section className={styles.navMenu}>
              <nav>
                <ul>
                  {navItems?.map((item) => {
                    if (!item) return null;
                    return (
                      <li
                        key={item.id}
                        className={cn(styles.navItem, [item.hasSubMenu ? styles.hasSubMenu : ''])}
                      >
                        {item.hasSubMenu ? (
                          <>
                            <span className={styles.navItemTitle}>{item.title}</span>
                            <ul className={styles.subMenu}>
                              {item.subMenu?.map((subItem) => {
                                if (!subItem) return null;
                                return (
                                  <li key={subItem.id}>
                                    <SmartLink link={subItem} className={styles.navLink} />
                                  </li>
                                );
                              })}
                            </ul>
                          </>
                        ) : (
                          // Create the link object for SmartLink on the fly
                          <SmartLink
                            link={{
                              linkText: item.title,
                              linkType: item.linkType ?? 'custom',
                              internalPage: item.internalPage,
                              customUrl: item.customUrl,
                              openInNewTab: item.openInNewTab,
                            }}
                            className={styles.navLink}
                          />
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <div className={styles.buttonsGroup}>
                {buttons &&
                  buttons.map((btn, index) => (
                    <SmartLink key={index} link={btn} className={styles.buttonLink}>
                      <Button size="large">{btn.linkText}</Button>
                    </SmartLink>
                  ))}
              </div>
            </section>
          )}

          {/* The invisible checkbox that will control the drawer state */}
          <input type="checkbox" id="mobile-menu-toggle" className={styles.menuToggle} />
          {/* --- Mobile Menu Button (label for the checkbox) --- */}
          <label htmlFor="mobile-menu-toggle" className={styles.mobileMenuButton}>
            <HamburgerMenu width="24" height="24" />
          </label>
          {/* --- Mobile Drawer --- */}
          <MobileMenu navItems={navItems} buttons={buttons} />
        </div>
      </Container>
    </header>
  );
}
