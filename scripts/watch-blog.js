const chokidar = require('chokidar');
const { exec } = require('child_process');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '../blog/posts');

console.log('Watching for blog changes...');

// Initialize watcher
const watcher = chokidar.watch(POSTS_DIR, {
    ignored: /(^|[\/\\])\../,
    persistent: true
});

// Run build on any change
watcher.on('change', path => {
    console.log(`File ${path} has been changed`);
    runBuild();
}).on('add', path => {
    console.log(`File ${path} has been added`);
    runBuild();
}).on('unlink', path => {
    console.log(`File ${path} has been removed`);
    runBuild();
});

function runBuild() {
    exec('node scripts/build-blog.js', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error}`);
            return;
        }
        console.log(stdout);
        if (stderr) console.error(stderr);
    });
}

// Run initial build
runBuild();