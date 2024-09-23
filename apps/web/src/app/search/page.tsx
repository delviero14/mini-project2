'use client'

import { CardBlog } from "@/components/card"
import Wrapper from "@/components/wrapper"
import { getBlogs } from "@/lib/blog"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useDebounce } from "use-debounce"

export default function SearchBlog() {
    const searchParams = useSearchParams()
    const querySearch = searchParams.get('search')
    const searchRef = useRef<HTMLInputElement | null>(null)
    const [data, setData] = useState([])
    const [search, setSearch] = useState<string>(querySearch || '')
    const [value] = useDebounce(search, 1000)
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(5)

    const handleChange = () => {
        if(searchRef.current) {
            setSearch(searchRef.current.value)
        }
    }

    const getData = async () => {
        try {
            router.push(`?search=${value}`)
            const { blogs } = await getBlogs(value)
            setData(blogs) 
            console.log(blogs)
            
        } catch (err) {
            
        }
    }
    
    useEffect(() => {
        getData()
        
    }, [value])

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(data.length / postsPerPage); i++) {
        pageNumbers.push(i)
    }

    return(
        <Wrapper>
            <div className="flex w-full justify-center">
                <input 
                    onChange={handleChange}
                    ref={searchRef}
                    defaultValue={value}
                    type="search"
                    className="border p-2 border-gray-500 h-10 w-full max-w-[500px] rounded-md"
                    placeholder="Search Events"
                 />
            </div>
            <div className="my-14">
                <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-2">
                    {
                        currentPosts.map((items: any) => {
                            return (
                                <CardBlog
                                    key={items.id}
                                    title={items.title} 
                                    slug={items.slug} 
                                    image={items.image}
                                    avatar={items.author.avatar}
                                    location={items.location || 'Location not specified'}
                                    content={items.content}
                                    price={items.price}
                                    type={items?.type } 
                                />
                            )
                        })
                    }
                </div>
                <div className="flex justify-center mt-4">
                    {pageNumbers.map(number => (
                        <button 
                            key={number} 
                            onClick={() => paginate(number)} 
                            className="mx-1 p-2 border rounded-md bg-blue-500 text-white hover:bg-blue-700"
                        >
                            {number}
                        </button>
                    ))}
                </div>
            </div>
        </Wrapper>
    )
}
