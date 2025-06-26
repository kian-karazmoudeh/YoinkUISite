"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Related() {
  const pathname = usePathname();

  const links = [
    { href: "/terms", label: "Terms of Service" },
    { href: "/privacy-policy", label: "Privacy Policy" },
  ];

  return (
    <aside className="mt-72 mr-8 mb-50 lg:block lg:col-span-4 lg:justify-self-end hidden">
      <div className="max-w-xs top-12 bg-stone-100 p-4 rounded-sm  lg:leading-[1.42857] lg:text-sm lg:sticky">
        <h4 className="mb-2 text-stone-800 font-semibold  lg:leading-[1.42857] lg:text-sm">
          Related Policies
        </h4>
        <p className="text-stone-700 leading-[1.42857] text-sm">
          Learn about our privacy practices, refund policy, and cancellation
          terms
        </p>
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
    </aside>
  );
}
