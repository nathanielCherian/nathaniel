const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDirectory = 'posts';
const publicDirectory = 'public';
const sitemapFilePath = path.join(publicDirectory, 'sitemap.xml');

// Function to read the "posts" directory and parse frontmatter
const generateSitemap = () => {
  const postsPath = path.join(__dirname, postsDirectory);
  const files = fs.readdirSync(postsPath);

  const urls = files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const filePath = path.join(postsPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);

      if (data.path) {
        if (data.status == 'published') {
            return `<url>\n  <loc>https://blog.nathanielc.com${data.path}</loc>\n</url>`;
        }
      } else {
        console.warn(`Warning: Frontmatter "path" not found in ${file}`);
        return null;
      }
    })
    .filter((url) => url !== null);

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;

  fs.writeFileSync(sitemapFilePath, sitemapContent);
  console.log(`Sitemap generated at ${sitemapFilePath}`);
};

// Run the script
generateSitemap();
