"use client";
import { getTranslations, type Locale } from "@/lib/i18n";
import Image from "next/image";
import { useEffect, useState } from "react";

interface HeroProps {
  locale: string;
}

function Hero({ locale }: HeroProps) {
  const [translations, setTranslations] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const t = await getTranslations(locale as Locale);
        setTranslations(t);
      } catch (error) {
        console.error('Translation yuklashda xatolik:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTranslations();
  }, [locale]);

  const t = (key: string): string => {
  const result = key
    .split('.')
    .reduce((obj, k) => {
      if (typeof obj === 'object' && obj !== null && k in obj) {
        return (obj as Record<string, unknown>)[k];
      }
      return undefined;
    }, translations as unknown) as string;

    return result || key;
  };


  if (loading) {
    return <div>Yuklanmoqda...</div>;
  }

  return (
    <section className="relative bg-[#f4f5f7] overflow-hidden min-h-[600px] lg:min-h-[700px]">
      <div className="max-w-[1200px] mx-auto px-4 flex flex-col-reverse lg:flex-row items-center justify-between pt-10 lg:pt-28 relative z-10">
        {/* Text Side */}
        <div className="text-center lg:text-left max-w-xl z-20">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2d314d] leading-tight mb-6">
            {t("hero.title")}
          </h1>
          <p className="text-gray-500 mb-8 text-base md:text-lg">
            {t("hero.description")}
          </p>
          <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition">
            {t("requestInvite")}
          </button>
        </div>

        {/* Phones Image container */}
        <div className="relative w-full max-w-[600px] h-[600px] lg:h-[600px] z-20 overflow-visible">
          <div className="absolute top-[-200px] right-[-600px] w-[1000px] h-[900px]">
            <Image
              src="/img/image-mockups.png"
              alt="phones"
              fill
              className="object-contain pointer-events-none"
              priority
            />
          </div>
        </div>
      </div>

      {/* Background shape */}
      <div className="absolute top-[-100px] right-[-150px] w-[900px] h-[900px] z-0">
        <Image
          src="/img/bg-intro-desktop.svg"
          alt="background"
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
}

export default Hero;
