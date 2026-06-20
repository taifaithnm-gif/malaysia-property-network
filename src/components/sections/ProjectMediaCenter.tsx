"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import {
  getMediaImageAlt,
  getMediaSectionDesc,
  getMediaSectionTitle,
  type MediaCenterContent,
} from "@/lib/i18n/get-media-center";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading, Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

type ProjectMediaCenterProps = {
  locale: Locale;
  dict: Dictionary;
  content: MediaCenterContent & { projectSlug?: string };
};

export function ProjectMediaCenter({ locale, dict, content }: ProjectMediaCenterProps) {
  const [activeSection, setActiveSection] = useState<string>("all");

  const visibleSections = useMemo(() => {
    if (activeSection === "all") return content.sections;
    return content.sections.filter((s) => s.id === activeSection);
  }, [activeSection, content.sections]);

  const visibleCount = visibleSections.reduce((n, s) => n + s.images.length, 0);
  const projectSlug = content.projectSlug;
  const projectPageLabel =
    "projectPage" in content.labels
      ? (content.labels as { projectPage?: string }).projectPage
      : undefined;

  return (
    <>
      <Hero
        locale={locale}
        dict={dict}
        title={content.title}
        subtitle={content.subtitle}
        description={content.intro}
        showCta={false}
      />
      <section className="border-b border-gray-100 bg-teal-50 py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 px-4 sm:px-6">
          <span className="text-sm font-medium text-navy-900">
            {content.totalImages} {content.labels.imageCount}
          </span>
          <Button href={`/${locale}/book-viewing`} variant="primary">
            {content.labels.bookViewing}
          </Button>
          {projectSlug && projectPageLabel && (
            <Button href={`/${locale}/${projectSlug}`} variant="outline">
              {projectPageLabel}
            </Button>
          )}
          <WhatsAppButton label={dict.common.whatsappUs} />
        </div>
      </section>
      <section className="border-b border-gray-100 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveSection("all")}
              className={`rounded-full px-4 py-2 text-sm font-medium ${activeSection === "all" ? "bg-teal-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              {content.labels.allSections}
            </button>
            {content.sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveSection(section.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium ${activeSection === section.id ? "bg-teal-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                {getMediaSectionTitle(section, locale)} ({section.images.length})
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Showing {visibleCount} {content.labels.imageCount}
          </p>
        </div>
      </section>
      {visibleSections.map((section) => (
        <section key={section.id} className="border-b border-gray-100 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title={getMediaSectionTitle(section, locale)}
              subtitle={getMediaSectionDesc(section, locale)}
              align="left"
            />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {section.images.map((image) => (
                <div
                  key={image.src}
                  className="relative aspect-square overflow-hidden rounded-lg bg-gray-100"
                >
                  <Image
                    src={image.src}
                    alt={getMediaImageAlt(image, locale)}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 20vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Link
            href={`/${locale}/book-viewing`}
            className="font-semibold text-teal-700 hover:underline"
          >
            → {content.labels.bookViewing}
          </Link>
        </div>
      </section>
    </>
  );
}
