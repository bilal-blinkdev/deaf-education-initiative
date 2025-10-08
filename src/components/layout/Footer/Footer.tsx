import Link from 'next/link';
import { Footer as FooterType } from '@/payload-types';
import { fetchGlobal } from '@/app/lib/payload/fetchGlobal';

import Container from '@/components/layout/Container';
import LogoWithText from '@/graphics/LogoWithText';
import SmartLink from '@/components/elements/SmartLink'; // Assuming SmartLink is used
import Facebook from '@/graphics/Facebook';
import Twitter from '@/graphics/Twitter';
import Instagram from '@/graphics/Instagram';
import Linkedin from '@/graphics/Linkedin';
import Youtube from '@/graphics/Youtube';
import styles from './styles.module.scss';

export default async function Footer() {
  const footerData = await fetchGlobal<FooterType>('footer', 2);

  if (!footerData) {
    return null;
  }

  const { tagline, socialLinks, navMenus, copyrightText } = footerData;

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.gridBlock}>
          <div className={[styles.gridCol, styles.colOne].join(' ')}>
            <div className={styles.logo}>
              <LogoWithText brandColor="#fff" accentColor="#fff" />
            </div>
            <p className={styles.tagLine}>{tagline}</p>
            {socialLinks && (
              <section className={styles.socialLinks}>
                {socialLinks.facebookUrl && (
                  <Link href={socialLinks.facebookUrl}>
                    <Facebook />
                  </Link>
                )}
                {socialLinks.twitterUrl && (
                  <Link href={socialLinks.twitterUrl}>
                    <Twitter />
                  </Link>
                )}
                {socialLinks.instagramUrl && (
                  <Link href={socialLinks.instagramUrl}>
                    <Instagram />
                  </Link>
                )}
                {socialLinks.linkedinUrl && (
                  <Link href={socialLinks.linkedinUrl}>
                    <Linkedin />
                  </Link>
                )}
                {socialLinks.youtubeUrl && (
                  <Link href={socialLinks.youtubeUrl}>
                    <Youtube />
                  </Link>
                )}
              </section>
            )}
          </div>

          {navMenus &&
            navMenus.map((menuItem) => (
              <section className={styles.menuItem} key={menuItem.id}>
                <h3 className={styles.menuItemHeading}>{menuItem.title}</h3>
                <ul className={styles.menuItemList}>
                  {menuItem.links &&
                    menuItem.links.map((link) => (
                      <li className={styles.menuItemListItem} key={link.id}>
                        <SmartLink link={link} className={styles.menuItemLink} />
                      </li>
                    ))}
                </ul>
              </section>
            ))}
        </div>

        <p className={styles.copyrights}>
          &copy; {new Date().getFullYear()} {copyrightText} All rights reserved
        </p>
      </Container>
    </footer>
  );
}
