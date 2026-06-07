import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { NavigationLinks } from '../types';

const Footer: React.FC = () => {
  return (
    <footer className="bg-earth-900 text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="text-2xl font-serif font-bold">James Lewis Interiors</div>
            <p className="mt-4 text-gray-300 leading-relaxed max-w-sm">
              Building better spaces with craftsmanship you can trust. Commercial and residential work done right.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-serif mb-5 text-gold-500">Navigation</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to={NavigationLinks.HOME} className="hover:text-gold-500 transition-colors">Home</Link></li>
              <li><Link to={NavigationLinks.SERVICES} className="hover:text-gold-500 transition-colors">Services</Link></li>
              <li><Link to={NavigationLinks.GALLERY} className="hover:text-gold-500 transition-colors">Gallery</Link></li>
              <li><Link to={NavigationLinks.ABOUT} className="hover:text-gold-500 transition-colors">About</Link></li>
              <li><Link to={NavigationLinks.CONTACT} className="hover:text-gold-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-serif mb-5 text-gold-500">Contact</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 text-gold-500 shrink-0" />
                <span>Shropshire, UK</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5 text-gold-500 shrink-0" />
                <a href="tel:+447896832992" className="hover:text-gold-500 transition-colors">07896 832992</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 text-gold-500 shrink-0" />
                <a href="mailto:jameslewisinteriors@gmail.com" className="hover:text-gold-500 transition-colors break-all">jameslewisinteriors@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-sm text-gray-400 flex flex-col md:flex-row gap-3 justify-between">
          <p>&copy; {new Date().getFullYear()} James Lewis Interiors. All rights reserved.</p>
          <p>Commercial and residential interior work across Shropshire.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
