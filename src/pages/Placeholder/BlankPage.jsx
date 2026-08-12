import { Link } from 'react-router-dom';
import './BlankPage.css';

export default function BlankPage({ title = 'Page not found' }) {
  return (
    <section className="afc-blank-page afc-wide">
      <p className="eyebrow afc-blank-page__eyebrow">Coming Soon</p>
      <h1>{title}</h1>
      <p>This page hasn&rsquo;t been built yet in this prototype.</p>
      <Link to="/">Back to home</Link>
    </section>
  );
}
