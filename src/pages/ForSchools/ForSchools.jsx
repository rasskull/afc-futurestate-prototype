import Hero from '../../components/Hero/Hero.jsx';
import NarrativeBlock from '../../components/NarrativeBlock/NarrativeBlock.jsx';
import EligibilityPromo from '../../components/EligibilityPromo/EligibilityPromo.jsx';
import Stats from '../../components/Stats/Stats.jsx';
import Faq from '../../components/Faq/Faq.jsx';
import ProcessSteps from '../../components/ProcessSteps/ProcessSteps.jsx';
import SignupFooter from '../Home/SignupFooter.jsx';
import WhyPartner from './WhyPartner.jsx';
import SchoolsSgosCards from './SchoolsSgosCards.jsx';
import schoolsHeroBg from '../../assets/photos/schools-hero-bg.webp';
import schoolsPartnersProduct from '../../assets/photos/schools-partners-product.webp';
import schoolsEmailCaptureBg from '../../assets/photos/schools-email-capture-bg.webp';

const PARTNER_CHECKLIST = [
  'A co-branded home for your families — your logo, your message, our conversion engine (e.g., partners.afcscholarshipfund.org/your-school).',
  'A real-time dashboard — track donations, applications, and funded students as they happen.',
  'Reporting and data export — pull program data and connect it to your own systems.',
  'Built-in compliance and secure fund distribution — audit-ready from contribution to student impact.',
  'Partner tiers — a standard co-branded setup, or a custom build for larger networks.',
];

const OVERSIGHT_CHECKLIST = [
  'At least 90% of every qualifying donation goes to scholarships — the federal 90/10 rule, tracked continuously.',
  'Contributions held in separate accounts and never commingled.',
  'Donor and family data protected on secure, regulated payment rails.',
  'Eligibility verified to the federal standard (up to 300% of area median gross income).',
  'Per-donor receipts and state + federal reporting handled for you.',
  'An audit-ready trail of every dollar, from contribution to student impact — and we track Treasury’s rule changes so your program stays current.',
];

const SCHOOLS_FAQS = [
  {
    question: 'Do we have to become an SGO?',
    answer: 'No. We act as the Scholarship Granting Organization for you, so you keep your brand and your focus on students.',
  },
  {
    question: 'How is this different from running our own program?',
    answer: 'You get a national fundraising engine and a co-branded portal on top of the infrastructure, not just the infrastructure, with the SGO burden carried for you.',
  },
  {
    question: 'When can families start using scholarships?',
    answer: 'The Education Freedom Tax Credit activates January 1, 2027; partners can begin setting up through early access in 2026.',
  },
  {
    question: 'Do we keep our brand?',
    answer: 'Yes. Every partner gets a co-branded portal and landing pages, so families see your name and logo throughout.',
  },
  {
    question: 'Which schools and expenses qualify?',
    answer: 'Any physical K–12 school — private, faith-based, independent, micro-school, or charter where applicable — can partner; which specific expenses scholarships cover is pending final Treasury guidance.',
  },
  {
    question: 'How is data handled and kept secure?',
    answer: 'Donations and student data run through audit-ready, secure distribution and reporting systems, with full details covered during onboarding.',
  },
];

export default function ForSchools() {
  return (
    <>
      <Hero
        backgroundImage={schoolsHeroBg}
        theme="light"
        title={
          <>
            We <strong>Bring</strong> Donors
          </>
        }
        subtitle={
          <>
            You <strong>Change</strong> Lives
          </>
        }
        lead="AFC Scholarship Fund is America’s scholarship network — the national fundraising engine, the partner portal, and the Scholarship Granting Organization, all in one. Partner with us before the Education Freedom Tax Credit opens in 2027."
        ctaLabel="Register Your Interest"
      />

      <NarrativeBlock
        heading={
          <>
            Anyone Can Hand You a Platform
            <br />
            <strong>We Hand You Donors</strong>
          </>
        }
        lead={null}
        body={[
          <strong key="1">
            We hand you donors, your brand, and a team that runs it all.
          </strong>,
          'Software can help you run your own SGO — but you still have to staff it, stay compliant, and go find every donor yourself. Partnering with AFC is a different path: we’re the SGO, and we bring the demand. You get a national fundraising engine, your own brand on a national-grade portal, and our team carrying the operational and compliance load.',
        ]}
        checklistItems={[]}
        showLines={false}
      />

      <WhyPartner />

      <EligibilityPromo
        eyebrow={null}
        heading={
          <>
            A new <strong>national scholarship program</strong> opens in 2027
          </>
        }
        subheading="The schools that prepare in 2026 win first"
        lead="Starting January 1, 2027, individuals can give to a scholarship granting organization and receive a dollar-for-dollar federal tax credit of up to $1,700 when they file. That money can fund tuition and educational expenses for families at your school — but only through an SGO. The organizations that line up their network now will be funding students on day one. The ones that wait will spend 2027 building what they could have had ready."
        bullets={[]}
        ctaLabel={null}
      />

      <SchoolsSgosCards />

      <EligibilityPromo
        eyebrow={null}
        heading={
          <>
            what <strong>partners</strong> get
          </>
        }
        lead={null}
        bullets={PARTNER_CHECKLIST}
        ctaLabel={null}
        art={schoolsPartnersProduct}
        artAlt="Hand holding a phone showing a co-branded AFC Scholarship Fund partner dashboard with real-time donation and scholarship totals"
        artLeft
      />

      <Stats />

      <NarrativeBlock
        heading={
          <>
            Built for federal oversight. <strong>Trusted with families’ futures.</strong>
          </>
        }
        lead="As a national Scholarship Granting Organization, AFC carries the federal compliance burden so you don’t have to. Every dollar is handled to the standard the Education Freedom Tax Credit requires:"
        body={[]}
        introText={null}
        checklistItems={OVERSIGHT_CHECKLIST}
        showLines={false}
        checklistCols2
      />

      <ProcessSteps />

      <Faq
        heading={
          <>
            <strong>Frequently</strong> asked questions
          </>
        }
        intro="Get answers to common questions for Schools & SGOs."
        faqs={SCHOOLS_FAQS}
      />

      <SignupFooter
        heading={
          <>
            Be funding students <strong>on day one</strong>
          </>
        }
        supportCopy="Register your interest and our partnerships team will get you set up — your co-branded portal, your families, our engine — ready for January 1, 2027"
        backgroundImage={schoolsEmailCaptureBg}
      />
    </>
  );
}
