import Image, { StaticImageData } from "next/image";
import Container from "@/components/layout/Container";
import Linkedin from "@/graphics/Linkedin";
import styles from "./styles.module.scss";

type BusinessCard = {
  name: string;
  image: StaticImageData;
  role: string;
  socialLinks?: {
    linkedIn?: {
      url: string | "https://linkedin.com";
      alt: string | "";
    };
  };
};
type BusinessCardProps = BusinessCard;
type TeamMembersProps = {
  teamName: string;
  teamMembers: BusinessCard[];
};

export default function TeamMembers({
  teamName,
  teamMembers,
}: TeamMembersProps) {
  return (
    <section className={styles.teamMembers}>
      <Container>
        <h2 className={styles.heading}>{teamName}</h2>
        <section className={styles.teamMembers__cards}>
          {teamMembers.map((member, index) => (
            <BusinessCard
              key={index}
              name={member.name}
              image={member.image}
              role={member.role}
              socialLinks={member.socialLinks}
            />
          ))}
        </section>
      </Container>
    </section>
  );
}

function BusinessCard({ name, image, role, socialLinks }: BusinessCardProps) {
  return (
    <div className={styles.businessCard}>
      <Image src={image} alt={name} className={styles.businessCard__image} />
      <h3 className={styles.businessCard__name}>{name}</h3>
      <p className={styles.businessCard__role}>{role}</p>
      {socialLinks && (
        <div className={styles.businessCard__icon}>
          <Linkedin color="#121127" />
        </div>
      )}
    </div>
  );
}
