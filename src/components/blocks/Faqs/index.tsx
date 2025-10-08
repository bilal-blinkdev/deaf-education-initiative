import Image from 'next/image';
import Container from '@/components/layout/Container';
import Button from '@/components/elements/Button';
import SchoolGirlsRaisingHands from '@/assets/school-girls-raising-hands.webp';
import styles from './styles.module.scss';
import Heading from '@/components/elements/Heading';
import QuestionMarkRoundedFilled from '@/graphics/QuestionMarkRoundedFilled';
import Paragraph from '@/components/elements/Paragraph';

type Faq = {
  question: string;
  answer: string;
};
type FaqsProps = {
  faqs: Faq[];
};

export default function Faqs({ content }: { content: FaqsProps }) {
  return (
    <section className={styles.faqs}>
      <Container>
        <Heading level={2} className={styles.faqs__heading} align="center">
          Frequently asked questions
        </Heading>
        <p className={styles.faqs__subtext}>Get your questions answered here</p>
        <div className={styles.faqs__grid}>
          {content.faqs.map((faq: Faq, index: number) => (
            <div className={styles.faqs__gridItem} key={index}>
              <div className={styles.faqs__faq}>
                <div className={styles.faq__icon}>
                  <QuestionMarkRoundedFilled />
                </div>
                <div className={styles.faq__text}>
                  <Heading level={3} className={styles.faq__question}>
                    {faq.question}
                  </Heading>
                  <Paragraph className={styles.faq__answer}>{faq.answer}</Paragraph>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
