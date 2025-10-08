type HEADER_ITEMS = {
  navItems: { href: string; text: string }[];
  buttons?: { href?: string; text: string }[];
};

const HEADER_ITEMS: HEADER_ITEMS = {
  navItems: [
    { href: '/about', text: 'About' },
    { href: '/programs', text: 'Programs' },
    { href: '/events', text: 'Events' },
    { href: '/publications', text: 'Publications' },
    // { href: "/contact", text: "Contact" },
    { href: '/contact', text: 'Contact' },
  ],
  buttons: [{ href: '/donate', text: 'Donate' }],
};

export const PROJECTS_TEST = [
  {
    name: 'Where most needed',
    hint: '',
    amountOptions: [
      { id: 'price_1S2MNbGfspcpW13rmR7DjrqO', symbol: '£', amount: '100', period: '' },
      { id: 'price_1S2MNbGfspcpW13r9Hm52WX1', symbol: '£', amount: '250', period: '' },
      { id: 'price_1S2MNbGfspcpW13rzHQWolpW', symbol: '£', amount: '500', period: '' },
      { id: 'price_1S2MNbGfspcpW13rQdmrI9as', symbol: '£', amount: '1000', period: '' },
    ],
  },
  {
    name: 'Sponsor a Student',
    hint: '🙌  Your generous support can enable Deaf students fulfill their dreams',
    amountOptions: [
      { id: 'price_1S1NzRGfspcpW13rhDhU7kYC', symbol: '£', amount: '50', period: '' },
      { id: 'price_1S2MLWGfspcpW13rWI5rvGzN', symbol: '£', amount: '600', period: '' },
    ],
  },
  {
    name: 'Sponsor a Classroom',
    hint: '🙌  Your generous support can enable a whole classroom of 15 Deaf students turn their dreams into reality',
    amountOptions: [
      { id: 'price_1S2MO4GfspcpW13reojzg3g1', symbol: '£', amount: '750', period: 'month' },
      { id: 'price_1S2MOTGfspcpW13rmYKrhkJx', symbol: '£', amount: '9000', period: 'year' },
    ],
  },
  {
    name: 'Sponsor Healthy Lunch',
    hint: '🍲 Your generous support can provide healthy, nutritious meals to our Deaf students',
    amountOptions: [
      { id: 'price_1S2MPYGfspcpW13rUXGJpmah', symbol: '£', amount: '1300', period: 'month' },
      { id: 'price_1S2MPrGfspcpW13rLGNfO2PR', symbol: '£', amount: '15000', period: 'year' },
    ],
  },
  {
    name: 'Sponsor a Section',
    hint: '🙌 Your generous support can make quality education a reality for a section of 50 Deaf students',
    amountOptions: [
      { id: 'price_1S2MQgGfspcpW13r4zDNpmmW', symbol: '£', amount: '2500', period: 'month' },
      { id: 'price_1S2MQgGfspcpW13rnDxRWgIt', symbol: '£', amount: '30000', period: 'year' },
    ],
  },
  {
    name: 'Sponsor a Wing',
    hint: '🙌 Your generous support can make quality education a reality for a wing of 100 Deaf students',
    amountOptions: [
      { id: 'price_1S2MRUGfspcpW13rxcTzP7sV', symbol: '£', amount: '5000', period: 'month' },
      { id: 'price_1S2MRUGfspcpW13rZwiVtt0F', symbol: '£', amount: '60000', period: 'year' },
    ],
  },
  {
    name: 'Sponsor a School',
    hint: '🙌 Your generous support can make quality education a reality for a school of 250 Deaf students',
    amountOptions: [
      { id: 'price_1S2MSZGfspcpW13rVKFiNPe6', symbol: '£', amount: '12500', period: 'month' },
      { id: 'price_1S2MSZGfspcpW13rA9bF9fFX', symbol: '£', amount: '150000', period: 'year' },
    ],
  },
  {
    name: 'Sponsor a Satellite School',
    hint: '🙌 Your generous support can make quality education accessible to Deaf children through our Satellite schools',
    amountOptions: [
      {
        id: 'price_1S2MTnGfspcpW13rZGFvi8MK',
        symbol: '£',
        amount: '25000',
        period: 'setup school',
      },
      { id: 'price_1S2MTnGfspcpW13rlON11Wqj', symbol: '£', amount: '15000', period: 'yearly' },
    ],
  },
];

