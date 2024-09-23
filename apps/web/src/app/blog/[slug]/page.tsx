import ShareButton from "@/components/share";
import Wrapper from "@/components/wrapper";
import { formatDate } from "@/helper/formatDate";
import { getBlogSlug, getBlogs } from "@/lib/blog";
import Link from "next/link";

export const revalidate = 3600;

export const generateStaticParams = async () => {
    const { blogs } = await getBlogs();

    return blogs.map((blog: any) => ({
        params: {
            slug: blog?.slug,
        },
    }));
};

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const { blog } = await getBlogSlug(params.slug);

    return {
        title: blog?.title,
        description: blog?.title,
        authors: blog?.author.name,
        openGraph: {
            images: [blog?.image],
        },
        price: blog?.price,
        type: blog?.type == 'Paid' ? '' : 'Free',
        seat: blog?.availableSeats,
        slug: blog?.slug,
    };
}


const formatToRupiah = (value: string | number): string => {
    const numericValue = typeof value === "string" ? parseFloat(value) : value;
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(numericValue);
};

export default async function BlogDetail({ params }: { params: { slug: string } }) {
    const { blog } = await getBlogSlug(params.slug);
    return (
        <Wrapper>
            <div className="flex">
                <div className="flex-1 sticky max-md:hidden top-[100px] h-full">
                    <Link href={`/`} className="flex items-center gap-2">
                        <svg
                            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 5H1m0 0 4 4M1 5l4-4"
                            />
                        </svg>
                        back
                    </Link>

                    <ShareButton slug={blog?.slug} className="mt-5" />
                </div>
                <div className="flex-[2] pr-52 max-lg:pr-0">
                    <h5 className="mb-2 text-[32px] max-md:text-[24px] font-bold tracking-tight text-gray-900 dark:text-black">
                        {blog?.title}
                    </h5>
                    <div className="flex gap-1">
                        <p className="font-bold text-[18px] max-md:text-[14px]">{blog?.author.name}</p>
                        ∙
                        <p className="text-[18px] max-md:text-[14px]">{formatDate(blog?.createdAt)}</p>
                    </div>
                    <ShareButton slug={blog?.slug} className="hidden max-md:block" />
                    <img
                        className="h-[350px] max-sm:h-[200px] max-md:h-[300px] w-full my-5 shadow"
                        src={blog?.image}
                        alt={blog?.title}
                    />
                    <div>{blog?.content}</div>

                    
                    <div className="text-[18px] max-md:text-[14px]">
                        {formatToRupiah(blog?.price)}
                    </div>
                    <div className="text-[18px] max-md:text-[14px]">{blog?.type == 'Free' ? '' : 'Free'}</div>
                    <div>
                        <Link href={`/pages/book/${blog?.slug}`}>
                            <button>Book Event!</button>
                        </Link>
                    </div>

                    <div>
                        <button>Have referrals? Click Here!</button>
                    </div>
                    <div>
                        <button>Review The Event!</button>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}
