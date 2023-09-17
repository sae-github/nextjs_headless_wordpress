import { Box, styled } from '@kuma-ui/core'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import gitHubIcon from '@/public/github.png'
import icon from '@/public/user.svg'
import xIcon from '@/public/x.png'

export const AdminsArea = () => (
  <Box padding='0 1rem'>
    <Box margin='0 auto' textAlign='center'>
      <Image src={icon} alt='' width={60} height={60} />
    </Box>
    <Name>Ito Sae</Name>
    <Description>(ﾌﾛﾝﾄｴﾝﾄﾞｴﾝｼﾞﾆｱ)</Description>
    <Meta>
      <Link href='https://twitter.com/sae_prog' target='_blank' style={{ display: 'inline-block' }}>
        <Image src={xIcon} alt='' width={20} height={20} />
      </Link>
      <Link
        href='https://github.com/sae-github'
        target='_blank'
        style={{ display: 'inline-block' }}
      >
        <Image src={gitHubIcon} alt='' width={20} height={20} />
      </Link>
    </Meta>
  </Box>
)

export const Meta = styled('div')`
  gap: 8px;
  display: flex;
  justify-content: center;
  margin-top: 8px;

  a:hover {
    opacity: 0.7;
  }
`

export const Name = styled('span')`
  text-align: center;
  display: block;
  margin-top: 8px;
  color: gray;
`

export const Description = styled('span')`
  text-align: center;
  display: block;
  color: gray;
`
