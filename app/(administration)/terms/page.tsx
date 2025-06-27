import Link from "next/link";

export const metadata = {
  title: "Terms of Service | YoinkUI",
  // description: "YoinkUI - Copy any component with 1 click",
};

const TermsOfServicePage = () => {
  return (
    <>
      <div className="px-6  lg:max-w-7xl lg:px-8">
        <h1 className="text-zinc-950 leading-[1] tracking-[-1.2px] text-5xl flex text-balance font-medium flex-col md:tracking-[-1.5px] md:text-6xl lg:text-pretty">
          Terms of Service
        </h1>
      </div>
      <div className="mt-18 max-w-3xl text-pretty px-6  lg:px-8">
        <p className="mb-6">Last Updated: June 26, 2025</p>
        <p className="mb-6">
          Please read these Terms of Service (&quot;Terms&quot;) carefully
          before using <strong>YoinkUI</strong> (&quot;<strong>we</strong>
          &quot;, &quot;<strong>our</strong>
          &quot;, or &quot;<strong>us</strong>&quot;). By installing or using
          the YoinkUI Chrome extension and related services, you agree to be
          bound by these Terms.
        </p>
        <p className="mb-6 font-medium">
          If you do not agree with all of these terms, then you are prohibited
          from using the services and must immediately discontinue use.
        </p>
        <h2 className="mt-8 mb-4 text-black leading-[1.33333] text-2xl font-bold">
          1. Description of Service
        </h2>
        <p className="mb-6">
          YoinkUI is a browser extension that allows users to extract and
          convert website UI into Tailwind CSS and React components. The
          extension operates locally in your browser and uses Supabase for
          authentication to provide user-specific features.
        </p>
        <h2 className="mt-8 mb-4 text-black leading-[1.33333] text-2xl font-bold">
          2. Eligibility
        </h2>
        <p className="mb-6">
          To use YoinkUI, you must be at least 13 years old and legally capable
          of entering into a binding agreement. By using the extension, you
          represent that you meet these requirements.
        </p>
        <h2 className="mt-8 mb-4 text-black leading-[1.33333] text-2xl font-bold">
          3. User Accounts
        </h2>
        <p className="mb-6">
          Some features may require you to sign in via Supabase authentication.
          You agree to provide accurate and complete information when
          registering and to keep your login credentials secure. You are
          responsible for all activity under your account.
        </p>
        <h2 className="mt-8 mb-4 text-black leading-[1.33333] text-2xl font-bold">
          4. Acceptable Use
        </h2>
        <p className="mb-6">
          You agree <strong>not to use YoinkUI</strong> to:
        </p>
        <ul className="mb-6 pl-6">
          <li className="mb-1 text-left">Violate any laws or regulations</li>
          <li className="mb-1 text-left">
            Infringe on intellectual property rights or scrape content in
            violation of website terms
          </li>
          <li className="mb-1 text-left">
            Misuse the extension in a way that disrupts or degrades service for
            others
          </li>
          <li className="mb-1 text-left">
            Attempt to reverse-engineer or interfere with the extension&apos;s
            functionality
          </li>
        </ul>
        <p className="mb-6">
          YoinkUI is intended as a development tool for learning, prototyping,
          and building, not for cloning or distributing protected content
          without permission.
        </p>
        <h2 className="mt-8 mb-4 text-black leading-[1.33333] text-2xl font-bold">
          5. Intellectual Property
        </h2>
        <p className="mb-2">
          YoinkUI, including its code, branding, and features, is the
          intellectual property of its creator(s). All rights are reserved.
          Users retain rights to the code generated for personal or commercial
          use, except when derived from protected content without permission.
        </p>
        <h2 className="mt-8 mb-4 text-black leading-[1.33333] text-2xl font-bold">
          6. Disclaimer of Warranty
        </h2>
        <p className="mb-2">
          YoinkUI is provided &quot;as is&quot; without warranty of any kind. We
          do not guarantee the accuracy, completeness, or fitness of the code
          generated. Use at your own risk.
        </p>
        <h2 className="mt-8 mb-4 text-black leading-[1.33333] text-2xl font-bold">
          7. Limitation of Liability
        </h2>
        <p className="mb-2">
          To the fullest extent permitted by law, we are not liable for any
          indirect, incidental, special, or consequential damages resulting from
          your use or inability to use YoinkUI, including code errors, data
          loss, or misuse of third-party content.
        </p>
        <h2 className="mt-8 mb-4 text-black leading-[1.33333] text-2xl font-bold">
          8. Termination
        </h2>
        <p className="mb-2">
          We reserve the right to suspend or terminate access to YoinkUI at any
          time, for any reason, without notice—especially if you violate these
          Terms.
        </p>
        <h2 className="mt-8 mb-4 text-black leading-[1.33333] text-2xl font-bold">
          9. Changes to the Terms
        </h2>
        <p className="mb-2">
          We may update these Terms from time to time. We&apos;ll notify users
          of material changes via the Chrome Web Store or our website. Continued
          use of the extension means you accept the updated Terms.
        </p>
        <h2 className="mt-8 mb-4 text-black leading-[1.33333] text-2xl font-bold">
          10. Contact
        </h2>
        <p className="mb-2">
          If you have any questions or concerns, please contact us at:
          <Link
            href="mailto:kianthecreator@gmail.com"
            className="text-sky-500 cursor-pointer"
          >
            kianthecreator@gmail.com
          </Link>
        </p>
      </div>
    </>
  );
};

export default TermsOfServicePage;
