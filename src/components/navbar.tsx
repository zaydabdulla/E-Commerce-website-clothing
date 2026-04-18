"use client";

import Link from "next/link";
import { Search, ShoppingBag, Bookmark, User } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const { items, openCart, wishlistItems } = useCartStore();

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#f9f9fa]/90 backdrop-blur-md border-b border-black/5">
      <div className="flex items-center justify-between px-8 py-6 text-black">
        {/* LEFT: Branding */}
        <Link href="/" className="text-xl font-bold tracking-widest uppercase text-black hover:opacity-60 transition-opacity">
          COLIN GUEST
        </Link>

        {/* CENTER: Editorial Navigation */}
        <div className="hidden md:flex gap-12 text-[10px] tracking-[0.2em] uppercase font-bold">
          <Link 
            href="/" 
            className={`transition-colors hover:text-black ${pathname === '/' ? 'text-black border-b border-black pb-1' : 'text-black/40'}`}
          >
            The Lookbook
          </Link>
          <Link 
            href="/collections" 
            className={`transition-colors hover:text-black ${pathname.startsWith('/collections') ? 'text-black border-b border-black pb-1' : 'text-black/40'}`}
          >
            Collections
          </Link>
        </div>

        {/* RIGHT: Constant Icons Cluster */}
        <div className="flex items-center gap-6 text-xs font-semibold tracking-widest uppercase">
          <Search size={18} className="cursor-pointer text-black/40 hover:text-black transition-colors" />
          
          <Link href="/login" className="cursor-pointer block text-black/40 hover:text-black transition-colors">
            <User size={18} strokeWidth={1.5} />
          </Link>

          <Link href="/wishlist" className="cursor-pointer block relative text-black/40 hover:text-black transition-colors">
            <Bookmark size={18} strokeWidth={1.5} />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-black rounded-full" />
            )}
          </Link>

          <div 
            className="flex items-center gap-2 cursor-pointer text-black/40 hover:text-black transition-colors" 
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
