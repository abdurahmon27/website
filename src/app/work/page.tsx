import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Blockquote } from '@/components/Blockquote'
import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { Testimonial } from '@/components/Testimonial'
import { formatDate } from '@/lib/formatDate'
import { type CaseStudy, loadCaseStudies, type MDXEntry } from '@/lib/mdx'

import logoXinux from '@/images/clients/xinux/logo-dark.svg'
import logoRust from '@/images/clients/rust-uzbekistan/logo-dark.svg'
import logoDevOps from '@/images/clients/devops-journey/logo-dark.svg'
import logoScala from '@/images/clients/scala-uzbekistan/logo-dark.svg'
import logoEcma from '@/images/clients/ecma-uzbekistan/logo-dark.svg'
import logoUzbekNet from '@/images/clients/uzbek-net/logo-dark.svg'
import logoGofer from '@/images/clients/gofer-uzbekistan/logo-dark.svg'
import logoPhp from '@/images/clients/php-uzbekistan/logo-dark.svg'
import logoUzinfocom from '@/images/clients/uzinfocom-oss/logo-dark.svg'

function CaseStudies({
  caseStudies,
}: {
  caseStudies: Array<MDXEntry<CaseStudy>>
}) {
  return (
    <Container className="mt-40">
      <FadeIn>
        <h2 className="font-display text-2xl font-semibold text-neutral-950">
          Izlanishimiz
        </h2>
      </FadeIn>
      <div className="mt-10 space-y-20 sm:space-y-24 lg:space-y-32">
        {caseStudies.map((caseStudy) => (
          <FadeIn key={caseStudy.client}>
            <article>
              <Border className="grid grid-cols-3 gap-x-8 gap-y-8 pt-16">
                <div className="col-span-full sm:flex sm:items-center sm:justify-between sm:gap-x-8 lg:col-span-1 lg:block">
                  <div className="sm:flex sm:items-center sm:gap-x-6 lg:block">
                    <Image
                      src={caseStudy.logo}
                      alt=""
                      className="h-16 w-16 flex-none"
                      unoptimized
                    />
                    <h3 className="mt-6 text-sm font-semibold text-neutral-950 sm:mt-0 lg:mt-8">
                      {caseStudy.client}
                    </h3>
                  </div>
                  <div className="mt-1 flex gap-x-4 sm:mt-0 lg:block">
                    <p className="text-sm tracking-tight text-neutral-950 after:ml-4 after:font-semibold after:text-neutral-300 after:content-['/'] lg:mt-2 lg:after:hidden">
                      {caseStudy.service}
                    </p>
                    <p className="text-sm text-neutral-950 lg:mt-2">
                      <time dateTime={caseStudy.date}>
                        {formatDate(caseStudy.date)}
                      </time>
                    </p>
                  </div>
                </div>
                <div className="col-span-full lg:col-span-2 lg:max-w-2xl">
                  <p className="font-display text-4xl font-medium text-neutral-950">
                    <Link href={caseStudy.href}>{caseStudy.title}</Link>
                  </p>
                  <div className="mt-6 space-y-6 text-base text-neutral-600">
                    {caseStudy.summary.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  <div className="mt-8 flex">
                    <Button
                      href={caseStudy.href}
                      aria-label={`Read case study: ${caseStudy.client}`}
                    >
                      Izlanish haqida ko'proq
                    </Button>
                  </div>
                  {caseStudy.testimonial && (
                    <Blockquote
                      author={caseStudy.testimonial.author}
                      className="mt-12"
                    >
                      {caseStudy.testimonial.content}
                    </Blockquote>
                  )}
                </div>
              </Border>
            </article>
          </FadeIn>
        ))}
      </div>
    </Container>
  )
}

const clients = [
  ['Xinux', logoXinux, "https://github.com/xinux-org"],
  ["Rust O'zbekistan", logoRust, "https://github.com/rust-lang-uz"],
  ['DevOps Journey', logoDevOps, "https://github.com/devops-journey-uz"],
  ['Scala Uzbekistan', logoScala, "https://github.com/scala-uz"],
  ['Ecma Uzbekistan', logoEcma, "https://github.com/ecma-uz"],
  ['Uzbek Localization', logoUzbekNet, "https://github.com/uzbek-net"],
  ['Gofer Uzbekistan', logoGofer, "https://github.com/gofer-uz"],
  ['PHP Uzbekistan', logoPhp, "https://github.com/phpuzb"],
  ['Uzinfocom Open Source', logoUzinfocom, "https://github.com/uzinfocom-org"],
]

function Clients() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-2xl font-semibold text-neutral-950">
          Biz bilan birga maqsad sari intilamiz!
        </h2>
      </FadeIn>
      <FadeInStagger className="mt-10" faster>
        <Border as={FadeIn} />
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-4"
        >
          {clients.map(([client, logo, link]) => (
            <li key={client} className="group">
              <a href={link}>
                <FadeIn className="overflow-hidden">
                  <Border className="pt-12 group-nth-[-n+2]:-mt-px sm:group-nth-3:-mt-px lg:group-nth-4:-mt-px">
                    <Image src={logo} alt={client} unoptimized />
                  </Border>
                </FadeIn>
              </a>
            </li>
          ))}
        </ul>
      </FadeInStagger>
    </Container>
  )
}

export const metadata: Metadata = {
  title: 'Bizning hamjamiyatlarimiz',
  description: 'Izlanishlar sari har xil muammolarga yechim topamiz.',
}

export default async function Work() {
  let caseStudies = await loadCaseStudies()

  return (
    <>
      <PageIntro
        eyebrow="Bizning hamjamiyatlarimiz"
        title="Izlanishlar sari har xil muammolarga yechim topamiz."
      >
        <p>
          Biz ishonamizki, har bir hamjamiyat yaralishidan qandaydir maqsad
          bo'ladi va u siz hamjamiyat yashay olmaydi. Biz ham shu bilan
          birgalikda har bir hamjamiyatga yashashiga maqsad beramiz va undan
          olingan natijalarni jamiyat a'zolari bilan baham ko'ramiz.
        </p>
      </PageIntro>

      <CaseStudies caseStudies={caseStudies} />

      <Clients />

      <ContactSection />
    </>
  )
}
