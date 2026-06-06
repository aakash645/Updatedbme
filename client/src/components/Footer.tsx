import { Link } from "wouter";
import { Mail, Phone, MapPin } from "lucide-react";
import bmeLogoPath from "@assets/Copper_finish_logo_-_No_BG_1772884011587.png";

export default function Footer() {
  return (
    <footer className="bg-gradient-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-4">
            <img src={bmeLogoPath} alt="BME Logo" className="h-16 w-auto" />
            <p className="text-white/70 text-sm leading-relaxed">
              The Apex Body of Non-Ferrous Metals Trade & Industry Since 1933. A legacy of excellence powering the nation's economy.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link href="/about" className="hover:text-primary transition-colors">Our Heritage</Link></li>
              <li><Link href="/president" className="hover:text-primary transition-colors">President's Message</Link></li>
              <li><Link href="/directors" className="hover:text-primary transition-colors">Board of Directors</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">Products & Services</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-4 text-primary">Resources</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/refund-policy" className="hover:text-primary transition-colors">Refund Policy</Link></li>
              <li><Link href="/cancellation-policy" className="hover:text-primary transition-colors">Cancellation Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-4 text-primary">Contact</h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>BME House, 88/90, 1st Floor,<br />Kika Street, Gulalwadi<br />Mumbai - 400 004</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>022 4960 5039</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>info@bme.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col items-center justify-center text-xs text-white/50">
          <p>&copy; {new Date().getFullYear()} Bombay Metal Exchange Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
