import { Html, Head, Main, NextScript } from 'next/document'
import Link from 'next/link';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className=' bg-standard-background scrollbar scrollbar-thumb-action scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
          <nav className=' flex justify-evenly z-10 w-full h-12 items-center border-b-2 fixed border-highlight  px-2 py-1 bg-medium-bacground'>
            <Link href="/" className=' hover:text-action transition-all'>Hjem</Link>
            <Link href="/create-recipe" className=' hover:text-action transition-all'>Opprett oppskrift</Link>
            <Link href="/insertIngredient">insert ingredient (temp)</Link>
            <Link href="/FAQ" className=' hover:text-action transition-all'>FAQ</Link>
          </nav>
          <Main />
          <NextScript />
      </body>
    </Html>
  )
}
