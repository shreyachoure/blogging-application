import { client } from "@/sanity/lib/client";
import { POST_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { components } from "@/sanity/portableTextComponents";

type PostIndexProps = { params: { slug: string } };

const options = { next: { revalidate: 60 } };

export default async function Page({ params }: PostIndexProps) {
	const post = await client.fetch(POST_QUERY, params, options);

	if (!post) {
		notFound();
	}

	return (
		<main className="container mx-auto grid grid-cols-1 gap-6 p-12">
			{post?.mainImage ? (
				<Image
					className="w-full aspect-[800/300] rounded"
					src={urlFor(post.mainImage)
						.width(800)
						.height(300)
						.quality(80)
						.auto("format")
						.url()}
					alt={post?.mainImage?.alt || ""}
					width="800"
					height="300"
				/>
			) : null}
			<div className="flex flex-col items-center">
				<h1 className="text-4xl font-bold text-balance my-4">{post?.title}</h1>
				{post?.body ? (
					<div className="prose">
						<PortableText value={post?.body} components={components} />
					</div>
				) : null}
			</div>
			<hr />
			<Link href="/posts">&larr; Return to all blogs</Link>
		</main>
	);
}
