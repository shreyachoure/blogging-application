import { client } from "@/sanity/lib/client";
import { POST_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { components } from "@/sanity/portableTextComponents";
import ShareToMedium from "@/app/components/ShareToMedium";
import { toHTML } from "@portabletext/to-html";

type PostIndexProps = { params: { slug: string } };

const options = { next: { revalidate: 60 } };

export default async function Page({ params }: PostIndexProps) {
	const post = await client.fetch(POST_QUERY, params, options);

	// Handle the case when no post is found
	if (!post) {
		notFound();
	}

	// Convert Portable Text to HTML
	const postBodyHTML = post?.body ? toHTML(post.body) : "";

	// Construct the main image URL
	const mainImageUrl = post?.mainImage ? urlFor(post.mainImage).url() : null;

	const authorImage = post?.author?.image
		? urlFor(post.author.image).url() // Extract the image URL
		: null;

	return (
		<main className="container mx-auto grid grid-cols-1 gap-6 p-12">
			{mainImageUrl ? (
				<Image
					className="w-full aspect-[800/300] rounded"
					src={mainImageUrl}
					alt={post?.mainImage?.alt || "Blog Post Image"}
					width={800}
					height={300}
				/>
			) : null}

			<div className="flex flex-col items-center">
				{/* Display post title */}
				<h1 className="text-4xl font-bold text-balance my-4">{post?.title}</h1>

				{/* Render post body */}
				{post?.body ? (
					<div className="prose">
						<PortableText value={post?.body} components={components} />
					</div>
				) : null}

				{/* Share to Medium component */}
				<div className="my-4">
					<ShareToMedium
						title={post?.title || "Untitled"}
						body={postBodyHTML || "Not provided"}
						author={
							post?.author
								? {
										name: post.author.name || "Unknown",
										image: authorImage || null,
									}
								: { name: "Unknown", image: null }
						}
						mainImage={
							mainImageUrl
								? {
										asset: {
											_ref: mainImageUrl, // You need to provide the reference ID here, not the URL
											_type: "reference",
											// _weak is optional; include if needed
										},
										// You can also add optional properties like hotspot, crop, etc. if you have those values
										_type: "image", // Ensure you include this type
									}
								: null
						}
					/>
				</div>
			</div>

			<hr />

			{/* Return link */}
			<Link href="/posts">&larr; Return to all blogs</Link>
		</main>
	);
}
