import { academicReferences } from '../build/academic-reference-additions.ts'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { createAcademicShowcase } from '../build/academic-showcase.ts'
import { assertShowcaseModule, showcaseBoundary } from '../build/academic-showcase-scan.ts'
import { assertArtifact } from '../build/publication-scan.ts'
import { createPublicLibrary } from '../build/public-library.ts'
import { selectPublicWeekly } from '../build/weekly.ts'
import { loadManifest, revisionHash } from '../build/content-contract.ts'
const root=fileURLToPath(new URL('../../',import.meta.url))
const json=(p:string)=>JSON.parse(readFileSync(root+p,'utf8'))
test('Academic showcase projects rewritten 29/29/10 and retains the historical F0 boundary',()=>{
 const before=readFileSync(root+'prototype/editorial/source-manifest.json'), release=createAcademicShowcase(root)
 assert.equal(release.catalogue.articles.length,29);assert.equal(release.assets.length,29);assert.equal(release.weekly.topics.length,10)
 assert.equal(release.policy.protectedRecords.length,107)
 for(const a of release.catalogue.articles){assert.equal(a.status,'draft');assert.equal(a.publishedAt,undefined);assert.equal(a.publication,undefined);assert.equal(a.document!.trace.length,0);assert.equal(a.document!.assets.length,1);assert.deepEqual(a.document!.localLinks,[]);assert.ok(a.relatedSlugs!.every(s=>release.catalogue.articles.some(a=>a.slug===s)))}
 assert.deepEqual(readFileSync(root+'prototype/editorial/source-manifest.json'),before)
 const legacy=json('prototype/editorial/catalogue.json'),m=loadManifest(root)
 assert.equal(createPublicLibrary(root,legacy,m).catalogue.articles.length,0)
 assert.equal(selectPublicWeekly(json('prototype/editorial/weekly.json'),legacy,root).topics.length,0)
})
test('Showcase scanner rejects raw dossiers, records, sourcemaps, fixtures and foreign assets',()=>{
 const r=createAcademicShowcase(root),b=showcaseBoundary(root,r)
 for(const a of r.assets)assert.doesNotThrow(()=>assertArtifact(a.bytes,a.url,b))
 for(const a of r.manifest.articles)for(const f of Object.values(a.dossiers))assert.throws(()=>assertArtifact(readFileSync(root+f.path),'assets/leak.js',b))
 for(const f of r.policy.protectedRecords)assert.throws(()=>assertArtifact(readFileSync(root+f.path),'assets/leak.js',b))
 for(const [name,value] of [['x.map','{}'],['x.json','{}'],['x.js','F0_FIXTURE_ONLY_X'],['foreign.svg','<svg/>'],['x.js','publication-records/']])assert.throws(()=>assertArtifact(Buffer.from(value),name,b))
 for(const id of ['/src/preview/x.ts','virtual:p2-fixture','/tests/harness/x.ts','/editorial/weekly.json'])assert.throws(()=>assertShowcaseModule([id]))
})

test('Rewrite serves fresh source and reconciled figures while preserving every route and reference',()=>{
 const r=createAcademicShowcase(root),m=loadManifest(root)
 for(const a of r.rewritten){
  const old=m.articles.find(b=>b.id===a.id)!,shown=r.catalogue.articles.find(b=>b.id===a.id)!
  assert.equal(a.slug,old.slug);assert.notEqual(a.contentHash,old.contentHash)
  assert.equal(shown.document!.sourceHash,a.contentHash);assert.equal(shown.revision,undefined)
  assert.deepEqual(a.referenceUrls,academicReferences(a.id,old.referenceUrls));assert.deepEqual(a.metadata,old.metadata)
  assert.equal(shown.document!.figures.length,1);assert.equal(shown.document!.localLinks!.length,0)
  assert.equal(a.assets[0].rights,null);assert.equal(a.publication,null)
  const visible=JSON.stringify(shown.document)
  assert.doesNotMatch(visible,/Bản nháp|draft-r\d|REFERENCES\.md".*target|Hồ sơ nguồn|Đối chiếu nhận định/)
 }
})

test('Rewrite fails closed on tampered routes, bytes, approvals, bibliography and baseline',async()=>{
 const {mkdtempSync,mkdirSync,writeFileSync,rmSync}=await import('node:fs')
 const {tmpdir}=await import('node:os'),{join,dirname}=await import('node:path')
 const {loadAcademicRewrite}=await import('../build/academic-rewrite.ts')
 const temp=mkdtempSync(join(tmpdir(),'academic-rewrite-')),base=loadManifest(root),policy=json('prototype/editorial/academic-rewrite.json')
 const write=(path:string,bytes:string|Buffer)=>{mkdirSync(dirname(join(temp,path)),{recursive:true});writeFileSync(join(temp,path),bytes)}
 try{
  write('prototype/editorial/source-manifest.json',readFileSync(root+'prototype/editorial/source-manifest.json'))
  for(const a of policy.articles)for(const f of [a.source,...a.assets])write(f.path,readFileSync(root+f.path))
  const check=(p:any)=>{write('prototype/editorial/academic-rewrite.json',JSON.stringify(p));return()=>loadAcademicRewrite(temp,base)}
  assert.equal(check(policy)().length,29)
  for(const change of [
   (p:any)=>p.articles.pop(),
   (p:any)=>p.articles[0].slug='changed-route',
   (p:any)=>p.articles[0].metadata.topicIds=[],
   (p:any)=>p.articles[0].status='published',
   (p:any)=>p.articles[0].contentHash='0'.repeat(64),
   (p:any)=>p.articles[0].source.path='../escape.md',
   (p:any)=>p.articles[0].referenceUrls=[],
   (p:any)=>p.baseManifestSha256='0'.repeat(64),
  ]){const changed=structuredClone(policy);change(changed);for(const a of changed.articles)a.revisionHash=revisionHash(a);assert.throws(check(changed))}
  write(policy.articles[0].source.path,'# Altered bytes');assert.throws(check(policy))
 }finally{rmSync(temp,{recursive:true,force:true})}
})
