import { styled } from '@kuma-ui/core'
import { JSDOM } from 'jsdom'

export const TableOfContents = ({ textHtml }: { textHtml: string }) => {
  const dom = new JSDOM(textHtml)
  const titleList = getContentTitles(dom.window.document.querySelectorAll('h2'))
  return (
    <Root>
      <Ol>
        {titleList.map((title, i) => (
          <li key={i}>
            <a href={`#title-${i.toString()}`}>
              {i + 1}.{title}
            </a>
          </li>
        ))}
      </Ol>
    </Root>
  )
}

const getContentTitles = (titles: NodeListOf<HTMLHeadingElement>) => {
  const list = []
  for (let i = 0; i < titles.length; i++) {
    list.push(titles[i].textContent)
  }
  return list
}

const Root = styled('div')`
  position: sticky;
  padding: 0 4rem;
  top: 80px;
  margin-top: 3rem;
`

const Ol = styled('ol')`
  padding-left: 0;
  list-style: none;
  li > a {
    color: #666;
    font-size: 14px;
  }
`
