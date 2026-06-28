import { test, after, beforeEach, describe } from "node:test";
import helper from "./helper.js";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../../app.js";
import { Blog } from "../../models/blog.js";
import assert from "node:assert";

const api = supertest(app);

describe("blogs API", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogPosts);
  });

  test("Blog posts are returned as json", async () => {
    const blogsResult = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(blogsResult.body.length, helper.initialBlogPosts.length);
  });

  test("Unique identifier on a blog is called id instead of _id", async () => {
    const blogsResult = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blog = blogsResult.body[0];

    assert(blog.id);
    assert.strictEqual(blog._id, undefined);
  });

  test("Successfully create a new blog post", async () => {
    const newBlog = {
      title: "Title 4",
      author: "Author 4",
      url: "https://google.com",
      likes: 14,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogs = await helper.blogsInDb();

    assert.strictEqual(blogs.length, helper.initialBlogPosts.length + 1);

    const content = blogs.map((blog) => blog.title);

    assert(content.includes("Title 4"));
  });

  test("Blog post likes default to 0 when likes is missing", async () => {
    const newBlog = {
      title: "Title 4",
      author: "Author 4",
      url: "https://google.com",
    };

    const result = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(result.body.likes, 0);
  });

  test("Blog post without title is rejected with status 400", async () => {
    const newBlog = {
      author: "Author 4",
      url: "https://google.com",
      likes: 14,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });

  test("Blog post without url is rejected with status 400", async () => {
    const newBlog = {
      title: "Title 4",
      author: "Author 4",
      likes: 14,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });

  test("A blog post can be deleted", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    const ids = blogsAtEnd.map((blog) => blog.id);

    assert(!ids.includes(blogToDelete.id));
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogPosts.length - 1);
  });

  test("A blog post likes can be updated", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
    };

    const result = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(result.body.likes, updatedBlog.likes);
  });
});

after(async () => {
  await mongoose.connection.close();
});
