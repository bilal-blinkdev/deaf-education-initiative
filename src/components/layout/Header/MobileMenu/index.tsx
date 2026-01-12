'use client';

import { useState } from 'react';
import { Header as HeaderType } from '@/payload-types';
import SmartLink from '@/components/elements/SmartLink';
import Button from '@/components/elements/Button';
import Cross from '@/graphics/Cross';
import ChevronRight from '@/graphics/ChevronRight';
import styles from './styles.module.scss';
import { cn } from '@/utils/ui';

type MobileMenuProps = {
  navItems: HeaderType['navItems'];
  buttons: HeaderType['buttons'];
};

export default function MobileMenu({ navItems, buttons }: MobileMenuProps) {
  const [openSubMenus, setOpenSubMenus] = useState<Set<number>>(new Set());

  const toggleSubMenu = (index: number) => {
    setOpenSubMenus((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <aside className={styles.drawer}>
      <div className={styles.drawerHeader}>
        <label htmlFor="mobile-menu-toggle" className={styles.closeButton}>
          <Cross width="24" height="24" color="var(--titan-white)" />
        </label>
      </div>
      <nav className={styles.drawerNav}>
        <ul>
          {navItems &&
            navItems.map((item, index) => {
              if (!item) return null;
              const isSubMenuOpen = openSubMenus.has(index);

              return (
                <li
                  key={index}
                  className={cn(
                    item.hasSubMenu ? styles.mobileHasSubMenu : undefined,
                    isSubMenuOpen ? styles.subMenuOpen : undefined,
                  )}
                >
                  {item.hasSubMenu ? (
                    <>
                      <button
                        className={styles.mobileSubMenuToggle}
                        onClick={() => toggleSubMenu(index)}
                        aria-expanded={isSubMenuOpen}
                        aria-label={`Toggle ${item.title} submenu`}
                      >
                        <span className={styles.mobileNavItemTitle}>{item.title}</span>
                        <ChevronRight color="var(--white)" />
                      </button>
                      <ul className={styles.mobileSubMenu}>
                        {item.subMenu?.map((subItem) => {
                          if (!subItem) return null;
                          return (
                            <li key={subItem.id}>
                              <SmartLink link={subItem} className={styles.mobileNavLink} />
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  ) : (
                    <SmartLink
                      link={{
                        linkText: item.title,
                        linkType: item.linkType ?? 'custom',
                        internalPage: item.internalPage,
                        customUrl: item.customUrl,
                        openInNewTab: item.openInNewTab,
                      }}
                      className={styles.mobileNavLink}
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
            <SmartLink key={index} link={btn}>
              <Button size="large" width="full">
                {btn.linkText}
              </Button>
            </SmartLink>
          ))}
      </div>
    </aside>
  );
}
