const fs = require('fs-extra');
const path = require('path');
const frontMatter = require('front-matter');
const { marked } = require('marked');

const POSTS_DIR = path.join(__dirname, '../blog/posts');
const OUTPUT_DIR = path.join(__dirname, '../blog/generated');
const TEMPLATE_PATH = path.join(__dirname, 'blog-template.html');

function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

async function generateBlogIndex(posts) {
    const template = await fs.readFile(path.join(__dirname, 'blog-index-template.html'), 'utf8');
    let postsHTML = '';

    // Sort posts by date, newest first
    posts.sort((a, b) => new Date(b.attributes.date) - new Date(a.attributes.date));

    for (const post of posts) {
        const date = new Date(post.attributes.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        postsHTML += `
            <article class="blog-preview">
                <h2>${post.attributes.title}</h2>
                <div class="blog-meta">
                    <span class="date">${date}</span>
                    <span class="author">by ${post.attributes.author}</span>
                </div>
                <p>${post.attributes.preview}</p>
                <a href="blog/generated/${post.slug}.html" class="read-more">Read More</a>
            </article>
        `;
    }

    const indexContent = template.replace('{{BLOG_POSTS}}', postsHTML);
    await fs.writeFile(path.join(__dirname, '../blog.html'), indexContent);
}

async function convertMarkdownFile(filePath) {
    const content = await fs.readFile(filePath, 'utf8');
    const { attributes, body } = frontMatter(content);
    
    // Remove the first heading (title) from the markdown content
    const bodyWithoutTitle = body.replace(/^\s*#\s+[^\n]+\n/, '');
    const html = marked(bodyWithoutTitle);
    const template = await fs.readFile(TEMPLATE_PATH, 'utf8');

    const date = new Date(attributes.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const postHTML = template
        // Replace ALL occurrences of placeholders where needed
        .replace(/\{\{TITLE\}\}/g, escapeHtml(attributes.title))
        .replace(/\{\{DATE\}\}/g, escapeHtml(date))
        .replace(/\{\{AUTHOR\}\}/g, escapeHtml(attributes.author))
        .replace(/\{\{CONTENT\}\}/g, html);

    const slug = path.basename(filePath, '.md');
    await fs.outputFile(path.join(OUTPUT_DIR, `${slug}.html`), postHTML);

    return {
        attributes,
        slug
    };
}

async function buildBlog() {
    try {
        // Ensure output directory exists
        await fs.ensureDir(OUTPUT_DIR);

        // Get all markdown files
        const files = await fs.readdir(POSTS_DIR);
        const markdownFiles = files.filter(file => file.endsWith('.md'));

        // Convert all markdown files and collect their metadata
        const posts = await Promise.all(
            markdownFiles.map(file => 
                convertMarkdownFile(path.join(POSTS_DIR, file))
            )
        );

        // Generate the blog index page
        await generateBlogIndex(posts);

        console.log('Blog built successfully!');
    } catch (error) {
        console.error('Error building blog:', error);
    }
}

// Run the build
buildBlog();