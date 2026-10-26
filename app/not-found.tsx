import Link from 'next/link'
import { buttonClasses } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-[80svh] flex-col items-start justify-center px-5 pt-28 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-page">
        <h1 className="font-display text-display font-bold stretch-condensed uppercase text-bone">404</h1>
        <p className="mt-4 max-w-[40ch] font-body text-lead text-dim">
          That page doesn’t exist. It may have moved, or the link is mistyped.
        </p>
        <Link href="/" className={`${buttonClasses('primary')} mt-8`}>
          Back to the portfolio
        </Link>
      </div>
    </main>
  )
}
