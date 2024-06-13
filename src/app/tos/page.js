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

        <h1 className="text-3xl font-medium pb-6">Terms of Service</h1>
        <div className="leading-relaxed">
          <br />
          <div className="font-bold">1. Introduction</div>
          <br />
          By using PlayRoutines, you confirm your acceptance of, and agree to be
          bound by, these terms and conditions.
          <br />
          <br />
          <div className="font-bold">2. Agreement to Terms and Conditions</div>
          <br />
          This Agreement takes effect on the date on which you first use the
          PlayRoutines application.
          <br />
          <br />
          <div className="font-bold">3. Access Tiers and License</div>
          <br />
          PlayRoutines offers a free access tier that provides limited access to
          our features and services. Additionally, you can purchase a one-year
          access license, which grants unrestricted access to all of
          PlayRoutines&apos; comprehensive functionalities for the duration of
          one year from the date of purchase.
          <br />
          <br />
          This license entails a straightforward and flexible arrangement,
          exempting users from recurring fees or subscriptions during the
          one-year period. However, it is important to acknowledge that the
          licensor retains the right to terminate the license without conditions
          or prerequisites. This termination provision enables the licensor to
          exercise control over software distribution and utilization.
          <br />
          <br />
          Opting for the PlayRoutines one-year access license enables users to
          enjoy the benefits of the software while recognizing the
          licensor&apos;s unrestricted termination rights, which provide
          adaptability and address potential unforeseen circumstances.
          <br />
          <br />
          <div className="font-bold">4. Refunds</div>
          <br />
          Due to the nature of digital products, the PlayRoutines one-year
          access cannot be refunded or exchanged once access is granted.
          <br />
          <br />
          <div className="font-bold">5. Disclaimer</div>
          <br />
          It is not warranted that PlayRoutines will meet your requirements or
          that its operation will be uninterrupted or error-free. All express
          and implied warranties or conditions not stated in this Agreement
          (including without limitation, loss of profits, loss or corruption of
          data, business interruption, or loss of contracts), so far as such
          exclusion or disclaimer is permitted under the applicable law, are
          excluded and expressly disclaimed. This Agreement does not affect your
          statutory rights.
          <br />
          <br />
          <div className="font-bold">
            6. Warranties and Limitation of Liability
          </div>
          <br />
          PlayRoutines does not give any warranty, guarantee, or other term as
          to the quality, fitness for purpose, or otherwise of the software.
          PlayRoutines shall not be liable to you by reason of any
          representation (unless fraudulent), or any implied warranty, condition
          or other term, or any duty at common law, for any loss of profit or
          any indirect, special, or consequential loss, damage, costs, expenses,
          or other claims (whether caused by PlayRoutines&apos; negligence or
          the negligence of its servants or agents or otherwise) which arise out
          of or in connection with the provision of any goods or services by
          PlayRoutines. PlayRoutines shall not be liable or deemed to be in
          breach of contract by reason of any delay in performing, or failure to
          perform, any of its obligations if the delay or failure was due to any
          cause beyond its reasonable control. Notwithstanding contrary clauses
          in this Agreement, in the event that PlayRoutines are deemed liable to
          you for breach of this Agreement, you agree that PlayRoutines&apos;
          liability is limited to the amount actually paid by you for your
          services or software, which amount calculated in reliance upon this
          clause. You hereby release PlayRoutines from any and all obligations,
          liabilities, and claims in excess of this limitation.
          <br />
          <br />
          <div className="font-bold">7. Responsibilities</div>
          <br />
          PlayRoutines is not responsible for what the user does with the
          user-generated content.
          <br />
          <br />
          <div className="font-bold">8. General Terms and Law</div>
          <br />
          This Agreement is governed by the laws of Utah, US. You acknowledge
          that no joint venture, partnership, employment, or agency relationship
          exists between you and PlayRoutines as a result of your use of these
          services. You agree not to hold yourself out as a representative,
          agent, or employee of PlayRoutines. You agree that PlayRoutines will
          not be liable by reason of any representation, act, or omission to act
          by you.
          <br />
          <br />
          Last updated: 02 January 2024.
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
