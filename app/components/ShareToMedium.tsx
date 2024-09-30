"use client";
import React from "react";
import { FaMedium } from "react-icons/fa";
import { POSTS_QUERYResult } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";

type ShareToMediumProps = {
	title: string;
	body: string; // Adjust according to your needs
	author: {
		name: string;
		image: string | null;
	};
	mainImage?: {
		asset?: {
			_ref: string;
			_type: "reference";
		};
		_type: "image";
	} | null;
};

const ShareToMedium = (props: ShareToMediumProps) => {
	const { title, body, author, mainImage } = props;

	// const mainImageUrl = mainImage ? urlFor(mainImage).url() : null;

	const handleMediumShare = async () => {
		try {
			const response = await fetch("/api/medium", {
				method: "POST",
				headers: {
					"Content-Type": "application/json", // Ensure this matches the content-type expected in the API
				},
				body: JSON.stringify({
					title,
					content: body, // Send the actual content to Medium API
					contentFormat: "html", // or "markdown" depending on your content
					author: author?.name,
					mainImage,
					publishStatus: "draft", // You can also add publish status if required
				}),
			});

			if (response.ok) {
				const { data } = await response.json();
				console.log("Post published to Medium:", data);
			} else {
				const errorData = await response.json();
				console.log("Error:", errorData);
			}
		} catch (err) {
			console.log("Error while sharing to Medium:", err);
		}
	};

	return (
		<div>
			<FaMedium
				size={40}
				style={{ cursor: "pointer" }}
				onClick={handleMediumShare}
			/>
		</div>
	);
};

export default ShareToMedium;
