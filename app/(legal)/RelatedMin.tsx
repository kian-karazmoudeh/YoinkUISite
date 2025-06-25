"use client";
import { usePathname } from "next/navigation";

const links = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms/refunds", label: "Refund Policy" },
  { href: "/terms/cancellation", label: "Cancellation Terms" },
  { href: "/disclosures/marketing", label: "Marketing Disclosure" },
  { href: "/disclosures/afterparty", label: "Afterparty Disclosure" },
  {
    href: "/disclosures/not-investment-advice",
    label: "Investment Solicitation Disclaimer",
  },
];

const RelatedMin = () => {
  const pathname = usePathname();

  return (
    <div className="mt-30 mb-[-64px] px-6 lg:hidden">
      <ul className="mt-2 leading-[1.42857] text-sm">
        {links.map((link) => (
          <li className="mb-1 text-left" key={link.href}>
            <a
              className={`underline cursor-pointer ${
                pathname === link.href ? "text-black" : "text-sky-500"
              }`}
              href={link.href}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedMin;
