import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import bmeLogoPath from "@assets/Copper_finish_logo_-_No_BG_1772884011587.png";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  {
    name: "Activities",
    children: [
      { name: "Events & Exhibitions", href: "/events" },
      { name: "Annual Conclave", href: "/conclave" },
      { name: "Circulars & Notices", href: "/circulars" },
      { name: "Gallery", href: "/gallery" },
    ],
  },
  { name: "Conclave 2027", href: "/conclave2027" },
  { name: "Products", href: "/products" },
  { name: "Knowledge Hub", href: "/knowledge" },
  { name: "Membership", href: "/membership" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
          : "bg-background py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 group transition-transform hover:scale-105"
        >
          <img src={bmeLogoPath} alt="BME Logo" className="h-16 w-auto md:h-20" />
          <div className="hidden sm:block">
            <h1 className="font-serif font-bold text-medium md:text-sm leading-none text-foreground">
              Bharat Metal Exchange Ltd.
            </h1>
            <p className="text-[0.6rem] md:text-[0.65rem] uppercase tracking-wider text-primary font-semibold">
              Since 1933
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <div key={link.name}>
              {link.children ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-sm font-semibold flex items-center gap-1 h-10 px-3 hover:text-primary">
                      {link.name} <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    {link.children.map((child) => (
                      <DropdownMenuItem key={child.name} asChild>
                        <Link href={child.href} className="w-full cursor-pointer py-2">
                          {child.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  variant="ghost" 
                  asChild 
                  className={`text-sm font-semibold h-10 px-3 ${location === link.href ? "text-primary bg-primary/10" : "hover:text-primary"}`}
                >
                  <Link href={link.href}>{link.name}</Link>
                </Button>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Nav */}
        <div className="lg:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] flex flex-col pt-16">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <div key={link.name} className="flex flex-col">
                    {link.children ? (
                      <>
                        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-2 py-2 mt-2">
                          {link.name}
                        </div>
                        {link.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className={`text-base font-serif font-medium p-2 rounded-md transition-colors ${
                              location === child.href ? "bg-primary/10 text-primary" : "hover:bg-muted"
                            }`}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </>
                    ) : (
                      <Link
                        href={link.href}
                        className={`text-lg font-serif font-medium p-2 rounded-md transition-colors ${
                          location === link.href ? "bg-primary/10 text-primary" : "hover:bg-muted"
                        }`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
