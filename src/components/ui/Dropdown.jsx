import { useEffect, useRef, useState } from 'react';
import './Dropdown.css';

// Thin chevron from the AFC-Site-Design Figma file's state dropdown — native
// orientation points right, rotated via CSS to point down/up.
function CaretIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 6.78733 11.6667"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.62615 6.22063L1.25871 11.5061C1.04456 11.7202 0.698269 11.7202 0.484118 11.5061L0.160613 11.1825C-0.0535377 10.9684 -0.0535377 10.6221 0.160613 10.408L4.82181 5.83333L0.16517 1.25871C-0.0489814 1.04456 -0.0489814 0.698269 0.16517 0.484118L0.488674 0.160613C0.702825 -0.0535377 1.04911 -0.0535377 1.26326 0.160613L6.6307 5.44604C6.8403 5.66019 6.8403 6.00648 6.62615 6.22063Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Dropdown({ id, options, value, onChange, placeholder = 'Select…' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef(null);
  const listRef = useRef(null);

  const selectedIndex = options.findIndex((option) => option.value === value);
  const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : null;

  useEffect(() => {
    function handlePointerDown(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  useEffect(() => {
    if (isOpen && activeIndex >= 0) {
      listRef.current?.children[activeIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [isOpen, activeIndex]);

  function open() {
    setIsOpen(true);
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
  }

  function selectOption(option) {
    onChange(option.value);
    setIsOpen(false);
  }

  function handleKeyDown(e) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) open();
        else setActiveIndex((i) => Math.min(i + 1, options.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) open();
        else setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (isOpen) {
          if (activeIndex >= 0) selectOption(options[activeIndex]);
        } else {
          open();
        }
        break;
      case 'Escape':
        if (isOpen) {
          e.preventDefault();
          setIsOpen(false);
        }
        break;
      case 'Tab':
        setIsOpen(false);
        break;
      default:
        break;
    }
  }

  return (
    <div className="afc-dropdown" ref={containerRef}>
      <button
        type="button"
        id={id}
        className={`afc-dropdown__trigger${isOpen ? ' is-open' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${id}-listbox`}
        aria-activedescendant={isOpen && activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined}
        onClick={() => (isOpen ? setIsOpen(false) : open())}
        onKeyDown={handleKeyDown}
      >
        <span className={`afc-dropdown__value${selectedOption ? '' : ' is-placeholder'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <CaretIcon className="afc-dropdown__caret" />
      </button>

      {isOpen && (
        <ul className="afc-dropdown__list" role="listbox" id={`${id}-listbox`} ref={listRef}>
          {options.map((option, index) => (
            <li
              key={option.value}
              role="option"
              id={`${id}-option-${index}`}
              aria-selected={option.value === value}
              className={`afc-dropdown__option${index === activeIndex ? ' is-active' : ''}`}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => selectOption(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
