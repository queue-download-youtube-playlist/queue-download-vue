const fs = require('fs');
const path = require('path');

function getPathRoot() {
  let pathRoot = process.cwd();
  return pathRoot;
}

function getPathParent() {
  const pathRoot = process.cwd();
  const nameRoot = path.basename(pathRoot);
  const pathParent = pathRoot.replace(nameRoot, '');
  return pathParent;
}

/**
 *
 * @returns {string}
 */
function getPathElectron() {
  const pathRoot = process.cwd();
  const basename = path.basename(pathRoot);
  const pathParent = pathRoot.replace(basename, '');

  return pathParent;
}

/**
 * generate electron index.html
 *
 * just add
 *
 * <div id="app"></div>
 *
 * <script src="./renderer.js" type="module"></script>
 *
 *
 * @param title
 */
function setupElectron_index_html(
    title = null,
) {

  if (title === null) {
    title = 'index.html title';
  }

  let indexHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link href="./favicon.ico" rel="icon">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <title>${title}</title>
</head>
<body>
<div id="app"></div>
<script src="./renderer.js" type="module"></script>
</body>
</html>
`;

  const string_index_html = 'index.html';
  const path_index_html = path.join(getPathRoot(), 'dist', string_index_html);
  fs.writeFileSync(path_index_html, '');
  fs.writeFileSync(path_index_html, indexHtmlContent);

}

/**
 * generate renderer.js
 *
 * read dir assets/ forEach()
 *
 * appendFile
 *
 *    import './assets/home-view-xxx.js'
 *
 */
function setupElectron_renderer_js() {

  let pathTarget = path.join(getPathRoot(), 'dist');
  const string_assets = 'assets';
  const string_renderer_js = 'renderer.js';
  const path_assets = path.join(pathTarget, string_assets);
  const path_renderer_js = path.join(pathTarget, string_renderer_js);

  fs.writeFileSync(path_renderer_js, '');
  const filenameList = fs.readdirSync(path_assets);
  filenameList.forEach((filename) => {
    const text = `import './${string_assets}/${filename}';\n`;
    fs.appendFileSync(path_renderer_js, text);
  });
}

const copyType = {
  justCopy: 'justCopy',
  electronIndex: 'electronIndex',
};

/**
 * npm run build (vite build) -->
 *
 * generate electron index.html -->
 *
 * generate electron renderer.js -->
 *
 * if exists xxx-electron public/ rmSync() -->
 *
 * copy vue dist/ ==> xxx-electron public/ -->
 *
 * end
 *
 * @param indexHtmlTitle index.html title
 */
function setupVueToElectron(
    indexHtmlTitle = null,
) {

  execAsync(cmd.npm_run_build, () => {
    setupElectron_index_html(indexHtmlTitle);
    setupElectron_renderer_js();

    const src = path.join(getPathRoot(), 'dist');
    const dest = path.join(getPathElectron(), 'public');
    if (fs.existsSync(dest)) {
      console.log(`dest exists --> rm ... ${dest}`);
      fs.rmSync(dest, {recursive: true, force: true});
    }

    console.log(`copy ... ${src}`);
    fs.cpSync(src, dest, {recursive: true, force: true});
    console.log(` end ... ${dest}`);
  });
}

/**
 * require('child_process').execSync(cmd)
 * @param cmd
 */
function execSync(cmd) {
  console.log(`execSync() cmd=${cmd}`);
  require('child_process').execSync(cmd);
  console.log(`execSync() finished... cmd=${cmd}`);
}

/**
 * npm cache clean --force
 */
function npmCacheClean() {
  execSync(cmd.npm_cache_clean_force);
}

/**
 *
 * @param cmd
 * @param callback {Function}
 */
function execAsync(cmd = '', callback = null) {
  console.log(`cmd start=`, cmd);
  const coffeeProcess = require('child_process').exec(cmd);
  const std = {
    stdout: [],
    stderr: [],
    close: null,
  };
  coffeeProcess.stdout.on('data', (data) => {
    std.stdout.push(data);
    console.log(data);
  });
  coffeeProcess.stderr.on('data', (err) => {
    std.stderr.push(err);
    console.log(err);
  });
  coffeeProcess.on('close', (code) => {
    std.close = code;
    console.log(`cmd close=`, cmd);
    if (callback) {
      callback(std);
    }
  });
}

/**
 * npm install
 */
function npmInstallOnWindows() {
  execSync(cmd.npm_install_windows_terminal);
}

/**
 * yarn install
 */
function yarnInstallOnWindows() {
  execSync(cmd.yarn_install_windows_terminal);
}

/**
 *
 * open (electron) dir -->
 *
 * out/make/squirrel.windows/x64
 *
 * @param logIt
 */
function openDirElectronOutSquirrel(logIt = false) {
  const path_x64 = path.join('out', 'make', 'squirrel.windows', 'x64');
  if (logIt) {
    console.log(`path_x64\n${path_x64}`);
  }
  const cmd = `start "o" ${path_x64}`;
  execAsync(cmd);
}

/**
 * npm run make -->
 *
 * then open out/make/squirrel.windows/x64/ dir
 */
function npmRunMakeOpenOutSquirrel() {
  execAsync(cmd.npm_run_make, () => {
    openDirElectronOutSquirrel();
  });
}

function npmRunStart() {
  execSync(cmd.npm_run_start_windows_terminal);
}

const cmd = {
  yarn_install_windows_terminal: `start "" yarn install && exit`,
  npm_install_windows_terminal: `start "" npm install && exit`,
  // `start "" npm run start && exit`
  npm_run_start_windows_terminal: `start "" npm run start && exit`,
  // `npm run build`
  npm_run_build: `npm run build`,
  // `npm run make`
  npm_run_make: `npm run make`,
  npm_cache_clean_force: `npm cache clean --force`,
};

module.exports = {
  copyType: copyType,
  setupVueToElectron: setupVueToElectron,
  setupElectron_index_html: setupElectron_index_html,
  setupElectron_renderer_js: setupElectron_renderer_js,

  cmd: cmd,

  execSync: execSync,
  execAsync: execAsync,
  openDirElectronOutSquirrel: openDirElectronOutSquirrel,
  npmRunMakeOpenOutSquirrel: npmRunMakeOpenOutSquirrel,
  npmRunStart: npmRunStart,

  npmCacheClean: npmCacheClean,
  npmInstallOnWindows: npmInstallOnWindows,
  yarnInstallOnWindows: yarnInstallOnWindows,
};