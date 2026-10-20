import type { Metadata } from "next"
import { Display, Eyebrow, Section } from "@/components/site/section"

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How TalkToGenie.ai handles personal information on this website.",
}

const UPDATED = "October 20, 2026"

export default function PrivacyPolicyPage() {
  return (
    <Section className="py-16 md:py-24">
      <Eyebrow>Privacy</Eyebrow>
      <Display as="h1" className="mt-4 max-w-4xl">
        Privacy policy
      </Display>
      <p className="mx-auto mt-5 max-w-2xl text-center text-sm text-mist">Last updated {UPDATED}</p>
      <div className="mx-auto mt-10 max-w-3xl space-y-8 text-left text-sm leading-relaxed text-mist">
        <section>
          <h2 className="text-lg text-ink">Who we are</h2>
          <p className="mt-2">
            TalkToGenie.ai (“Talk to Genie,” “we,” “us”) provides an on-demand concierge for professional hospitality operators. This policy explains how we handle personal information on talktogenie.ai. Questions go to{" "}
            <a className="text-ink underline-offset-4 hover:underline" href="mailto:support@talktogenie.ai">
              support@talktogenie.ai
            </a>{" "}
            or +12367077040.
          </p>
        </section>
        <section>
          <h2 className="text-lg text-ink">Information we collect</h2>
          <p className="mt-2">
            This website does not collect account details. Log in and sign up happen at app.talktogenie.ai. If you email or call us, we keep that correspondence so we can reply.
          </p>
          <p className="mt-2">
            Our servers also keep ordinary technical logs, such as IP address, browser type, and the pages requested, so the site can run and so we can limit abusive traffic.
          </p>
          <p className="mt-2">
            This marketing site does not use third-party advertising or analytics cookies. If you later use the Genie product, that service processes the operational data your company connects, including guest messages, tasks, and reservation records, under the instructions of your company.
          </p>
        </section>
        <section>
          <h2 className="text-lg text-ink">How we use it</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>To reply when you email or call us</li>
            <li>To keep the website available and to block abusive traffic</li>
            <li>To meet a legal obligation, if one applies</li>
          </ul>
          <p className="mt-2">We do not sell personal information.</p>
        </section>
        <section>
          <h2 className="text-lg text-ink">Where it is kept</h2>
          <p className="mt-2">
            Messages you send us are kept for as long as we need them to reply, and then for a short period afterward in case you follow up. You can ask us to delete them sooner. Account information entered at app.talktogenie.ai is handled by that product, not by this marketing site.
          </p>
        </section>
        <section>
          <h2 className="text-lg text-ink">Sharing</h2>
          <p className="mt-2">
            We share personal information with service providers that host this website or help us operate it, and only so they can do that work. We also share it if the law requires it, or to protect Talk to Genie, our users, or someone else from harm. If you become a customer, the systems you choose to connect, such as your PMS or messaging tools, receive only what is needed for those connections.
          </p>
        </section>
        <section>
          <h2 className="text-lg text-ink">Your choices</h2>
          <p className="mt-2">
            You can ask to see, correct, or delete personal information we hold from a message you sent us. Email support@talktogenie.ai. If you are in a place that gives you additional rights, such as to object or to lodge a complaint with a regulator, you can use them. We will not discriminate against you for asking.
          </p>
        </section>
        <section>
          <h2 className="text-lg text-ink">Children</h2>
          <p className="mt-2">
            This website is for hospitality operators, not for children. We do not knowingly collect personal information from anyone under 16.
          </p>
        </section>
        <section>
          <h2 className="text-lg text-ink">Changes</h2>
          <p className="mt-2">
            If we change this policy, we will post the new version on this page and update the date above.
          </p>
        </section>
      </div>
    </Section>
  )
}
