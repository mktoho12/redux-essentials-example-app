import Link from 'next/link'
import React from 'react'

export const Navbar = () => {
  return (
    <nav>
      <section>
        <h1 className="font-[600]">Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link href="/">
              <a>Posts</a>
            </Link>
          </div>
        </div>
      </section>
    </nav>
  )
}
