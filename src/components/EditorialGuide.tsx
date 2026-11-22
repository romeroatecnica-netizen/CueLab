import React, {useState} from 'react';
import {BookOpen, ChevronDown, ExternalLink} from 'lucide-react';
import type {EditorialContent} from '../i18n/editorialTranslations';

interface EditorialGuideProps {
  content: EditorialContent;
}

export const EditorialGuide: React.FC<EditorialGuideProps> = ({content}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="space-y-14">
      {/* Practical Field Guide Section */}
      <article id="guide" aria-labelledby="guide-heading" className="space-y-8">
        <div className="max-w-3xl space-y-2">
          <h2 id="guide-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {content.guideHeading}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">{content.guideLead}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {content.pillars.map((pillar) => (
            <section
              key={pillar.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 space-y-2"
            >
              <h3 className="text-base sm:text-lg font-bold text-slate-900">{pillar.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{pillar.body}</p>
            </section>
          ))}
        </div>

        {/* Baseline & Context Deep-Dive */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-3">
          <h3 className="text-xl font-bold text-slate-900">{content.baselineHeading}</h3>
          <p className="max-w-4xl text-sm sm:text-base text-slate-600 leading-relaxed">{content.baselineBody}</p>
        </section>

        {/* Common Misinterpretations Comparison Table */}
        <section className="space-y-4">
          <div className="max-w-3xl space-y-1">
            <h3 className="text-xl font-bold text-slate-900">{content.pitfallsHeading}</h3>
            <p className="text-sm text-slate-600">{content.pitfallsLead}</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full min-w-[600px] border-collapse text-start text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-semibold text-slate-700">
                  <th className="px-4 py-3 text-start">{content.pitfallsTableHeaders[0]}</th>
                  <th className="px-4 py-3 text-start">{content.pitfallsTableHeaders[1]}</th>
                  <th className="px-4 py-3 text-start">{content.pitfallsTableHeaders[2]}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {content.misconceptions.map((row) => (
                  <tr key={row.signal} className="align-top">
                    <td className="px-4 py-3.5 font-semibold text-slate-900 whitespace-nowrap">{row.signal}</td>
                    <td className="px-4 py-3.5 text-amber-800">{row.naiveMyth}</td>
                    <td className="px-4 py-3.5 text-slate-700 leading-relaxed">{row.calibratedReading}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </article>

      {/* Interactive Expandable FAQ */}
      <section id="faq" aria-labelledby="faq-heading" className="space-y-5">
        <div className="max-w-3xl space-y-1">
          <h2 id="faq-heading" className="text-2xl font-bold text-slate-900 tracking-tight">
            {content.faqHeading}
          </h2>
          <p className="text-sm text-slate-600">{content.faqLead}</p>
        </div>

        <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
          {content.faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="flex w-full min-h-[52px] items-center justify-between gap-4 px-5 py-4 text-start text-sm sm:text-base font-semibold text-slate-900 hover:bg-slate-50/70 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">{faq.answer}</div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Contextual Recommended Readings (Affiliate-Ready) */}
      <section aria-labelledby="resources-heading" className="space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-indigo-600 shrink-0" aria-hidden="true" />
            <h2 id="resources-heading" className="text-xl font-bold text-slate-900">
              {content.resourcesHeading}
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-3xl">{content.resourcesDisclosure}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.resources.map((book) => (
            <article
              key={book.title}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 space-y-3"
            >
              <div className="space-y-1.5">
                <div className="text-xs font-medium text-indigo-700">{book.focus}</div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">{book.title}</h3>
                <div className="text-xs text-slate-500">{book.author}</div>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">{book.summary}</p>
              </div>
              <a
                href={book.url}
                target="_blank"
                rel="sponsored nofollow noopener"
                className="inline-flex min-h-[38px] items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-800 transition-colors"
              >
                <span>{book.ctaLabel}</span>
                <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
