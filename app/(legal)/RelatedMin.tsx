"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/contact-us", label: "Contact us" },
];

const RelatedMin = () => {
  const pathname = usePathname();

  return (
    <div className="mt-30 mb-[-64px] px-6 lg:hidden">
      <ul className="mt-2 leading-[1.42857] text-sm">
        {links.map((link) => (
          <li className="mb-1 text-left" key={link.href}>
            <Link
              className={`underline cursor-pointer ${
                pathname === link.href ? "text-black" : "text-sky-500"
              }`}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedMin;
