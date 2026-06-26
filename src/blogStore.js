// blogStore.js — frontend-only data layer using localStorage

const STORAGE_KEY = 'blog_data';

// Seed data from the original db.json (used only on first load)
const SEED_DATA = [
  {
    id: 1,
    title: 'My First Blog',
    body: "Why do we use it?\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.\n\nWhere does it come from?\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
    author: 'mario',
  },
  {
    id: 2,
    title: 'Opening Party!',
    body: "Why do we use it?\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.\n\nWhere does it come from?\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
    author: 'yoshi',
  },
  {
    id: 3,
    title: 'ah',
    body: 'jjs',
    author: 'peach',
  },
];

// ── helpers ──────────────────────────────────────────────────────────────────

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  // First visit — seed with default data
  save(SEED_DATA);
  return SEED_DATA;
}

function save(blogs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
}

// ── public API ────────────────────────────────────────────────────────────────

export function getBlogs() {
  return load();
}

export function getBlogById(id) {
  const numId = Number(id);
  return load().find((b) => b.id === numId) || null;
}

export function createBlog(blog) {
  const blogs = load();
  const newBlog = {
    ...blog,
    id: blogs.length > 0 ? Math.max(...blogs.map((b) => b.id)) + 1 : 1,
  };
  save([...blogs, newBlog]);
  return newBlog;
}

export function deleteBlog(id) {
  const numId = Number(id);
  const blogs = load().filter((b) => b.id !== numId);
  save(blogs);
}
