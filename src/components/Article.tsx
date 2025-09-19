"use client";
import { getTranslations, type Locale } from "@/lib/i18n";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ArticleProps {
  locale: string;
}

function Article({ locale }: ArticleProps) {
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

  const articles = [
    {
      image: "/img/image-currency.jpg",
      author: "Claire Robinson",
      title: t("articles.article1.title"),
      description: t("articles.article1.description")
    },
    {
      image: "/img/image-currency.jpg",
      author: "Wilson Hutton",
      title: t("articles.article2.title"),
      description: t("articles.article2.description")
    },
    {
      image: "/img/image-currency.jpg",
      author: "Wilson Hutton",
      title: t("articles.article3.title"),
      description: t("articles.article3.description")
    },
    {
      image: "/img/image-currency.jpg",
      author: "Claire Robinson",
      title: t("articles.article4.title"),
      description: t("articles.article4.description")
    }
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-10 text-gray-800">{t("articles.title")}</h1>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {articles.map((article, index) => (
            <div key={index} className="bg-white rounded-md overflow-hidden shadow hover:shadow-lg transition duration-300">
              <Image
                src={article.image}
                width={400}
                height={300}
                alt="article image"
                className="w-full object-cover"
              />
              <div className="p-5">
                <p className="text-sm text-gray-500 mb-2">{article.author}</p>
                 <h2 className="font-semibold text-lg mb-3 hover:text-blue-600 cursor-pointer">
                  {t("articles.article.heading")}
                </h2>
                <p className="text-gray-600 text-sm">
                  {t("articles.article.description")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Article;
