# README #

# this vue project for queue-download-desktop views

### dir
```text
vue-project/
    dist/

electron-project/
    public/

```

### setupVueToElectron()
```javascript
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
 * @param dirNameElectron electron project dir name
 */
```

const {setupVueToElectron} = require('./util/index.electron.vue');

setupVueToElectron(
`youtube playlist download queue`,
`queue-download-desktop`);

---

end