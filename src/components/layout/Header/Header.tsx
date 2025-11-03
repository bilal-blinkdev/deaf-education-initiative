import Link from 'next/link';
import { Header as HeaderType } from '@/payload-types';

import Container from '../Container';
import Button from '@/components/elements/Button';
import LogoWithText from '@/graphics/LogoV2WithText';
import SmartLink from '@/components/elements/SmartLink'; // Reusing your SmartLink component
import LogoutButton from '@/components/elements/LogoutButton';
import { getUser } from '@/app/(frontend)/(authenticated)/_actions/getUser';
import styles from './styles.module.scss';
import { fetchGlobal } from '@/app/lib/payload/fetchGlobal';
import HamburgerMenu from '@/graphics/HamburgerMenu';
import Cross from '@/graphics/Cross';
import { cn } from '@/utils/ui';

export default async function Header() {
  const headerData = await fetchGlobal<HeaderType>('header', 2);

  if (!headerData) {
    return null;
  }

  const { navItems, buttons } = headerData;

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
              <div className={styles.userProfileBtn}>
                {<LogoutButton />}
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
          <aside className={styles.drawer}>
            <div className={styles.drawerHeader}>
              <label htmlFor="mobile-menu-toggle" className={styles.closeButton}>
                <Cross width="24" height="24" color="var(--titan-white)" />
              </label>
            </div>
            <nav className={styles.drawerNav}>
              <ul>
                {navItems &&
                  navItems.map((item, index) => (
                    <li key={index}>
                      <label htmlFor="mobile-menu-toggle">{/* <SmartLink link={item} /> */}</label>
                    </li>
                  ))}
              </ul>
            </nav>
            <div className={styles.userProfileBtn}>
              {buttons &&
                buttons.map((btn, index) => (
                  <SmartLink key={index} link={btn}>
                    <Button size="large" width="full">
                      {btn.linkText}
                    </Button>
                  </SmartLink>
                ))}
              {<LogoutButton style="default" width="full" />}
            </div>
          </aside>
        </div>
      </Container>
    </header>
  );
}
