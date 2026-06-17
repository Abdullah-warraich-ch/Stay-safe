import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  const socialLinks = [
    { icon: FaFacebookF, href: '#' },
    { icon: FaTwitter, href: '#' },
    { icon: FaInstagram, href: '#' },
  ];

  return (
    <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo and About */}
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-primary tracking-tight">
              Rehloo<span className="text-primary">.</span>
            </h1>
            <p className="text-slate-500 text-[13px] leading-relaxed max-w-xs">
              We provide verified, budget-friendly student accommodation with zero brokerage. Your safe home away from home.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => (
                <a key={idx} href={social.href} className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary transition-all duration-300">
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[14px] font-semibold text-slate-900 mb-6">Popular Cities</h4>
            <ul className="space-y-4 text-[13px] text-slate-500">
              {["Lahore", "Islamabad", "Karachi", "Faisalabad"].map((city) => (
                <li key={city} className="group w-fit">
                  <a href="#" className="relative pt-1 hover:text-primary transition-colors">
                    {city}
                    <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[14px] font-semibold text-slate-900 mb-6">Company</h4>
            <ul className="space-y-4 text-[13px] text-slate-500">
              {["About Us", "Contact Us", "Terms of Service", "Privacy Policy", "List Your Hostel"].map((item) => (
                <li key={item} className="group w-fit">
                  <a href="#" className="relative py-1 hover:text-primary transition-colors">
                    {item}
                    <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[14px] font-semibold text-slate-900 mb-6">Get In Touch</h4>
            <ul className="space-y-4 text-[13px] text-slate-500">
              <li className="flex items-start gap-3">
                <MapPin className="shrink-0 text-primary" size={18} />
                <span>Sector H-12, Islamabad, Pakistan</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="shrink-0 text-primary" size={18} />
                <span>+92 300 1234567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="shrink-0 text-primary" size={18} />
                <span>support@staysafe.pk</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} <span className='text-primary'>Rehloo</span><span className='text-primary'>.</span> All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-400">
            <a href="#" className="group relative py-1 hover:text-primary transition-colors">
              Privacy Policy
              <span className="absolute left-0 -bottom-0.5 h-[1px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#" className="group relative py-1 hover:text-primary transition-colors">
              Terms of Service
              <span className="absolute left-0 -bottom-0.5 h-[1px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}