import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { NavigationLinks } from '../types';

const navLinks = [
  { name: 'Home', path: NavigationLinks.HOME },
  { name: 'Services', path: NavigationLinks.SERVICES },
  { name: 'Gallery', path: NavigationLinks.GALLERY },
  { name: 'About', path: NavigationLinks.ABOUT },
  { name: 'Contact', path: NavigationLinks.CONTACT },
];

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-earth-900/95 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-20 flex items-center justify-between">
            <Link to={NavigationLinks.HOME} className="min-w-0">
              <div className="text-white">
                <div className="text-xl md:text-2xl font-serif font-bold leading-tight truncate">James Lewis Interiors</div>
                <div className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-gold-500 mt-1 truncate">Shropshire</div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-xs uppercase tracking-[0.18em] font-bold pb-1 border-b-2 transition-colors ${
                    location.pathname === link.path ? 'text-gold-500 border-gold-500' : 'text-white border-transparent hover:text-gold-500 hover:border-gold-500'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <a href="tel:+447896832992" className="inline-flex items-center gap-3 text-white hover:text-gold-500 transition-colors">
                <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                  <Phone size={15} />
                </span>
                <span className="text-sm font-bold tracking-wide">07896 832992</span>
              </a>
            </div>

            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 text-white hover:text-gold-500"
              onClick={() => setOpen((value) => !value)}
              aria-label="Toggle navigation menu"
            >
              {open ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>
      </header>

      <div className="h-20" />

      <div className={`fixed inset-0 z-40 bg-earth-900 transition-transform duration-300 lg:hidden ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col items-center justify-center gap-8 px-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-2xl font-serif text-white hover:text-gold-500 transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="mt-6 flex flex-col items-center gap-4">
            <a href="tel:+447896832992" className="text-white font-bold text-lg hover:text-gold-500 transition-colors">
              07896 832992
            </a>
            <a href="mailto:jameslewisinteriors@gmail.com" className="text-white font-bold text-sm hover:text-gold-500 transition-colors">
              jameslewisinteriors@gmail.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
