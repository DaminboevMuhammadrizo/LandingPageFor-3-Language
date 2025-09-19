"use client";
import { getTranslations, locales, type Locale } from "@/lib/i18n";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const router = useRouter();
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

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    router.push(`/${selectedLang}`);
  };

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
    <header className="shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] w-full h-[100px] flex items-center bg-white top-0 left-0 right-0">
      <div className="container mx-auto px-4 flex justify-between items-center h-full max-w-[1200px]">
        {/* Logo */}
        <div className="flex items-center">
          <Image src="/img/logo-dark.svg" width={200} height={140} alt={t("logo")} />
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8 text-gray-700 font-medium text-[16px]">
          <a href="#" className="hover:text-blue-600 transition">{t("header.nav.home")}</a>
          <a href="#" className="hover:text-blue-600 transition">{t("header.nav.about")}</a>
          <a href="#" className="hover:text-blue-600 transition">{t("header.nav.contact")}</a>
          <a href="#" className="hover:text-blue-600 transition">{t("header.nav.blog")}</a>
          <a href="#" className="hover:text-blue-600 transition">{t("header.nav.careers")}</a>
        </nav>

        {/* Language Selector and Button */}
        <div className="hidden md:flex items-center space-x-4">
          <select
            value={locale}
            onChange={changeLanguage}
            className="border border-gray-300 rounded px-2 py-1 text-gray-700 focus:outline-none"
          >
            {locales.map((lng) => (
              <option key={lng} value={lng}>
                {lng.toUpperCase()}
              </option>
            ))}
          </select>
          <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-full hover:opacity-90 transition">
            {t("requestInvite")}
          </button>
        </div>

        {/* Mobile hamburger icon */}
        <div className="md:hidden">
          <button className="text-gray-700 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