export const PROJECTS = [
  {
    name: 'Where most needed',
    hint: '',
    amountOptions: [
      { id: 'price_1S2MdTGs6PRML1wItgNxXOoZ', symbol: '£', amount: '100', period: '' },
      { id: 'price_1S2MdTGs6PRML1wIsV6OzeXv', symbol: '£', amount: '250', period: '' },
      { id: 'price_1S2MdTGs6PRML1wId0HDe52b', symbol: '£', amount: '500', period: '' },
      { id: 'price_1S2MdTGs6PRML1wI37lJqbUA', symbol: '£', amount: '1000', period: '' },
    ],
  },
  {
    name: 'Sponsor a Student',
    hint: '🙌  Your generous support can enable Deaf students fulfill their dreams',
    amountOptions: [
      { id: 'price_1S2MhhGs6PRML1wIKXTlzzg9', symbol: '£', amount: '50', period: '' },
      { id: 'price_1S2MhgGs6PRML1wI6VBf7WX9', symbol: '£', amount: '600', period: '' },
    ],
  },
  {
    name: 'Sponsor a Classroom',
    hint: '🙌  Your generous support can enable a whole classroom of 15 Deaf students turn their dreams into reality',
    amountOptions: [
      { id: 'price_1S2MjgGs6PRML1wIlPRssYVo', symbol: '£', amount: '750', period: 'month' },
      { id: 'price_1S2MjgGs6PRML1wIUJIJUu9j', symbol: '£', amount: '9000', period: 'year' },
    ],
  },
  {
    name: 'Sponsor Healthy Lunch',
    hint: '🍲 Your generous support can provide healthy, nutritious meals to our Deaf students',
    amountOptions: [
      { id: 'price_1S2Ml4Gs6PRML1wISvMnyC0X', symbol: '£', amount: '1300', period: 'month' },
      { id: 'price_1S2Ml4Gs6PRML1wIdpH7wJLg', symbol: '£', amount: '15000', period: 'year' },
    ],
  },
  {
    name: 'Sponsor a Section',
    hint: '🙌 Your generous support can make quality education a reality for a section of 50 Deaf students',
    amountOptions: [
      { id: 'price_1S2MmEGs6PRML1wIfD9LSLw3', symbol: '£', amount: '2500', period: 'month' },
      { id: 'price_1S2MmEGs6PRML1wI8Nq4Ybq6', symbol: '£', amount: '30000', period: 'year' },
    ],
  },
  {
    name: 'Sponsor a Wing',
    hint: '🙌 Your generous support can make quality education a reality for a wing of 100 Deaf students',
    amountOptions: [
      { id: 'price_1S2MndGs6PRML1wI6wXF1ldg', symbol: '£', amount: '5000', period: 'month' },
      { id: 'price_1S2MndGs6PRML1wIr0T2oMZg', symbol: '£', amount: '60000', period: 'year' },
    ],
  },
  {
    name: 'Sponsor a School',
    hint: '🙌 Your generous support can make quality education a reality for a school of 250 Deaf students',
    amountOptions: [
      { id: 'price_1S2MojGs6PRML1wI6CuFA0e6', symbol: '£', amount: '12500', period: 'month' },
      { id: 'price_1S2MojGs6PRML1wIJRKRXH4M', symbol: '£', amount: '150000', period: 'year' },
    ],
  },
  {
    name: 'Sponsor a Satellite School',
    hint: '🙌 Your generous support can make quality education accessible to Deaf children through our Satellite schools',
    amountOptions: [
      {
        id: 'price_1S2MpwGs6PRML1wIkdr7CwPZ',
        symbol: '£',
        amount: '25000',
        period: 'setup school',
      },
      { id: 'price_1S2MpwGs6PRML1wIW7zk16jv', symbol: '£', amount: '15000', period: 'yearly' },
    ],
  },
];
export default HEADER_ITEMS;
