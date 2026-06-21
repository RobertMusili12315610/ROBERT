import { useState, useEffect, useRef } from 'react';

export default function Navbar({ links }) {
  const [active, setActive] = useState('Home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY || window.pageYOffset;
      if (menuOpen) {
        // keep navbar visible when the mobile menu is open
        lastScrollY.current = currentY;
        setHidden(false);
        return;
      }

      if (currentY > lastScrollY.current && currentY > 50) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const onClickOutside = (event) => {
      const menuEl = menuRef.current;
      const toggleEl = toggleRef.current;

      if (!menuEl || !toggleEl) return;
      if (menuEl.contains(event.target) || toggleEl.contains(event.target)) return;

      setMenuOpen(false);
    };

    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [menuOpen]);

  return (
    <header className={`NavBar__Header ${hidden ? 'NavBar--Hidden' : ''}`}>
      <nav className="Nav Grid">
        <a href="#Home" className="NavBar__Logo">
          ROBERT MUSILI
        </a>
        <div ref={menuRef} className={`NavBar__Menu ${menuOpen ? 'Show' : ''}`} id="NavBar__Menu">
          <ul className="NavBar__List">
            {links.map((link) => (
              <li key={link.id} className="NavBar__Item">
                <a
                  href={`#${link.id}`}
                  className={`NavBar__Link ${active === link.id ? 'Active' : ''}`}
                  onClick={() => {
                    setActive(link.id);
                    setMenuOpen(false);
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div
          ref={toggleRef}
          className="NavBar__Toggle"
          id="NavBar__Toggle"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <i className="bx bx-menu"></i>
        </div>
      </nav>
    </header>
  );
}
