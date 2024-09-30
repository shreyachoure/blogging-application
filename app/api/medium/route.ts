import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
	try {
		const body = await request.json(); // Parse incoming request body

		const accessKey: string = process.env.MEDIUM_ACCESS_TOKEN || "";
		const userId: string = process.env.MEDIUM_USER_ID || "";
		const title: string = body.title;
		const content: string = body.content;
		const contentFormat: string = body.contentFormat || "html"; // or "markdown"
		const publishStatus: string = body.publishStatus || "draft";

		// Medium API endpoint for creating posts
		const url: string = `https://api.medium.com/v1/users/${userId}/posts`;
		const headers: Record<string, string> = {
			Authorization: `Bearer ${accessKey}`,
			"Content-Type": "application/json",
		};

		// Prepare the post data object
		const postData = {
			title,
			contentFormat,
			content,
			publishStatus,
		};

		// Make the request to Medium API
		const mediumResponse = await fetch(url, {
			method: "POST",
			headers: headers,
			body: JSON.stringify(postData), // Send the postData to Medium
		});

		if (mediumResponse.ok) {
			const responseContent = await mediumResponse.json();

			// Return the response content from Medium API
			return new NextResponse(JSON.stringify(responseContent), {
				status: 200,
			});
		} else {
			const errorText: string = await mediumResponse.text();
			return NextResponse.json(
				{
					error: `Medium API request failed with status code ${mediumResponse.status}`,
					details: errorText,
				},
				{ status: mediumResponse.status }
			);
		}
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Error processing request" },
			{ status: 500 }
		);
	}
}

export async function OPTIONS(): Promise<NextResponse> {
	return NextResponse.json({}, { status: 200 });
}
