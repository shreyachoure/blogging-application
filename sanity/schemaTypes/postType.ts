import { DocumentTextIcon, ImageIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const postType = defineType({
	name: "post",
	title: "Post",
	type: "document",
	icon: DocumentTextIcon,
	fields: [
		defineField({
			name: "title",
			type: "string",
		}),
		defineField({
			name: "slug",
			type: "slug",
			options: {
				source: "title",
			},
		}),
		defineField({
			name: "author",
			type: "reference",
			to: { type: "author" },
		}),
		defineField({
			type: "image",
			name: "mainImage",
			fields: [
				defineField({
					type: "string",
					name: "imagePrompt",
					title: "Image prompt",
				}),
				{
					name: "alt",
					type: "string",
					title: "Alternative Text",
				},
			],
			options: {
				aiAssist: {
					imageInstructionField: "imagePrompt",
				},
			},
		}),
		defineField({
			name: "categories",
			type: "array",
			of: [defineArrayMember({ type: "reference", to: { type: "category" } })],
		}),
		defineField({
			name: "publishedAt",
			type: "datetime",
		}),
		defineField({
			name: "body",
			type: "blockContent",
		}),
	],
	preview: {
		select: {
			title: "title",
			author: "author.name",
			media: "mainImage",
		},
		prepare(selection) {
			const { author } = selection;
			return { ...selection, subtitle: author && `by ${author}` };
		},
	},
});
