// Academic edition only. Historical F0 manifest/approvals are never rewritten.
import { academicReferences } from './academic-reference-additions.ts'
import { readFileSync } from 'node:fs'
import { resolve, basename } from 'node:path'
import type { SourceArticle, SourceManifest } from '../editorial/source-contract.ts'
import { canonical, readReference, requireThat, revisionHash, sha256 } from './content-contract.ts'
interface RewritePolicy {schemaVersion:1;mode:'academic-content-rewrite-v2';baseManifestSha256:string;articles:SourceArticle[]}
export function loadAcademicRewrite(root:string, base:SourceManifest):SourceArticle[] {
 const p:RewritePolicy=JSON.parse(readFileSync(resolve(root,'prototype/editorial/academic-rewrite.json'),'utf8'))
 requireThat(p.schemaVersion===1&&p.mode==='academic-content-rewrite-v2','invalid academic rewrite policy')
 requireThat(sha256(readFileSync(resolve(root,'prototype/editorial/source-manifest.json')))===p.baseManifestSha256,'rewrite baseline changed')
 requireThat(p.articles.length===29&&new Set(p.articles.map(a=>a.id)).size===29,'rewrite exact 29 allowlist')
 return base.articles.map(original=>{
  const a=p.articles.find(a=>a.id===original.id)
  requireThat(a&&a.slug===original.slug,'rewrite route changed: '+original.id)
  requireThat(canonical(a.metadata)===canonical(original.metadata),'rewrite metadata/topic boundary changed: '+a.id)
  requireThat(a.status==='draft'&&a.publication===null&&a.publishedAt===null,'rewrite must not synthesize approvals')
  requireThat(a.revision==='academic-content-v2'&&a.revisionHash===revisionHash(a),'rewrite revision mismatch: '+a.id)
  const source=readReference(root,a.source,'docs/content-rewrite-v2/articles/').toString('utf8')
  requireThat(a.contentHash===a.source.sha256&&a.contentHash!==original.contentHash,'rewrite source unchanged: '+a.id)
  requireThat(!/Bản nháp|Chưa được duyệt|draft-r\d|\[(?:Hồ sơ|Bằng chứng|Bloom)|\.md\)/i.test(source),'internal editorial text in rewrite: '+a.id)
  requireThat(source.split('\n')[0]==='# '+a.metadata.title,'rewrite title mismatch')
  requireThat(source.includes('## Tài liệu tham khảo')&&source.split(/\s+/).length>=350,'rewrite incomplete article: '+a.id)
  requireThat(canonical(a.dossiers)===canonical(original.dossiers),'historical dossiers changed')
  const urls=[...source.matchAll(/https:\/\/[^\s]+/g)].map(m=>m[0])
  requireThat(canonical([...new Set(urls)].sort())===canonical([...a.referenceUrls].sort()),'rewrite reference URL mismatch: '+a.id)
  requireThat(canonical(a.referenceUrls)===canonical(academicReferences(a.id,original.referenceUrls)),'rewrite bibliography changed without explicit reconciliation: '+a.id)
  requireThat(a.assets.length===1&&a.assets[0].rights===null&&basename(a.assets[0].path)===basename(original.assets[0].path),'rewrite asset scope/approval mismatch')
  for(const asset of a.assets){const svg=readReference(root,asset,'docs/content-rewrite-v2/assets/').toString('utf8');requireThat(!/Bản nháp|draft-r\d|C\d\d r\d/.test(svg),'internal revision in SVG')}
  return a
 })
}
