import './Faq.css';

const DEFAULT_FAQS = [
  {
    question: 'What is the Education Freedom Tax Credit?',
    answer:
      "The Education Freedom Tax Credit (EFTC) is a new federal tax credit that rewards taxpayers who donate to qualified scholarship granting organizations (SGOs). When you make a charitable contribution to a qualified SGO, you receive a dollar-for-dollar federal tax credit of up to $1,700. This reduces what you owe the IRS when you file your taxes. The donation comes first, then the tax benefit follows. The EFTC takes effect January 1, 2027.",
  },
  {
    question: 'What is the AFC Scholarship Fund?',
    answer:
      "The AFC Scholarship Fund is a nonprofit scholarship granting organization (SGO) created to make the Education Freedom Tax Credit work on a national scale. It is affiliated with the American Federation for Children (AFC), the nation’s largest school choice organization. Our mission is to connect donors to students, making it as simple as possible for families to access the education that’s right for their children.",
  },
  {
    question: 'How does the new federal Education Freedom Tax Credit work?',
    answer: [
      <>
        Here&rsquo;s the process, step by step:
        <br />
        <strong>Step 1:</strong> You make a charitable contribution to a qualified scholarship
        granting organization (SGO).
        <br />
        <strong>Step 2:</strong> That contribution generates a dollar-for-dollar federal tax credit
        of up to $1,700.
        <br />
        <strong>Step 3:</strong> The credit reduces what you owe the IRS when you file your federal
        taxes.
      </>,
      'The EFTC is not a deduction. It is a direct reduction of your federal tax liability. You donate first; the credit follows at filing. The program launches January 1, 2027.',
    ],
  },
  {
    question: 'How is this different from a donation or tax deduction?',
    answer: [
      'Many charitable donations qualify for a tax deduction. These tax deductions simply reduce your taxable income, which means the actual savings are a fraction of what you gave.',
      'For example, if you’re in the 24% tax bracket and claim a $1,700 deduction, you save about $408. That’s it.',
      'A tax credit, on the other hand, reduces your actual tax bill, dollar for dollar. If you donate $1,700 to a qualified scholarship granting organization (SGO) and owe $2,000 in federal taxes, you now owe $300. Your tax liability decreases by $1,700, not $408.',
    ],
  },
  {
    question: 'Does my state need to opt in for me to take advantage of the federal tax credit?',
    answer:
      "Your state’s participation status does not affect your ability to claim the federal Education Freedom Tax Credit. The EFTC is a federal benefit. What matters is that the SGO you donate to is a qualified organization. Donors can contribute to SGOs in any participating state and still receive the federal credit, regardless of where they live. If your state has not opted in, you can still donate to a qualified SGO. Your federal credit applies all the same.",
  },
  {
    question: 'Can unused federal tax credits be carried forward?',
    answer:
      'Credits for donations of more than $1,700 can be carried forward for up to five years.',
  },
  {
    question: 'Why does early participation matter?',
    answer:
      'The Education Freedom Tax Credit launches January 1, 2027, but families are counting on scholarship infrastructure being in place from day one. When donors register their interest now and commit early, they help scholarship granting organizations build the capacity to serve families quickly when the program goes live. Early participation also helps ensure that lower-income families, who need these scholarships most, have access from the start.',
  },
  {
    question: 'Who is eligible to receive an EFTC scholarship?',
    answer: [
      'Approximately 90% of American students are eligible to receive EFTC scholarships through a qualified scholarship granting organization (SGO). Eligibility is based on household income relative to local area median income. Scholarships become available starting in 2027 when the Education Freedom Tax Credit takes effect.',
      'If you’re wondering whether your family qualifies, register your interest and we’ll help you find out.',
    ],
  },
  {
    question: 'How do I apply for an Education Freedom scholarship?',
    answer:
      'Scholarship applications are processed through scholarship granting organizations (SGOs) like the AFC Scholarship Fund. The tax credit takes effect on January 1, 2027.',
  },
];

export default function Faq({
  heading = (
    <>
      <strong>Frequently</strong> Asked Questions
    </>
  ),
  intro = 'Get answers to common questions about the Education Freedom Tax Credit and the AFC Scholarship Fund.',
  faqs = DEFAULT_FAQS,
}) {
  return (
    <section className="afc-faq">
      <div className="afc-wide">
        <div className="afc-faq__inner">
          <div className="afc-faq__sidebar">
            <h2 className="afc-faq__heading">{heading}</h2>
            <p className="afc-faq__intro">{intro}</p>
          </div>

          <div className="afc-faq__list">
            {faqs.map((faq) => (
              <details className="afc-faq__item" key={faq.question}>
                <summary className="afc-faq__question">{faq.question}</summary>
                <div className="afc-faq__answer-wrap">
                  {(Array.isArray(faq.answer) ? faq.answer : [faq.answer]).map((paragraph, i) => (
                    <p className="afc-faq__answer" key={i}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
