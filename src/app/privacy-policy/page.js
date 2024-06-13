import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-xl mx-auto">
      <div className="p-5">
        <Link href="/">
          <Button className="mb-2" variant="ghost">
            <ChevronLeft /> Back
          </Button>
        </Link>

        <h1 className="text-3xl font-medium pb-6">Privacy Policy</h1>
        <div className="leading-relaxed">
          Your privacy is important to us. It is PlayRoutines' policy to respect
          your privacy regarding any information we may collect from you across
          our website, app, and other sites we own and operate.
          <br />
          <br />
          <div className="font-bold">1. Information Collection and Use</div>
          <br />
          We only ask for personal information when we truly need it to provide
          a service to you. We collect it by fair and lawful means, with your
          knowledge and consent. We also let you know why we're collecting it
          and how it will be used.
          <br />
          <br />
          You can sign up with your Google account, and your PlayRoutines
          account username will be prefilled with your name and your public
          profile picture.
          <br />
          <br />
          <div className="font-bold">2. Data Retention</div>
          <br />
          We only retain collected information for as long as necessary to
          provide you with your requested service. What data we store, we'll
          protect within commercially acceptable means to prevent loss and
          theft, as well as unauthorized access, disclosure, copying, use, or
          modification.
          <br />
          <br />
          <div className="font-bold">3. Data Sharing</div>
          <br />
          We don't share any personally identifying information publicly or with
          third parties, except when required by law.
          <br />
          <br />
          <div className="font-bold">4. Data Protection Laws</div>
          <br />
          We act in the capacity of a data controller and a data processor with
          regard to the personal data processed through PlayRoutines and the
          services in terms of the applicable data protection laws, including
          the EU General Data Protection Regulation (GDPR).
          <br />
          <br />
          <div className="font-bold">5. External Links</div>
          <br />
          Our website and app may link to external sites that are not operated
          by us. Please be aware that we have no control over the content and
          practices of these sites and cannot accept responsibility or liability
          for their respective privacy policies.
          <br />
          <br />
          <div className="font-bold">6. Refusal of Personal Information</div>
          <br />
          You are free to refuse our request for your personal information, with
          the understanding that we may be unable to provide you with some of
          your desired services.
          <br />
          <br />
          <div className="font-bold">7. Acceptance of Terms</div>
          <br />
          Your continued use of our website and app will be regarded as
          acceptance of our practices around privacy and personal information.
          If you have any questions about how we handle user data and personal
          information, feel free to contact us.
          <br />
          <br />
          <div className="font-bold">8. Contact Us</div>
          <br />
          If you have any questions or concerns about our privacy policy, please
          contact us at{" "}
          <a className="underline" href="mailto:dejan.gavrilovikk@gmail.com">
            dejan.gavrilovikk@gmail.com
          </a>
          <br />
          <br />
          This policy is effective as of 03 January 2024.
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
