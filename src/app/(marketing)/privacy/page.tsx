import type { Metadata } from "next";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy policy | Elite Lawn Care",
  description: `Privacy policy for ${BUSINESS.name} (${BUSINESS.dba}).`,
};

export default function PrivacyPage() {
  return (
    <section className="section-gap bg-background">
      <div className="container-reading">
        <h1 className="text-foreground mb-6">Privacy policy</h1>
        <div className="space-y-6 text-sm text-muted-foreground">
          <p className="text-base">
            Welcome to {BUSINESS.name} (the &quot;Site&quot;). We understand that
            privacy online is important to users of our Site, especially when
            conducting business. This statement governs our privacy policies with
            respect to those users of the Site (&quot;Visitors&quot;) who visit
            without transacting business and Visitors who register to transact
            business on the Site and make use of the various services offered by{" "}
            {BUSINESS.name} (collectively, &quot;Services&quot;)
            (&quot;Authorized Customers&quot;).
          </p>

          <p>
            &quot;Personally Identifiable Information&quot; refers to any
            information that identifies or can be used to identify, contact, or
            locate the person to whom such information pertains, including, but
            not limited to, name, address, phone number, fax number, email
            address, financial profiles, social security number, and credit card
            information. Personally Identifiable Information does not include
            information that is collected anonymously (that is, without
            identification of the individual user) or demographic information not
            connected to an identified individual.
          </p>

          <div>
            <h2 className="text-foreground mb-2 text-base font-semibold">
              What Personally Identifiable Information is collected?
            </h2>
            <p>
              We may collect basic user profile information from all of our
              Visitors. We collect the following additional information from our
              Authorized Customers: the names, phone numbers and email addresses
              of Authorized Customers.
            </p>
          </div>

          <div>
            <h2 className="text-foreground mb-2 text-base font-semibold">
              With whom may the information be shared?
            </h2>
            <p>
              Personally Identifiable Information collected on this site will be
              shared only with employees within the {BUSINESS.name} company. Your
              information is not sold or leased to any 3rd party vendors.
            </p>
          </div>

          <div>
            <h2 className="text-foreground mb-2 text-base font-semibold">
              How is Personally Identifiable Information stored?
            </h2>
            <p>
              Personally Identifiable Information collected by {BUSINESS.name} is
              securely stored and is not accessible to third parties or employees
              of {BUSINESS.name} except for use as indicated above.
            </p>
          </div>

          <div>
            <h2 className="text-foreground mb-2 text-base font-semibold">
              What choices are available to Visitors regarding collection, use and
              distribution of the information?
            </h2>
            <p>
              Visitors and Authorized Customers may opt out of receiving
              unsolicited information from or being contacted by us and/or our
              vendors and affiliated agencies by responding to emails as
              instructed, or by contacting us.
            </p>
          </div>

          <div>
            <h2 className="text-foreground mb-2 text-base font-semibold">
              Are Cookies used on the Site?
            </h2>
            <p>
              Cookies are used for a variety of reasons. We use Cookies to obtain
              information about the preferences of our Visitors and the services
              they select. We also use Cookies for security purposes to protect
              our Authorized Customers. For example, if an Authorized Customer is
              logged on and the site is unused for more than 15 minutes, we will
              automatically log the Authorized Customer off.
            </p>
          </div>

          <div>
            <h2 className="text-foreground mb-2 text-base font-semibold">
              How does {BUSINESS.name} use login information?
            </h2>
            <p>
              {BUSINESS.name} uses login information, including, but not limited
              to, IP addresses, ISPs, and browser types, to analyze trends,
              administer the Site, track a user&apos;s movement and use, and
              gather broad demographic information.
            </p>
          </div>

          <div>
            <h2 className="text-foreground mb-2 text-base font-semibold">
              How does the Site keep Personally Identifiable Information secure?
            </h2>
            <p>
              All of our employees are familiar with our security policy and
              practices. The Personally Identifiable Information of our Visitors
              and Authorized Customers is only accessible to a limited number of
              qualified employees who are given a password in order to gain access
              to the information. We audit our security systems and processes on a
              regular basis. Sensitive information, such as credit card numbers or
              social security numbers, is protected by encryption protocols, in
              place to protect information sent over the Internet.
            </p>
          </div>

          <div>
            <h2 className="text-foreground mb-2 text-base font-semibold">
              How can Visitors correct any inaccuracies in Personally
              Identifiable Information?
            </h2>
            <p>
              Visitors and Authorized Customers may contact us to update
              Personally Identifiable Information about them or to correct any
              inaccuracies by emailing us at{" "}
              <a
                href={`mailto:${BUSINESS.email}`}
                className="text-primary hover:text-primary/80 transition-colors duration-[var(--duration-fast)]"
              >
                {BUSINESS.email}
              </a>
              . Do not send sensitive information via email.
            </p>
          </div>

          <div>
            <h2 className="text-foreground mb-2 text-base font-semibold">
              What happens if the Privacy Policy changes?
            </h2>
            <p>
              We will let our Visitors and Authorized Customers know about
              changes to our privacy policy by posting such changes on the Site.
            </p>
          </div>

          <div>
            <h2 className="text-foreground mb-2 text-base font-semibold">
              Links
            </h2>
            <p>
              This web site contains links to other web sites. Please note that
              when you click on one of these links, you are moving to another web
              site. We encourage you to read the privacy statements of these
              linked sites as their privacy policies may differ from ours.
            </p>
          </div>

          <p className="pt-4 text-xs text-muted-foreground/70">
            &copy; {new Date().getFullYear()} {BUSINESS.name}, All rights
            reserved. Unauthorized duplication or publication of any materials
            from this Site is expressly prohibited.
          </p>
        </div>
      </div>
    </section>
  );
}
