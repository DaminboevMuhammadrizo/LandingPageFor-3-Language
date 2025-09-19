import { notFound } from 'next/navigation';
import '../globals.css';

const locales = ['uz', 'ru', 'en'];

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default function LocaleLayout({ children, params: { locale } }: LocaleLayoutProps): React.ReactElement  {
  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        {children}
      </body>
    </html>
  );
}

export async function generateStaticParams(): Promise<{ locale: string }[]> {
  return locales.map((locale) => ({ locale }));
}
