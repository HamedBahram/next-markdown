import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'

const markdownToHtml = async markdown => {
    const result = await remark().use(remarkGfm).use(html).process(markdown)
    return result.toString()
}

export default markdownToHtml
