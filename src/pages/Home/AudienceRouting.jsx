import Button from '../../components/ui/Button.jsx';
import parentsImage from '../../assets/photos/audience-parents.webp';
import schoolsImage from '../../assets/photos/audience-schools.webp';
import './AudienceRouting.css';

const CARDS = [
  {
    key: 'parents',
    image: parentsImage,
    alt: 'A parent helping her son with schoolwork at a table',
    heading: (
      <>
        For <strong>Parents</strong>
      </>
    ),
    body: 'Your child could qualify for a scholarship beginning in 2027. Learn how the EFTC works — and be the first to know when applications open and funding becomes available.',
    to: '/for-parents',
    label: 'Learn More',
  },
  {
    key: 'schools',
    image: schoolsImage,
    alt: 'A teacher leading a classroom of students',
    heading: (
      <>
        For <strong>Schools &amp; SGOs</strong>
      </>
    ),
    body: 'We bring the donors. Your school changes lives. The Education Freedom Tax Credit opens a new national funding stream for K–12 scholarships, and the AFC Scholarship Fund connects that funding to your students and families.',
    to: '/for-schools',
    label: 'partner with us',
  },
];

export default function AudienceRouting() {
  return (
    <section className="afc-audience-routing">
      <div className="afc-wide">
        <div className="afc-audience-routing__grid">
          {CARDS.map((card) => (
            <div className="afc-audience-routing__card" key={card.key}>
              <img
                className="afc-audience-routing__image"
                src={card.image}
                alt={card.alt}
                loading="lazy"
              />
              <div className="afc-audience-routing__content">
                <h3 className="afc-audience-routing__heading">{card.heading}</h3>
                <p className="afc-audience-routing__body">{card.body}</p>
                <div className="afc-audience-routing__button-wrap">
                  <Button to={card.to} variant="solid">
                    {card.label}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
