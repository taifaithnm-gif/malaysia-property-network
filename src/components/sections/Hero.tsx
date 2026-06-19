import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

type HeroProps = {
  locale: Locale;
  dict: Dictionary;
  title?: string;
  subtitle?: string;
  description?: string;
  showCta?: boolean;
};

export function Hero({
  locale,
  dict,
  title,
  subtitle,
  description,
  showCta = true,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-teal-900 text-white">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-teal-400 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-teal-600 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-teal-300">
            {subtitle ?? dict.home.heroSubtitle}
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {title ?? dict.home.heroTitle}
          </h1>
          <p className="mt-6 text-lg text-gray-300 leading-relaxed">
            {description ?? dict.home.heroDescription}
          </p>
          {showCta && (
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href={`/${locale}/contact`} variant="primary" size="lg">
                {dict.common.getStarted}
              </Button>
              <WhatsAppButton label={dict.common.whatsappUs} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
