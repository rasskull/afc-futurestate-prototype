import exploreTwoBrothers from '../../assets/photos/explore2-two-brothers-college.jpg';
import exploreAllenThompson from '../../assets/photos/explore2-allen-thompson.jpg';
import exploreVeteranDaughter from '../../assets/photos/explore2-veteran-daughter.jpg';
import exploreValiantCross from '../../assets/photos/explore2-valiant-cross-academy.jpg';

// Fresh set of real stories (sourced from /stories/) distinct from the
// homepage StoriesGrid's own default 4 — the live Resource Center page
// actually reuses the exact same homepage 4, but this page intentionally
// shows different ones per an explicit request. Headline casing matches
// this component's own established data convention (literal caps strings —
// see StoriesGrid.jsx's DEFAULT_STORIES), not the real raw-DOM sentence
// case, since the shared component has no CSS text-transform of its own.
export const RESOURCE_CENTER_STORIES = [
  {
    image: exploreTwoBrothers,
    alt: 'Two brothers who both went on to college with the help of a scholarship',
    headline: 'THEIR PARENTS NEVER FINISHED SIXTH GRADE. A SCHOLARSHIP HELPED SEND BOTH SONS TO COLLEGE',
    snippet:
      'Some parents want their kids to have an education. Antoine and Manny’s parents needed an education but never got the chance to finish one. That didn’t stop them from building their whole lives around getting it for their sons.',
  },
  {
    image: exploreAllenThompson,
    alt: 'Allen Thompson, a teacher who benefited from school choice as a student',
    headline: 'SCHOOL CHOICE GAVE ALLEN THOMPSON A SECOND CHANCE. NOW HE’S GIVING IT TO HIS STUDENTS',
    snippet:
      'Allen Thompson waited four years for a magnet school seat while his mom sacrificed every morning to get him there. Today he’s the teacher he once needed.',
  },
  {
    image: exploreVeteranDaughter,
    alt: 'A military veteran with her daughter',
    headline: 'A VETERAN’S FIGHT FOR HER DAUGHTER’S FUTURE',
    snippet:
      'Tonya Johnston served in the military to build a better future for her family. When her daughter Joy began struggling in public school, Tonya felt like she was out of options — until a conversation across the fence introduced her to a life-changing opportunity.',
  },
  {
    image: exploreValiantCross,
    alt: 'Students at Valiant Cross Academy',
    headline: 'VALIANT CROSS ACADEMY: BROTHERHOOD, OPPORTUNITY, AND A BETTER FUTURE',
    snippet:
      'Across America, millions of children walk into classrooms every day that were chosen for them, not by their families, but by circumstance. That is why schools like Valiant Cross Academy exist — founded to love, educate, and empower young African American men and boys of color.',
  },
];
