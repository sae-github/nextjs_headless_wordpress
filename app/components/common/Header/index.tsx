import { Heading } from '@kuma-ui/core'
import Link from 'next/link'
import React from 'react'

export const Header = () => (
  <header>
    <Heading as='h1' fontSize='1.8rem' margin='0px' padding='.8rem 0'>
      <Link href='/' style={{ textDecoration: 'none', color: '#ccc' }}>
        Sae/note
      </Link>
    </Heading>
  </header>
)
