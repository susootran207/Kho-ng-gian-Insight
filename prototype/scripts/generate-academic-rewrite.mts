// Generate pins from the reviewed academic files; --check is read-only for CI.
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadManifest, sha256, revisionHash } from '../build/content-contract.ts'
const root=fileURLToPath(new URL('../../',import.meta.url)),base=loadManifest(root)
const articles=base.articles.map(original=>{
 const a=structuredClone(original),key=a.id.replace('KGNT-','')
 a.revision='academic-content-v2';a.source.path='docs/content-rewrite-v2/articles/'+key+'.md'
 const source=readFileSync(resolve(root,a.source.path),'utf8');a.contentHash=a.source.sha256=sha256(source)
 a.referenceUrls=[...new Set([...source.matchAll(/https:\/\/[^\s]+/g)].map(m=>m[0]))]
 a.status='draft';a.publication=null;a.publishedAt=null
 a.assets=a.assets.map(asset=>{const path='docs/content-rewrite-v2/assets/'+basename(asset.path);return {...asset,path,sha256:sha256(readFileSync(resolve(root,path))),revision:'academic-content-v2',rights:null,alt:source.match(/!\[([^\]]+)\]/)![1]}})
 a.revisionHash=revisionHash(a);return a
})
const data=JSON.stringify({schemaVersion:1,mode:'academic-content-rewrite-v2',baseManifestSha256:sha256(readFileSync(resolve(root,'prototype/editorial/source-manifest.json'))),articles},null,2)+'\n'
const output=resolve(root,'prototype/editorial/academic-rewrite.json')
if(process.argv.includes('--check')){if(readFileSync(output,'utf8')!==data)throw new Error('Academic rewrite pins stale; regenerate after review')}else writeFileSync(output,data)
console.log('Academic rewrite manifest: 29 pinned articles/assets')
