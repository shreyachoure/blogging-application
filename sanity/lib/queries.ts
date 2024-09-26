import { defineQuery } from "next-sanity";

export const CATEGORY_QUERY = defineQuery(`*[_type == "category"]{
  title, slug
}`);

export const POSTS_QUERY =
	defineQuery(`*[_type == "post" && defined(slug.current)]|order(publishedAt desc)[0...12]{
  _id,
  title,
  slug,
  body,
  mainImage,
  publishedAt,
  "categories": coalesce(
    categories[]->{
      _id,
      slug,
      title
    },
    []
  ),
  author->{
    name,
    image
  }
}`);

export const POSTS_SLUGS_QUERY =
	defineQuery(`*[_type == "post" && defined(slug.current)]{ 
  "slug": slug.current
}`);

export const POST_QUERY =
	defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  body,
  mainImage,
  publishedAt,
  "categories": coalesce(
    categories[]->{
      _id,
      slug,
      title
    },
    []
  ),
  author->{
    name,
    image
  }
}`);

export const POSTS_BY_CATEGORY = defineQuery(`*[_type == "category"]{
  title,
  slug,
  "posts": *[_type == "post" && references(^._id)]{
    _id,
    title,
    slug,
    mainImage,
    "authors": *[_type == "author" && references(^._id)]{
      _id, 
      name // Assuming the author has a 'name' field
    }
  }
}`);
