import { Blog } from "../../models/blog.js";

const initialBlogPosts = [
  {
    title: "Blog Post 1",
    author: "Author 1",
    url: "https://google.com",
    likes: 10,
  },
  {
    title: "Blog Post 2",
    author: "Author 2",
    url: "https://google.com",
    likes: 11,
  },
  {
    title: "Blog Post 3",
    author: "Author 3",
    url: "https://google.com",
    likes: 12,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});

  return blogs.map((blog) => blog.toJSON());
};

export default { initialBlogPosts, blogsInDb };
