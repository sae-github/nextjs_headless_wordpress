'use client'
import { Box, Text } from '@kuma-ui/core'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Box padding='2rem' textAlign='center'>
      <Text fontWeight='bold' fontSize='1.8rem'>
        Something went wrong...
      </Text>
      <p>何らかの原因でエラーが発生しました</p>
      <Link href='/'>トップに戻る</Link>
    </Box>
  )
}
