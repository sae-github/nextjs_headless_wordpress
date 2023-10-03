import { Box } from '@kuma-ui/core'
import Image from 'next/image'

export default function Loading() {
  return (
    <Box textAlign='center'>
      <Image src='/loading.gif' alt='...Loading' />
    </Box>
  )
}
