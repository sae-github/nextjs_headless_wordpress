import { styled } from '@kuma-ui/core'
import Link from 'next/link'
import React, { FC } from 'react'

export const Pagination: FC<{
  totalPages: string
  currentPage: string
}> = ({ totalPages, currentPage }) => {
  return (
    <Root>
      <Link href='/1' aria-disabled={!currentPage || +currentPage === 1}>
        &laquo;
      </Link>
      {[...Array(Number(totalPages))].map((_, i) =>
        i + 1 === +currentPage ? (
          <CurrentPage key={i}>{i + 1}</CurrentPage>
        ) : (
          <Link href={`/${i + 1}`} key={i}>
            {i + 1}
          </Link>
        ),
      )}
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

const CurrentPage = styled('span')`
  display: inline-block;
  font-size: 1.2rem;
  color: #ccc;
`
