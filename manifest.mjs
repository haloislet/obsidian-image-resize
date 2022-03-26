import * as fs from 'fs'
import * as path from 'path'

const { name, pluginName, version, description, author, authorUrl } = JSON.parse(fs.readFileSync('./package.json', 'utf8'))
const manifest = {
	"id": name,
	"name": pluginName,
	"version": version,
	"description": description,
	"author": author,
	"authorUrl": authorUrl,
	"minAppVersion": "0.13.33",
	"isDesktopOnly": false
}

const content = JSON.stringify(manifest, null ,4)

function buildManifest (){
	fs.writeFileSync(path.resolve('dist', 'manifest.json'), content)
}

export default buildManifest