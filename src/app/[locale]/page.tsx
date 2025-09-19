import Article from "@/components/Article";
import Bank from "@/components/Bank";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

interface Props {
  params: { locale: string };
}

export default function LocalePage({ params: { locale } }: Props) {
  return (
    <div className="">
      <Header locale={locale} />
      <Hero locale={locale} />
      <Bank locale={locale} />
      <Article locale={locale} />
      <Footer locale={locale} />
    </div>
  );
}
