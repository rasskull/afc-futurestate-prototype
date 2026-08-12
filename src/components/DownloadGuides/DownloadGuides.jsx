import backgroundImage from '../../assets/photos/download-guides-bg.webp';
import './DownloadGuides.css';

const DEFAULT_GUIDES = [
  {
    id: 'cpa-tax-advisor-guide',
    title: 'CPA & Tax Advisor Guide',
    description:
      'A technical breakdown of the Education Freedom Tax Credit for CPAs and tax advisors — eligibility, the dollar-for-dollar credit, carryforward rules, and how to guide your clients.',
    fileUrl:
      'https://afcscholarshipfund.org/wp-content/uploads/2026/07/AFC-Scholarship-Fund-The-CPAs-Guide-to-the-Education-Freedom-Tax-Credit.pdf',
    fileName: 'AFC-Scholarship-Fund-The-CPAs-Guide-to-the-Education-Freedom-Tax-Credit.pdf',
  },
  {
    id: 'eligibility-guide',
    title: 'Eligibility Guide',
    description:
      'Who qualifies and how the credit works, in plain language — so you know exactly where you stand before you give.',
    fileUrl:
      'https://afcscholarshipfund.org/wp-content/uploads/2026/07/AFC-Scholarship-Fund-The-Familys-Complete-Guide-to-Scholarship-Eligibility-Under-the-Education-Freedom-Tax-Credit.pdf',
    fileName:
      'AFC-Scholarship-Fund-The-Familys-Complete-Guide-to-Scholarship-Eligibility-Under-the-Education-Freedom-Tax-Credit.pdf',
  },
  {
    id: 'donor-checklist',
    title: 'Donor Checklist',
    description:
      'A step-by-step checklist to get ready to fund a scholarship in 2027 — what to gather, what to expect, and how to claim your credit.',
    fileUrl:
      'https://afcscholarshipfund.org/wp-content/uploads/2026/07/AFC-Scholarship-Fund-The-Complete-Donors-Guide-to-the-Education-Freedom-Tax-Credit-1.pdf',
    fileName: 'AFC-Scholarship-Fund-The-Complete-Donors-Guide-to-the-Education-Freedom-Tax-Credit-1.pdf',
  },
];

// Download icon — ported verbatim from the real block's inline SVG
// (arrow into a tray), viewBox 0 0 20 20.
function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M10 2.5V12M10 12L6 8M10 12L14 8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 13.5V15.5C3.5 16.0523 3.94772 16.5 4.5 16.5H15.5C16.0523 16.5 16.5 16.0523 16.5 15.5V13.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Real source: afc/downloadable-guides (afc-core/blocks-src/downloadable-guides/)
// — a full-bleed brand-navy band with a row of borderless guide columns
// separated by thin dividers, each with a title/description/"Download PDF
// guide" button pinned to the bottom of its column. The real block gates
// first-time visitors behind an email-capture <dialog> (a chosen Fluent Form)
// before releasing the file, using Segment identity to recognize returning
// visitors — that whole gating mechanism (Fluent Forms + Segment) has no
// backend in this prototype, so it's intentionally omitted here. Instead each
// button downloads its real PDF directly from the live site, same convention
// as the homepage Video component linking straight to the live mp4.
export default function DownloadGuides({
  heading = (
    <>
      Download <strong>Guides</strong>
    </>
  ),
  intro = 'Free, practical guides to help you understand the Education Freedom Tax Credit and get ready to give.',
  guides = DEFAULT_GUIDES,
}) {
  return (
    <section
      className="afc-download-guides"
      style={{ '--afc-download-guides-bg': `url(${backgroundImage})` }}
    >
      <div className="afc-wide afc-download-guides__inner">
        <div className="afc-download-guides__header">
          <h2 className="afc-download-guides__heading">{heading}</h2>
          {intro && <p className="afc-download-guides__intro">{intro}</p>}
        </div>

        <ul className="afc-download-guides__grid" role="list">
          {guides.map((guide) => (
            <li className="afc-download-guides__card" key={guide.id}>
              <h3 className="afc-download-guides__card-title">{guide.title}</h3>
              <p className="afc-download-guides__card-description">{guide.description}</p>
              <a
                className="afc-download-guides__download"
                href={guide.fileUrl}
                download={guide.fileName}
                target="_blank"
                rel="noopener"
                aria-label={`Download ${guide.title} (PDF guide)`}
              >
                <span className="afc-download-guides__download-label">Download PDF guide</span>
                <span className="afc-download-guides__download-icon">
                  <DownloadIcon />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
