import posterImage from '../../assets/photos/homepage-video-poster.jpg';
import './Video.css';

// Real source: a WP core/video block (wp-content/mu-plugins/afc-google-analytics
// instruments `.wp-block-video video` for GA4/Segment engagement events — that's
// how we know it's a self-hosted <video>, not a YouTube/Vimeo embed). Confirmed
// live: <figure class="wp-block-video alignwide"><video controls poster="..."
// src="..." style="aspect-ratio: 3840/2160"></figure>, no visible <figcaption> —
// the video's title only surfaces via the page's VideoObject JSON-LD schema.
//
// The mp4 itself (~92MB) is referenced directly from the live site rather than
// vendored into this repo — every other asset here is a small, git-friendly
// image; a 92MB binary isn't. The poster IS vendored locally (386KB, same
// convention as every other photo asset) since it's small and this component
// should render something meaningful even if the remote video is unreachable.
//
// paddingTop/paddingBottom are override-able per placement — the homepage
// instance (directly under NarrativeBlock, no heading above it) zeroes
// paddingTop; other pages reusing this block with their own heading/intro
// text above it will want a larger, non-zero top padding instead.
//
// heading/body are optional — some placements (e.g. "How the EFTC Works")
// have a "VIDEO OVERVIEW" gradient heading + short intro paragraph directly
// above the video; the plain homepage placement has neither. Matches the
// real source exactly: a wp:heading with the "gradient-text" style variant
// (IBM Plex Sans, --font-size-display, weight 600 base / 900 on <strong>)
// followed by a plain paragraph, both alignwide like the video itself.
export default function Video({
  src = 'https://afcscholarshipfund.org/wp-content/uploads/2026/07/AFC_Explainers_EP1_Final-Cut-1_1.mp4',
  poster = posterImage,
  title = 'Education Freedom Tax Credit (EFTC)',
  heading,
  body,
  paddingTop = '5rem',
  paddingBottom = '5rem',
}) {
  return (
    <div
      className="afc-wide afc-video-block"
      style={{ '--afc-video-padding-top': paddingTop, '--afc-video-padding-bottom': paddingBottom }}
    >
      {heading && (
        <div className="afc-video__intro">
          <h2 className="afc-video__heading">{heading}</h2>
          {body && <p className="afc-video__body">{body}</p>}
        </div>
      )}
      <figure className="afc-video">
        <video className="afc-video__el" controls poster={poster} aria-label={title} src={src} />
      </figure>
    </div>
  );
}
