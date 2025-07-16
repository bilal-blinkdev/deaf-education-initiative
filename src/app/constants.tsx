type HEADER_ITEMS = {
  navItems: { href: string; text: string }[];
  buttons?: { href?: string; text: string }[];
};

const HEADER_ITEMS: HEADER_ITEMS = {
  navItems: [
    { href: "/about", text: "About" },
    { href: "/programs", text: "Programs" },
    { href: "/events", text: "Events" },
    { href: "/publications", text: "Publications" },
    // { href: "/contact", text: "Contact" },
    { href: "/contact", text: "Contact" },
  ],
  buttons: [{ text: "Donate" }],
};
export default HEADER_ITEMS;
