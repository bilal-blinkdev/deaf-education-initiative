import Container from '../Container';
import LogoWithText from '@/graphics/LogoV2WithText';
import Link from 'next/link';
import Facebook from '@/graphics/Facebook';
import Twitter from '@/graphics/Twitter';
import Instagram from '@/graphics/Instagram';
import Linkedin from '@/graphics/Linkedin';
import Youtube from '@/graphics/Youtube';
import styles from './styles.module.scss';

export default function Footer() {
  const footerMenu = [
    {
      title: 'About',
      links: [
        { href: '/our-leadership', text: 'Our Leadership' },
        { href: '', text: 'What We Do' },
        { href: '', text: 'Our Partners' },
        { href: '', text: 'Contact Us' },
        { href: '', text: 'Publications' },
        { href: '', text: 'Reports' },
      ],
    },
    {
      title: 'Our Programs',
      links: [
        { href: '', text: 'Schools, Training Centers and Colleges' },
        { href: '', text: 'Teacher Training' },
        { href: '', text: 'Job Placement' },
        { href: '', text: 'Parent Training' },
        { href: '', text: 'Pakistan Sign Language' },
        { href: '', text: 'Digital Sign Language Resources' },
      ],
    },
    {
      title: 'Donate Now',
      links: [
        { href: '', text: 'Take Action' },
        { href: '', text: 'Deaf Reach Pakistan' },
        { href: '', text: 'Deaf Reach NA' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { href: '', text: 'Zakat Certification' },
        { href: '', text: 'Charity Commission' },
      ],
    },
  ];
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.gridBlock}>
          <div className={[styles.gridCol, styles.colOne].join(' ')}>
            <div className={styles.logo}>
              <LogoWithText brandColor="#fff" accentColor="#fff" />
            </div>
            <p className={styles.tagLine}>
              Ensuring that every deaf child has access to literacy and learning!
            </p>
            <section className={styles.socialLinks}>
              <Link href="">
                <Facebook color="rgba(255,255,255, 3.2)" />
              </Link>
              <Link href="">
                <Twitter color="rgba(255,255,255, 3.2)" />
              </Link>
              <Link href="">
                <Instagram color="rgba(255,255,255, 3.2)" />
              </Link>
              <Link href="">
                <Linkedin color="rgba(255,255,255, 3.2)" />
              </Link>
              <Link href="">
                <Youtube color="rgba(255,255,255, 3.2)" />
              </Link>
            </section>
          </div>
          {footerMenu.map((menuItem, index) => (
            <section className={styles.menuItem} key={index}>
              <h3 className={styles.menuItemHeading}>{menuItem.title}</h3>
              <ul className={styles.menuItemList}>
                {menuItem.links.map((link, index) => (
                  <li className={styles.menuItemListItem} key={index}>
                    <Link href={link.href} className={styles.menuItemLink}>
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <p className={styles.copyrights}>
          &copy; {new Date().getFullYear()} Deaf Education Initiative, Org. All rights reserved
        </p>
      </Container>
    </footer>
  );
}
