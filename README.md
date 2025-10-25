# CVR Guitars Website

The official website for CVR Guitars, showcasing custom handmade guitars and guitar building projects.

## Development Setup

### Prerequisites
- Node.js (v18 or later recommended)
- npm (comes with Node.js)
- Git

### Initial Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/cvrguitars/cvrguitars.com.git
   cd cvrguitars.com
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Local Development
1. Start the development server with file watching:
   ```bash
   npm run watch
   ```
   This will:
   - Watch for changes in blog posts
   - Automatically rebuild when files change
   - Generate HTML files from markdown

2. To build once without watching:
   ```bash
   npm run build
   ```

## Blog Post Management

### Creating a New Blog Post
1. Create a new markdown file in `blog/posts/` with the following structure:
   ```markdown
   ---
   title: Your Post Title
   date: YYYY-MM-DD
   author: Your Name
   preview: A brief description of your post
   ---

   # Your Content Here

   Write your post content using markdown formatting.
   ```

2. File naming:
   - Use lowercase
   - Replace spaces with hyphens
   - Example: `custom-guitar-building-process.md`

3. The build system will automatically:
   - Convert your markdown to HTML
   - Add it to the blog index
   - Update all necessary links

### Supported Markdown Features
- Headers (# to ######)
- Lists (ordered and unordered)
- Links and images
- Bold and italic text
- Code blocks
- Blockquotes

## Deployment

### GitHub Pages Deployment
The site automatically deploys to GitHub Pages when changes are pushed to the main branch.

#### Deployment Process
1. Make your changes in a development branch:
   ```bash
   git checkout -b your-feature-branch
   ```

2. Test your changes locally:
   ```bash
   npm run build
   ```

3. Commit your changes:
   ```bash
   git add .
   git commit -m "Your commit message"
   ```

4. Create a Pull Request:
   - Push your branch to GitHub
   - Create a PR targeting the main branch
   - Wait for any CI checks to pass

5. After PR approval and merge:
   - GitHub Actions will automatically:
     - Build the site
     - Deploy to GitHub Pages

### Important Notes
- Deployments only happen from the main branch
- Pull requests will build but not deploy
- Development branches can be used freely without affecting the live site

## Project Structure
```
cvrguitars.com/
├── assets/          # Images and static assets
├── blog/
│   ├── posts/       # Markdown blog posts
│   └── generated/   # Generated HTML (git-ignored)
├── css/            # Stylesheets
├── fonts/          # Web fonts
├── scripts/        # Build scripts
│   ├── build-blog.js
│   ├── watch-blog.js
│   ├── blog-template.html
│   └── blog-index-template.html
├── .github/
│   └── workflows/   # GitHub Actions config
└── package.json
```

## Tech Stack
- HTML5
- CSS3
- Node.js (build system)
- Markdown (blog posts)
- GitHub Actions (CI/CD)
- GitHub Pages (hosting)

## Contributing
1. Create a new branch for your feature
2. Make your changes
3. Test locally
4. Create a Pull Request
5. Wait for review and approval

## License
All rights reserved © CVR Guitars 2025