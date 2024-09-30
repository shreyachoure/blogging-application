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
	const postBodyHTML = post?.body ? toHTML(post.body, { components }) : "";

	// Construct the main image URL
	const mainImageUrl = post?.mainImage ? urlFor(post.mainImage).url() : null;

	return (
		<main className="container mx-auto grid grid-cols-1 gap-6 p-12">
			{/* Render main image if available */}
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
						title={post?.title || "Untitled"} // Use fallback if title is missing
						body={postBodyHTML} // Use the converted HTML body
						author={post?.author || { name: "Unknown" }} // Fallback author
						mainImage={mainImageUrl} // Pass the extracted URL of the main image, or null if missing
					/>
				</div>
			</div>

			<hr />

			{/* Return link */}
			<Link href="/posts">&larr; Return to all blogs</Link>
		</main>
	);
}
