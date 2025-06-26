import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | YoinkUI",
  // description: "YoinkUI - Copy any component with 1 click",
};

export default function privacyPolicyPage() {
  return (
    <>
      <div className="px-6  lg:max-w-7xl lg:px-8">
        <h1 className="text-zinc-950 leading-[1] tracking-[-1.2px] text-5xl flex text-balance font-medium flex-col md:tracking-[-1.5px] md:text-6xl lg:text-pretty">
          Privacy Policy
        </h1>
      </div>
      <div className="mt-18 max-w-3xl text-pretty px-6  lg:px-8">
        <p className="mb-6">Last Updated: June 25, 2025</p>
        <p className="mb-6">
          YoinkUI (&quot;<strong>we</strong>&quot;, &quot;<strong>our</strong>
          &quot;, or &quot;<strong>us</strong>&quot;) respects your privacy and
          is committed to protecting your information. This Privacy Policy
          describes what data we collect, how it&apos;s used, and your rights.
        </p>

        <h2 className="mt-8 mb-4 text-black leading-[1.33333] text-2xl font-bold">
          1. Information We Collect
        </h2>
        <p className="mb-6">
          We collect minimal personal information only when you sign in using
          our authentication system. This may include:
        </p>
        <ul className="list-disc ml-10">
          <li>Your email address</li>
          <li>A unique user ID provided by Supabase</li>
          <li>Login metadata (e.g., login timestamps)</li>
        </ul>
        <p className="mb-6">
          We do not collect or store any data from the websites you visit or the
          content you yoink.
        </p>
        <h2 className="mt-8 mb-4 text-black leading-[1.33333] text-2xl font-bold">
          2. How We Use Your Data
        </h2>
        <p className="mb-6">We use authentication data solely to:</p>
        <ul className="list-disc ml-10">
          <li>Enable login and secure access to YoinkUI features</li>
          <li>
            Associate user preferences or account-related features (e.g., future
            pro tiers or saved components)
          </li>
        </ul>
        <p className="mb-6">
          We do <strong>not</strong> use your data for advertising, tracking, or
          resale.
        </p>
        <h2 className="mt-8 mb-4 text-black leading-[1.33333] text-2xl font-bold">
          3. What YoinkUI Does Not Collect
        </h2>
        <p className="mb-2">YoinkUI does not collect or transmit:</p>
        <ul className="list-disc ml-10">
          <li>Your browsing history</li>
          <li>UI or content from pages you visit</li>
          <li>Keystrokes, passwords, or form inputs</li>
          <li>Analytics on which sites you yoink from</li>
        </ul>
        <p className="mb-2">
          All UI processing happens locally in your browser.
        </p>
        <h2 className="mt-8 mb-4 text-black leading-[1.33333] text-2xl font-bold">
          4. Third-Party Services
        </h2>
        <p className="mb-6">We use the following third-party services:</p>
        <ul className="list-disc ml-10">
          <li>
            Supabase for user authentication and secure account management
          </li>
        </ul>
        <p className="mb-6">
          These services may store your email and related authentication
          metadata. They do not access or store any website content you interact
          with via the extension.
        </p>
        <h2 className="mt-8 mb-4 text-black leading-[1.33333] text-2xl font-bold">
          5. Data Security
        </h2>
        <p className="mb-2">
          We use industry-standard practices to protect your account data,
          including secure encryption and authentication via Supabase.
        </p>

        <h2 className="mt-8 mb-4 text-black leading-[1.33333] text-2xl font-bold">
          6. Your Consent
        </h2>
        <p className="mb-6">
          By using YoinkUI, you consent to this policy and to the collection of
          authentication data as outlined above.
        </p>
        <h2 className="mt-8 mb-4 text-black leading-[1.33333] text-2xl font-bold">
          7. Changes to This Policy
        </h2>
        <p className="mb-6">
          We may update this policy as our product evolves. Significant changes
          will be communicated via the Chrome Web Store or our official website.
        </p>
        <h2 className="mt-8 mb-4 text-black leading-[1.33333] text-2xl font-bold">
          8. Contact Us
        </h2>
        <p className="mb-6">
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
}
