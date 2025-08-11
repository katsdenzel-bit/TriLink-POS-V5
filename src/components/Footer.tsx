
import { Wifi, MapPin, Phone, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src="/lovable-uploads/b2ddcd57-4272-484d-bca3-00012be120eb.png" alt="TriLink Wireless" className="h-10 w-auto" />
              <span className="font-bold text-xl">TriLink Wireless</span>
            </div>
            <p className="text-muted-foreground text-base">
              Affordable Wireless ISP - Providing reliable internet access for everyone. 
              Your trusted wireless ISP partner.
            </p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Wifi className="w-4 h-4" />
              <span>Always Connected</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Our Plans</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Instant Surf - Daily Plan</li>
              <li>Flexi Surf - Weekly Plan</li>
              <li>Endless Surf - Monthly Plan</li>
              <li>Voucher System</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Help Center</li>
              <li>Network Status</li>
              <li>Contact Support</li>
              <li>Payment Options</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Uganda, East Africa</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+256 771 611570</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>katsdenzel@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 mt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 TriLink Wireless. All rights reserved. • Affordable • Unlimited • Reliable</p>
        </div>
      </div>
    </footer>
  );
};
