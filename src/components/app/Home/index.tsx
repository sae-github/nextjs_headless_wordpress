import { Box, Flex, Heading, Text, VStack } from '@kuma-ui/core'
import { styled } from '@kuma-ui/core'
import Link from 'next/link'
import React from 'react'

export const HomeContent = () => {
  return (
    <Box maxWidth='60rem' margin='0 auto' paddingX='2rem'>
      <VStack justify='center' alignItems='center' gap='8px'>
        <article>
          <Heading as='h2'>
            <Link href='/' style={{ color: 'blue' }}>
              記事のタイトル
            </Link>
          </Heading>
          <Flex gap='8px'>
            <Tag>振り返り</Tag>
            <Tag>JavaScript</Tag>
            <Tag>TypeScript</Tag>
          </Flex>
          <Box>
            <Text>
              記事の内容がここに入ります。記事の内容がここに入ります。記事の内容がここに入ります。記事の内容がここに入ります。記事の内容がここに入ります。記事の内容がここに入...
              <Link href='/' style={{ color: 'blue' }}>
                続きを読む
              </Link>
            </Text>
            <small>2023.08.22</small>
          </Box>
        </article>
      </VStack>
    </Box>
  )
}

const Tag = styled('span')`
  text-align: center;
  padding: 0 8px;
  border: 1px solid #ccc;
  border-radius: 20px;
`
