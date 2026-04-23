"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingBag, Bookmark, User } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { usePathname } from "next/navigation";

import { motion } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const { items, openCart, wishlistItems, isLoggedIn, user, logout } = useCartStore();

  const navLinks = [
    { name: "The Lookbook", href: "/" },
    { name: "Collections", href: "/collections" },
    { name: "About", href: "/about" },
  ];

  const isAboutPage = pathname === "/about";

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isAboutPage 
      ? "bg-transparent border-none" 
      : "bg-[#f9f9fa]/90 backdrop-blur-md border-b border-black/5"
    }`}>
      <div className={`grid grid-cols-3 items-center px-8 h-[72px] ${isAboutPage ? "text-white" : "text-black"}`}>
        {/* LEFT: Branding */}
        <div className="flex justify-start">
          <Link href="/" className={`relative h-[72px] w-64 transition-opacity flex items-center overflow-hidden ml-[-24px] ${isAboutPage ? "invert brightness-200" : "hover:opacity-60"}`}>
            <Image 
              src="/logo_cg.png" 
              alt="COLIN GUEST" 
              fill 
              className="object-cover" 
              priority
            />
          </Link>
        </div>

        {/* CENTER: Editorial Navigation */}
        <div className="hidden md:flex justify-center gap-12 text-[10px] tracking-[0.2em] uppercase font-bold">
          {navLinks.map((link) => {
            const isActive = link.href === "/" 
              ? pathname === "/" 
              : pathname.startsWith(link.href);
            
            return (
              <Link 
                key={link.href}
                href={link.href} 
                className={`relative py-1 transition-colors ${
                  isAboutPage 
                    ? isActive ? 'text-white' : 'text-white/50 hover:text-white'
                    : isActive ? 'text-black' : 'text-black/40 hover:text-black'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div 
                    layoutId="nav-underline"
                    className={`absolute bottom-0 left-0 right-0 h-[1px] ${isAboutPage ? "bg-white" : "bg-black"}`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* RIGHT: Constant Icons Cluster */}
        <div className={`flex items-center justify-end gap-6 text-xs font-semibold tracking-widest uppercase ${isAboutPage ? "text-white" : "text-black"}`}>
          <Search size={18} className={`cursor-pointer transition-colors ${isAboutPage ? "text-white/50 hover:text-white" : "text-black/40 hover:text-black"}`} />
          
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <span className={`text-[9px] font-bold lowercase max-w-[80px] truncate ${isAboutPage ? "text-white/50" : "text-black/40"}`}>{user?.email}</span>
              <button onClick={logout} className={`transition-colors ${isAboutPage ? "text-white/50 hover:text-white" : "text-black/40 hover:text-black"}`}>
                <User size={18} strokeWidth={1.5} className={isAboutPage ? "fill-white" : "fill-black"} />
              </button>
            </div>
          ) : (
            <Link href="/login" className={`cursor-pointer block transition-colors ${isAboutPage ? "text-white/50 hover:text-white" : "text-black/40 hover:text-black"}`}>
              <User size={18} strokeWidth={1.5} />
            </Link>
          )}

          <Link href="/wishlist" className={`cursor-pointer block relative transition-colors ${isAboutPage ? "text-white/50 hover:text-white" : "text-black/40 hover:text-black"}`}>
            <Bookmark size={18} strokeWidth={1.5} />
            {wishlistItems.length > 0 && (
              <span className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${isAboutPage ? "bg-white" : "bg-black"}`} />
            )}
          </Link>

          <div 
            className={`flex items-center gap-2 cursor-pointer transition-colors ${isAboutPage ? "text-white/50 hover:text-white" : "text-black/40 hover:text-black"}`} 
            onClick={openCart}
          >
            <ShoppingBag size={18} />
            <span className="text-[10px] font-bold">({items.length})</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
