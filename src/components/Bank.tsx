"use client";
import { getTranslations, type Locale } from "@/lib/i18n";
import Image from "next/image";
import { useEffect, useState } from "react";

interface BankProps {
  locale: string;
}

function Bank({ locale }: BankProps) {
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

  const features = [
    {
      icon: "/img/icon-budgeting.svg",
      title: t("section.features.budgeting.title"),
      description: t("section.features.budgeting.description")
    },
    {
      icon: "/img/icon-onboarding.svg",
      title: t("section.features.onboarding.title"),
      description: t("section.features.onboarding.description")
    },
    {
      icon: "/img/icon-api.svg",
      title: t("section.features.api.title"),
      description: t("section.features.api.description")
    },
    {
      icon: "/img/icon-online.svg",
      title: t("section.features.online.title"),
      description: t("section.features.online.description")
    }
  ];

  return (
    <section className="py-16 bg-white text-gray-700">
      <div className="max-w-[1200px] mx-auto px-4 text-center">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">{t("section.whyChoose")}</h1>
        <p className="text-gray-500 max-w-2xl mx-auto mb-12">
          {t("section.whyChooseDescription")}
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-start space-y-4">
              <Image src={feature.icon} width={70} height={70} alt={`${feature.title} Icon`} />
              <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
              <p className="text-sm text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Bank;
