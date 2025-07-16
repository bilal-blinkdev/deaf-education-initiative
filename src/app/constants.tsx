type HEADER_ITEMS = {
  navItems: { href: string; text: string }[];
  buttons?: { href?: string; text: string }[];
};

const HEADER_ITEMS: HEADER_ITEMS = {
  navItems: [
    // { href: '/about', text: 'About' },
    // { href: '/programs', text: 'Programs' },
    // { href: '/events', text: 'Events' },
    // { href: '/publications', text: 'Publications' },
    // // { href: "/contact", text: "Contact" },
    // { href: '/contact', text: 'Contact' },
  ],
  buttons: [{ href: '/donate', text: 'Donate' }],
};

export const PROJECTS = [
  {
    name: 'Where most needed',
    hint: 'This is a hint text to help user.',
    amountOptions: [
      { symbol: '£', amount: '100', period: '' },
      { symbol: '£', amount: '250', period: '' },
      { symbol: '£', amount: '500', period: '' },
      { symbol: '£', amount: '1000', period: '' },
    ],
  },
  {
    name: 'Sponsor a Student',
    hint: '🙌  Your generous support can enable Deaf students fulfill their dreams',
    amountOptions: [
      { symbol: '£', amount: '50', period: '' },
      { symbol: '£', amount: '600', period: '' },
    ],
  },
  {
    name: 'Sponsor a Classroom',
    hint: '🙌  Your generous support can enable a whole classroom of 15 Deaf students turn their dreams into reality',
    amountOptions: [
      { symbol: '£', amount: '750', period: 'month' },
      { symbol: '£', amount: '9000', period: 'year' },
    ],
  },
  {
    name: 'Sponsor Healthy Lunch',
    hint: '🍲 Your generous support can provide healthy, nutritious meals to our Deaf students',
    amountOptions: [
      { symbol: '£', amount: '1300', period: 'month' },
      { symbol: '£', amount: '15000', period: 'year' },
    ],
  },
  {
    name: 'Sponsor a Section',
    hint: '🙌 Your generous support can make quality education a reality for a section of 50 Deaf students',
    amountOptions: [
      { symbol: '£', amount: '2500', period: 'month' },
      { symbol: '£', amount: '30000', period: 'year' },
    ],
  },
  {
    name: 'Sponsor a Wing',
    hint: '🙌 Your generous support can make quality education a reality for a wing of 100 Deaf students',
    amountOptions: [
      { symbol: '£', amount: '5000', period: 'month' },
      { symbol: '£', amount: '60000', period: 'year' },
    ],
  },
  {
    name: 'Sponsor a School',
    hint: '🙌 Your generous support can make quality education a reality for a school of 250 Deaf students',
    amountOptions: [
      { symbol: '£', amount: '12500', period: 'month' },
      { symbol: '£', amount: '150000', period: 'year' },
    ],
  },
  {
    name: 'Sponsor a Satellite School',
    hint: '🙌 Your generous support can make quality education accessible to Deaf children through our Satellite schools',
    amountOptions: [
      { symbol: '£', amount: '25000', period: 'setup school' },
      { symbol: '£', amount: '15000', period: 'yearly' },
    ],
  },
];

export default HEADER_ITEMS;
