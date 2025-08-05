import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname);
console.log(__filename);
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from dist
app.use(express.static(path.join(__dirname, 'dist')));

// SPA fallback: always return index.html for unknown routes
// app.get('*', (_, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

app.get('*', (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  } catch (err) {
    console.error('Error in SPA fallback:', err);
    next(err);
  }
});


app.listen(port, () => {
  console.log(`✅ App running at http://localhost:${port}`);
});
