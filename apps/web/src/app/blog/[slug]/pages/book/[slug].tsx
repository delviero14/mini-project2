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

<Wrapper>
<div className="flex">
    <div>
        <div>
            <Link href={`/blog`}>
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