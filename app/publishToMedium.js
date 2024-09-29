export function PublishToMedium() {
	// Static data for the Medium post
	const title = "My First Medium Post";
	const content =
		"This is a simple Medium post written directly from JavaScript!";
	const tags = ["JavaScript", "Web Development", "Programming"];

	const mediumAccessToken =
		"2a53acd85fd75b9654f62c1e4a81ccd841d46761b23059befae7dac293adc8a7f"; // Replace with your actual token
	const mediumUserId =
		"1fcafcf382b4865395db3e30893c1281a1dd5407fbfecd610786de3eccca47f8c"; // Replace with your actual user ID

	const publishToMedium = async () => {
		try {
			// Make the POST request to Medium API using fetch
			const response = await fetch(
				`https://api.medium.com/v1/users/1fcafcf382b4865395db3e30893c1281a1dd5407fbfecd610786de3eccca47f8c/posts`,
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${mediumAccessToken}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						title: "My First Medium Post",
						contentFormat: "html",
						content: `<p>content1</p>`,
						tags: ["JavaScript", "Web Development", "Programming"],
						publishStatus: "public",
					}),
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();
			console.log("Published to Medium:", data);
			window.alert("👋 Blog uploaded on Medium");
		} catch (error) {
			console.error("Error publishing to Medium:", error.message);
			window.alert("Error publishing to Medium. Please try again.");
		}
	};

	// Return a simple function that can be called to trigger the Medium publishing
	return {
		label: "Publish to Medium",
		onHandle: async () => {
			await publishToMedium();
		},
	};
}
