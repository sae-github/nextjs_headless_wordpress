import { Box, Text } from '@kuma-ui/core'
import Link from 'next/link'

export default async function NotFound() {
  return (
    <Box padding='2rem' textAlign='center'>
      <title>Not Found | Sae/note</title>
      <Text fontWeight='bold' fontSize='1.8rem'>
        Not Found
      </Text>
      <p>お探しのページは見つかりませんでした</p>
      <Link href='/'>トップに戻る</Link>
    </Box>
  )
}
