import { client,urlFor } from "@/app/lib/sanity"
import { fullBlog } from "@/app/lib/interface";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
async function getData(slug:string) {
    const query = `*[_type == 'Unstudio-blog' && slug.current =='${slug}']{
  "currentSlug":slug.current,
    title,
    content,
    titleImage
}[0]`;
    
    const data = await client.fetch(query);
    return data;
}

export default async function BlogArticle({ params }: { params: { slug: string } }) {
    const data:fullBlog = await getData(params.slug)
    console.log(data)
    return (
        <div className="mt-8">
            <h1>
                <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
                    Unstudio-Blog
                </span>
                <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
                    {data.title}
                </span>
            </h1>
            <Image
                width={800}
                height={800}
                src={urlFor(data.titleImage).url()}
                alt="image"
                className="rounded-lg mt-8 h-[400px] border object-cover"
            />

            <div className="mt-16 prose prose-blue prose-xl dark:prose-invert">
                <PortableText value={data.content}/>
            </div>
       </div>
    )
}