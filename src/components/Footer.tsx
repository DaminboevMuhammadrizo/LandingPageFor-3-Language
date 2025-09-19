"use client";
import { getTranslations, type Locale } from "@/lib/i18n";
import Image from "next/image";
import { useEffect, useState } from "react";

interface FooterProps {
  locale: string;
}

function Footer({ locale }: FooterProps) {
  const [translations, setTranslations] = useState<any>({});
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
    return key.split('.').reduce((obj, k) => obj?.[k], translations) || key;
  };

  if (loading) {
    return <div>Yuklanmoqda...</div>;
  }

  return (
    <footer className="bg-[#2D314D] text-white py-10">
      <div className="max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row justify-between items-center md:items-start space-y-10 md:space-y-0">
        {/* Logo + Social Icons */}
        <div className="flex flex-col items-center md:items-start space-y-6">
          <Image src="/img/logo-light.svg" width={150} height={40} alt={t("logo")} />
          <div className="flex space-x-4">
            <Image src="/img/icon-facebook.svg" width={20} height={20} alt="Facebook" />
            <Image src="/img/icon-youtube.svg" width={20} height={20} alt="YouTube" />
            <Image src="/img/icon-twitter.svg" width={20} height={20} alt="Twitter" />
            <Image src="/img/icon-pinterest.svg" width={20} height={20} alt="Pinterest" />
            <Image src="/img/icon-instagram.svg" width={20} height={20} alt="Instagram" />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-16 text-center md:text-left">
          <div className="space-y-3">
            <p className="hover:text-teal-300 cursor-pointer transition">{t("footer.links.aboutUs")}</p>
            <p className="hover:text-teal-300 cursor-pointer transition">{t("footer.links.contact")}</p>
            <p className="hover:text-teal-300 cursor-pointer transition">{t("footer.links.blog")}</p>
          </div>
          <div className="space-y-3">
            <p className="hover:text-teal-300 cursor-pointer transition">{t("footer.links.careers")}</p>
            <p className="hover:text-teal-300 cursor-pointer transition">{t("footer.links.support")}</p>
            <p className="hover:text-teal-300 cursor-pointer transition">{t("footer.links.privacyPolicy")}</p>
          </div>
        </div>

        {/* Button + Copyright */}
        <div className="flex flex-col items-center md:items-end space-y-4">
          <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-full hover:opacity-90 transition">
            {t("requestInvite")}
          </button>
          <p className="text-sm text-gray-300">{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
