// Explicit, reviewed extensions to the historical bibliography; never a runtime module.
export const academicReferenceAdditions:Record<string,string[]>={
 'KGNT-E01':['https://www.myersbriggs.org/my-mbti-personality-type/the-mbti-preferences/'],
 'KGNT-C01':['https://doi.org/10.1037/1089-2680.2.3.271'],
 'KGNT-C05':['https://doi.org/10.1037/1528-3542.7.2.336'],
 'KGNT-C11':['https://www.stopbullying.gov/bullying/roles-kids-play'],
 'KGNT-C17':['https://www.nhlbi.nih.gov/health/sleep-deprivation/health-effects'],
}
export function academicReferences(id:string,original:string[]){
 return [...original.map(url=>url==='https://doi.org/10.1016/S1364-6613(03'?'https://doi.org/10.1016/S1364-6613(03)00028-7':url),...(academicReferenceAdditions[id]??[])]
}
