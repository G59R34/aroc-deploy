import { neon } from '@netlify/neon';

export default async (req, res) => {
  const sql = neon(); // uses env NETLIFY_DATABASE_URL
  const postId = req.query.id;
  if (!postId) {
    return res.status(400).json({ error: 'Missing postId' });
  }
  try {
    const [post] = await sql`SELECT * FROM posts WHERE id = ${postId}`;
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
