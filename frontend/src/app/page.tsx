'use client';

/**
 * Home Page - Modern Design
 * Beautiful landing page with hero section and featured products
 */

import { useEffect, useState } from 'react';
import { Product } from '@/types/product';
import { LandingContent } from '@/types/content';
import { productApi } from '@/services/api/productApi';
import { contentService } from '@/services/contentService';
import ProductGrid from './components/products/ProductGrid';
import Header from './components/layout/Header';
import Link from 'next/link';
import HeroCanvas from './components/animations/HeroCanvas';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [landingContent, setLandingContent] = useState<LandingContent | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [products, content] = await Promise.all([
        productApi.getFeaturedProducts(8),
        contentService.getLandingContent(),
      ]);
      setFeaturedProducts(products);
      setLandingContent(content);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />

      <main className="relative overflow-hidden bg-white">
        {/* Hero */}
        <section className="relative min-h-[90vh] bg-black text-white fashion-aurora overflow-hidden">
          <HeroCanvas density={240} speed={1.45} />


          <div className="relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 space-y-16">
              <div className="relative">
                {/* <HeroCanvas density={240} speed={1.45} /> */}
                <div className="relative overflow-hidden rounded-[48px] border border-white/20 bg-white/5 shadow-[0_45px_95px_-45px_rgba(59,130,246,0.65)]">
                  {/* <img
                    src="/product3.png"
                    alt={landingContent?.hero.collageCaption || 'Runway atelier spotlight'}
                    className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[520px]"
                  /> */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-slate-950/85" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.45em] text-white/70">registry spotlight</p>
                      <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-white">
                        {landingContent?.hero.collageCaption || 'Obsidian Light AW25'}
                      </h2>
                    </div>
                    <span className="text-[11px] uppercase tracking-[0.35em] text-white/60">
                      {landingContent?.hero.gallery?.length
                        ? `${landingContent.hero.gallery.length} frames • animated`
                        : 'curated motion canvas'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_320px] items-end">
                <div>
                  <span className="inline-flex items-center gap-3 text-xs tracking-[0.6em] uppercase text-white/70">
                    {landingContent?.hero.eyebrow || 'atelier capsule'}
                  </span>
                  <h1 className="mt-6 text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight">
                    {landingContent?.hero.titlePrimary || 'Stories from the'}
                    <span className="block bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-100 text-transparent bg-clip-text">
                      {landingContent?.hero.titleHighlight || 'midnight atelier'}
                    </span>
                  </h1>
                  <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
                    {landingContent?.hero.description ||
                      'Discover luminous tailoring and electric evening wear from our atelier.'}
                  </p>
                  <div className="mt-10 flex flex-wrap gap-4">
                    <Link
                      href={landingContent?.hero.primaryCta.href || '/products'}
                      className="px-8 py-3 rounded-full bg-white text-gray-900 font-semibold uppercase text-xs tracking-[0.4em] button-ripple fashion-sparkle"
                    >
                      {landingContent?.hero.primaryCta.label || 'Explore Runway Edit'}
                    </Link>
                    <Link
                      href={landingContent?.hero.secondaryCta.href || '/products'}
                      className="px-8 py-3 rounded-full border border-white/50 text-white font-semibold uppercase text-xs tracking-[0.3em] hover:bg-white/10 transition-all"
                    >
                      {landingContent?.hero.secondaryCta.label || 'Accessory Vault'}
                    </Link>
                  </div>

                  <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm uppercase tracking-[0.3em] text-white/70">
                    {(landingContent?.hero.stats || []).map((stat) => (
                      <div key={stat.label} className="fashion-floating-card">
                        <p className="text-xs font-semibold text-white/50">{stat.label}</p>
                        <p className="mt-2 text-3xl md:text-4xl font-semibold text-white">{stat.value}</p>
                        <p className="mt-2 text-white/60">{stat.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="hidden lg:flex flex-col gap-6">
                  <div className="relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur fashion-tilt">
                    <img
                      src={
                        landingContent?.hero.collageImage ||
                        landingContent?.hero.gallery?.[1] ||
                        'https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=800&q=80'
                      }
                      alt={landingContent?.hero.collageCaption || 'Lookbook collage'}
                      className="h-72 w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/70" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-xs uppercase tracking-[0.4em] text-white/70">lookbook</p>
                      <h3 className="mt-3 text-2xl font-semibold">
                        {landingContent?.hero.collageCaption || 'Obsidian Light AW25'}
                      </h3>
                    </div>
                  </div>
                  <div className="rounded-3xl border border-white/10 p-6 bg-white/5 backdrop-blur">
                    <p className="uppercase text-xs tracking-[0.4em] text-white/60">palette</p>
                    <div className="mt-4 flex gap-3">
                      {(landingContent?.hero.palette || ['#0f172a', '#312e81', '#e11d48', '#fcd34d']).map((swatch, index) => (
                        <div key={swatch} className="flex-1">
                          <div className="h-12 rounded-full" style={{ backgroundColor: swatch }} />
                          <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-white/50">
                            {(landingContent?.hero.paletteLabels || [])[index] || swatch.replace('#', '')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {landingContent?.hero.gallery && landingContent.hero.gallery.length > 0 && (
                    <div className="grid grid-cols-3 gap-3 rounded-[24px] border border-white/10 bg-white/5 p-3">
                      {landingContent.hero.gallery.slice(0, 6).map((image, index) => (
                        <div
                          key={image}
                          className={`relative overflow-hidden rounded-[18px] ${index % 3 === 0 ? 'col-span-2 h-32' : 'h-32'
                            }`}
                        >
                          <img
                            src={image}
                            alt={`Runway gallery ${index + 1}`}
                            className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-16 border-t border-white/10 pt-8">
                <div className="fashion-marquee">
                  <div className="fashion-marquee-track">
                    {(landingContent?.marqueeLabels || []).concat(landingContent?.marqueeLabels || []).map((label, index) => (
                      <span key={`${label}-${index}`} className="text-xs uppercase tracking-[0.6em] text-white/50">
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Highlight Collections */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div>
                <p className="text-xs uppercase tracking-[0.45em] text-gray-500">capsule highlight</p>
                <h2 className="mt-4 text-3xl md:text-5xl font-bold text-gray-900">
                  Curated collections with couture calibre
                </h2>
                <p className="mt-4 text-gray-500 max-w-2xl">
                  Each capsule is hand-curated by our styling studio, featuring limited-run garments, bespoke
                  tailoring, and directional accessories for modern wardrobes.
                </p>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-gray-900 text-gray-900 uppercase tracking-[0.4em] text-xs hover:bg-gray-900 hover:text-white transition-all"
              >
                View showroom
                <span aria-hidden>↗</span>
              </Link>
            </div>

            <div className="mt-16 grid gap-8 lg:grid-cols-3">
              {(landingContent?.highlightCollections || []).map((collection) => (
                <Link
                  key={collection.title}
                  href={collection.href}
                  className="group relative overflow-hidden rounded-[32px] fashion-tilt fashion-floating-card"
                >
                  <div className="absolute inset-0">
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/80" />
                  </div>
                  <div className="relative p-10 flex flex-col justify-end min-h-[420px]">
                    <span className="inline-flex w-fit rounded-full bg-white/15 backdrop-blur px-4 py-2 text-xs uppercase tracking-[0.4em] text-white">
                      {collection.badge}
                    </span>
                    <h3 className="mt-6 text-3xl font-semibold text-white">{collection.title}</h3>
                    <p className="mt-3 text-white/80 text-sm leading-relaxed">
                      {collection.description}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white">
                      discover the edit
                      <span className="text-lg">→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="relative py-24 bg-slate-950 text-white overflow-hidden">
          <div className="absolute inset-y-10 inset-x-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.2),transparent_55%)]" />
          <div className="absolute right-20 -top-12 w-60 h-60 bg-white/10 rounded-full blur-3xl fashion-floating-card" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div>
                <p className="text-xs uppercase tracking-[0.45em] text-white/50">spotlight</p>
                <h2 className="mt-3 text-3xl md:text-5xl font-bold">
                  Trending pieces for the new season
                </h2>
              </div>
              <p className="text-white/70 max-w-xl">
                Curated silhouettes in luminous textures, sculpted denim, and precision-layered knitwear,
                updated weekly directly from our atelier and partnering houses.
              </p>
            </div>

            <div className="mt-12">
              <ProductGrid products={featuredProducts} loading={loading} />
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/products"
                className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-white text-gray-900 uppercase tracking-[0.4em] text-xs hover:bg-white/90 transition-all"
              >
                Full catalogue
                <span aria-hidden>↗</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Editorial Stories */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div>
                <p className="text-xs uppercase tracking-[0.45em] text-gray-500">editorial journal</p>
                <h2 className="mt-4 text-3xl md:text-5xl font-bold text-gray-900">
                  Notes from the runway and beyond
                </h2>
              </div>
              <Link
                href="/categories"
                className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-gray-900"
              >
                explore archives
                <span aria-hidden>→</span>
              </Link>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {(landingContent?.editorialStories || []).map((story) => (
                <article
                  key={story.title}
                  className="relative rounded-[28px] overflow-hidden border border-gray-100 group fashion-tilt"
                >
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <span className="absolute bottom-4 left-4 inline-flex items-center px-4 py-2 rounded-full bg-white/15 backdrop-blur text-xs uppercase tracking-[0.4em] text-white">
                      {story.tag}
                    </span>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-semibold text-gray-900">{story.title}</h3>
                    <p className="mt-4 text-gray-500 leading-relaxed">{story.excerpt}</p>
                    <div className="mt-6 inline-flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-gray-900">
                      read story
                      <span aria-hidden>→</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Runway Mosaic */}
        {landingContent?.hero.gallery && (
          <section className="py-24 bg-slate-950 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.45em] text-white/50">visual archive</p>
                  <h2 className="mt-3 text-3xl md:text-5xl font-semibold leading-tight">
                    Runway moments captured in the atelier registry
                  </h2>
                </div>
                <p className="text-sm text-white/60 max-w-xl">
                  Every capsule is documented and composited in our registry using looks from across the edit—reflective denim, velvet tailoring, architectural silhouettes, and experimental colour stories.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {landingContent.hero.gallery.map((image, index) => (
                  <div
                    key={image}
                    className={`relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur ${index % 5 === 0 ? 'md:col-span-2 h-80' : 'h-64'
                      }`}
                  >
                    <img
                      src={image}
                      alt={`Registry look ${index + 1}`}
                      className="h-full w-full object-cover transition-transform duration-[1400ms] hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/65" />
                    <span className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.35em] text-white/60">
                      Look {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Newsletter */}
        <section className="relative py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-950" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_60%)]" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <span className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.45em] text-white/60">
              {landingContent?.newsletter.eyebrow || 'private invitation'}
            </span>
            <h2 className="mt-6 text-3xl md:text-5xl font-bold">
              {landingContent?.newsletter.title || 'Join the atelier circle'}
            </h2>
            <p className="mt-4 text-white/70 max-w-2xl mx-auto">
              {landingContent?.newsletter.description ||
                'Receive first access to capsule releases, atelier fittings, and private runway screenings curated by our creative directors.'}
            </p>
            <form className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                required
                placeholder={landingContent?.newsletter.placeholder || 'Email for invitations'}
                className="w-full sm:w-80 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-4 focus:ring-white/20"
              />
              <button
                type="submit"
                className="px-8 py-3 rounded-full bg-white text-gray-900 uppercase tracking-[0.4em] text-xs hover:bg-white/90 transition-all button-ripple"
              >
                {landingContent?.newsletter.ctaLabel || 'Request access'}
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
