import { styled } from '@kuma-ui/core'
import Link from 'next/link'
import React, { FC } from 'react'

export const Pagination: FC<{
  totalPages: string
  currentPage: string
}> = ({ totalPages, currentPage }) => {
  return (
    <Root>
      <Link href='/1' aria-disabled={!currentPage || Number(currentPage) === 1}>
        &laquo;
      </Link>
      {[...Array(Number(totalPages))].map((_, i) => {
        return i + 1 === Number(currentPage) ? (
          <span key={i} style={{ display: 'inline-block', fontSize: '1.2rem', color: '#ccc' }}>
            {i + 1}
          </span>
        ) : (
          <Link href={`/${i + 1}`} key={i} style={{}}>
            {i + 1}
          </Link>
        )
      })}
      <Link href={`/${totalPages}`} aria-disabled={currentPage === totalPages}>
        &raquo;
      </Link>
    </Root>
  )
}

const Root = styled('div')`
  align-items: center;
  gap: 16px;
  margin-top: 1rem;
  display: flex;

  a {
    font-size: 1.2rem;
    color: #333;
  }

  a[aria-disabled='true'] {
    color: #ccc;
    cursor: auto;
    pointer-events: none;
    text-decoration: none;
  }
  a:hover {
    opacity: 0.7;
  }
`
