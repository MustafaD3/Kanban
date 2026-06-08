const blobCache = {}

async function fetchAndTranspile(url) {
    if (blobCache[url]) return blobCache[url]

    const res = await fetch(url)
    let code = await res.text()

    const importRegex = /from\s+["'](\..*?)["']/g
    let match
    const deps = []

    while ((match = importRegex.exec(code)) !== null) {
        deps.push(match[1])
    }
    for (const dep of deps) {
        const depUrl = new URL(dep, url).href
        
        const depBlobUrl = await fetchAndTranspile(depUrl)        
        code = code.replaceAll(`"${dep}"`, `"${depBlobUrl}"`)
        code = code.replaceAll(`'${dep}'`, `'${depBlobUrl}'`)
    }

    const transpiled = Babel.transform(code, {
        presets: ["react"],
        filename: url
    }).code

    const blob = new Blob([transpiled], { type: "application/javascript" })
    const blobUrl = URL.createObjectURL(blob)
    
    blobCache[url] = blobUrl
    return blobUrl
}

window.babelImport = async function(path) {
    const url = new URL(path, window.location.href).href
    const blobUrl = await fetchAndTranspile(url)
    return import(blobUrl)
}