import { styled } from '@kuma-ui/core'
import React, { FC } from 'react'

const getAllCategories = async () => {
  const res = await fetch('https://itosae.com/wp-json/wp/v2/categories?_fields=name,slug,id')
  if (!res.ok) throw new Error('Failed to fetch data')
  return res.json()
}

const getCategories = (categories: Category[], ids: number[]) =>
  categories.filter((category) => ids.includes(category.id))

export const Tags: FC<{ categoryIds: number[] }> = async ({ categoryIds }) => {
  const allCategories = await getAllCategories()
  return (
    allCategories &&
    getCategories(allCategories, categoryIds).map((category) => (
      <Tag key={category.id}>#{category.name}</Tag>
    ))
  )
}

type Category = {
  name: string
  id: number
  slug: string
}

const Tag = styled('span')`
  text-align: center;
  color: gray;
`
