import { useId } from 'react'
import { type Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Offices } from '@/components/Offices'
import { PageIntro } from '@/components/PageIntro'
import { SocialMedia } from '@/components/SocialMedia'

function TextInput({
  label,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & { label: string }) {
  let id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <input
        type="text"
        id={id}
        {...props}
        placeholder=" "
        className="peer block w-full border border-neutral-300 bg-transparent px-6 pt-12 pb-4 text-base/6 text-neutral-950 ring-4 ring-transparent transition group-first:rounded-t-2xl group-last:rounded-b-2xl focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-hidden"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-1/2 left-6 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-neutral-950 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950"
      >
        {label}
      </label>
    </div>
  )
}

function RadioInput({
  label,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & { label: string }) {
  return (
    <label className="flex gap-x-3">
      <input
        type="radio"
        {...props}
        className="h-6 w-6 flex-none appearance-none rounded-full border border-neutral-950/20 outline-hidden checked:border-[0.5rem] checked:border-neutral-950 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
      />
      <span className="text-base/6 text-neutral-950">{label}</span>
    </label>
  )
}

function ContactForm() {
  // async function sendData(formData: FormData) {
  //   'use server'

  //   let data = Object.fromEntries(formData.entries())
  //   formData.entries().forEach(([key, value]) => {
  //     if (key.startsWith('$')) {
  //       delete data[key]
  //     }
  //   })

  //   // TODO: send data to registry later
  //   console.log(data)

  //   redirect('/process')
  // }

  // action={sendData}
  return (
    <FadeIn className="lg:order-last">
      <form>
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Faoliyat bo‘yicha so‘rovlar
        </h2>
        <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
          <TextInput label="Ism" name="name" autoComplete="name" />
          <TextInput
            label="Elektron pochta"
            type="email"
            name="email"
            autoComplete="email"
          />
          <TextInput
            label="Hamjamiyat"
            name="company"
            autoComplete="organization"
          />
          <TextInput
            label="Telefon raqam"
            type="tel"
            name="phone"
            autoComplete="tel"
          />
          <TextInput label="Xabar" name="message" />
          <div className="border border-neutral-300 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl">
            <fieldset>
              <legend className="text-base/6 text-neutral-500">
                Auditoriya
              </legend>
              <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <RadioInput label="0 – 100" name="budget" value="100" />
                <RadioInput label="100 – 500" name="budget" value="500" />
                <RadioInput label="500 – 1000" name="budget" value="1000" />
                <RadioInput label="1000 dan ko'p" name="budget" value="1000+" />
              </div>
            </fieldset>
          </div>
        </div>
        <Button type="submit" className="mt-10">
          Keling, birga ishlaymiz
        </Button>
      </form>
    </FadeIn>
  )
}

function ContactDetails() {
  return (
    <FadeIn>
      <h2 className="font-display text-base font-semibold text-neutral-950">
        Bizning ofislarimiz
      </h2>
      <p className="mt-6 text-base text-neutral-600">
        Yuz-ma yuz ishlashni afzal ko'rasizmi? Unda bizni ushbu keltirilgan
        manzil bo'yicha topishingiz mumkin!
      </p>

      <Offices className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2" />

      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Bizga elektron pochta yo'llang
        </h2>
        <dl className="mt-6 grid grid-cols-1 gap-8 text-sm sm:grid-cols-2">
          {[
            ['Rais', 'maintainers@floss.uz'],
            ['Qo‘llab-quvvatlash', 'support@floss.uz'],
          ].map(([label, email]) => (
            <div key={email}>
              <dt className="font-semibold text-neutral-950">{label}</dt>
              <dd>
                <Link
                  href={`mailto:${email}`}
                  className="text-neutral-600 hover:text-neutral-950"
                >
                  {email}
                </Link>
              </dd>
            </div>
          ))}
        </dl>
      </Border>

      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Bizni kuzatib boring
        </h2>
        <SocialMedia className="mt-6" />
      </Border>
    </FadeIn>
  )
}

export const metadata: Metadata = {
  title: 'Biz bilan bog‘laning',
  description: 'Keling, birga ishlaylik. Sizdan xabar kutib qolamiz.',
}

export default function Contact() {
  return (
    <>
      <PageIntro eyebrow="Biz bilan bog‘laning" title="Keling, birga ishlaylik">
        <p>Sizdan xabar kutib qolamiz.</p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
          <ContactForm />
          <ContactDetails />
        </div>
      </Container>
    </>
  )
}
