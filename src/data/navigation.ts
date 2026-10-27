// Central navigation, matching the master site menu order and labels.
// Service links use the MASTER url shape /service/<slug>.
export interface NavItem { label: string; href: string; children?: NavItem[]; }
export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us/" },
  { label: "Services", href: "/services/", children: [
    { label: "Web Development", href: "/service/web-development/" },
    { label: "Branding And Identity", href: "/service/branding-and-identity/" },
    { label: "Smart Growth Marketing", href: "/service/smart-growth-marketing/" },
    { label: "Media Creation Services", href: "/service/media-creation-services/" },
    { label: "AI-Powered Business Solutions", href: "/service/ai-powered-business-solutions/" },
    { label: "Mobile Application", href: "/service/mobile-application/" },
    { label: "CMS Solution", href: "/service/cms-solution/" },
    { label: "Web Design", href: "/service/branding-design/" },
  ]},
  { label: "Careers", href: "/careers/" },
  { label: "Portfolio", href: "/portfolio/" },
  { label: "Blogs", href: "/blogs/" },
  { label: "Contact", href: "/contact/" },
];
