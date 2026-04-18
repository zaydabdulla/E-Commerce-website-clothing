"use client";

import { use } from "react";
import Link from "next/link";
import { models } from "@/lib/data";
import { SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/product-card";

export default function CategoryGrid({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = use(params);
  const formattedCategory = resolvedParams.category.split('-').join(' ');

  // Filter if it matches, else show all (for prototyping)
  const filteredModels = models.filter(m => m.category.toLowerCase() === formattedCategory.toLowerCase());
  const displayModels = filteredModels.length > 0 ? filteredModels : models;

  return (
    <main className="min-h-screen bg-white text-black font-sans relative">


      <div className="pt-32 px-8 max-w-[1800px] mx-auto pb-24">
        
        {/* Top Header Row */}
        <div className="flex justify-between items-center mb-12">
           <h1 className="text-sm font-bold uppercase tracking-widest capitalize">{formattedCategory}</h1>
           <button className="flex items-center gap-3 border border-black/10 rounded-full px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:border-black transition">
             <SlidersHorizontal size={14} /> Advance Filters
           </button>
        </div>

        {/* Dense Grid with Interactive Cards */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {displayModels.map((product, i) => (
              <ProductCard product={product} index={i} key={product.id} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
