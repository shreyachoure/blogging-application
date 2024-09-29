"use client";
import React from "react";
import { FaMedium } from "react-icons/fa";
import { PublishToMedium } from "../publishToMedium"; // Import the function

const SocialMedia = () => {
	// Example post data (you can replace this with dynamic data)
	const post = {
		title: "My Awesome Blog Post",
		content: "This is the content of my blog post. I hope you like it!",
		tags: ["tech", "programming", "react"],
	};

	// Function to handle the Medium share
	const handleMediumShare = async () => {
		try {
			// Create a Medium publisher object using the post data
			const mediumPublisher = PublishToMedium();

			// Call the onHandle method to publish the post
			await mediumPublisher.onHandle();
		} catch (error) {
			console.error("Failed to publish on Medium:", error);
		}
	};

	return (
		<div>
			{/* Medium icon with an onClick handler */}
			<FaMedium
				size={40} // Adjust size as needed
				style={{ cursor: "pointer" }} // Pointer style to show clickable icon
				onClick={handleMediumShare} // Call function when clicked
			/>
		</div>
	);
};

export default SocialMedia;
