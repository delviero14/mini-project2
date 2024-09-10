const space_id = process.env.SPACE_ID_CONTENTFUL
const token = process.env.TOKEN_CONTENTFUL
import resolveResponse from 'contentful-resolve-response'

const base_url = process.env.BASE_URL_API || "http://localhost:8000/api"

export const getBlogs = async (search: string = "") => {
    const res = await fetch(`${base_url}/blogs?search=${search}`, { next: {  revalidate: 10 } })
    const result = await res.json()

    return { result, blogs: result.blogs, ok: res.ok }
}

export const getBlogSlug = async (slug: string) => {
    const res = await fetch(`${base_url}/blogs/${slug}`, { next: {  revalidate: 3600 } })
    const result = await res.json()

    return { result, blog: result.blogs, ok: res.ok }
}