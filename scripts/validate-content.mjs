import fs from 'node:fs';
import {transform} from 'esbuild';
const source=fs.readFileSync(new URL('../lib/challenges.ts',import.meta.url),'utf8');
const compiled=await transform(source,{loader:'ts',format:'esm'});
const file=new URL('../.sites-runtime/content-schema.mjs',import.meta.url);
fs.mkdirSync(new URL('../.sites-runtime',import.meta.url),{recursive:true});fs.writeFileSync(file,compiled.code);
const {packSchema}=await import(file.href);
const packs=JSON.parse(fs.readFileSync(new URL('../content/daily-packs.json',import.meta.url),'utf8').replace(/^\uFEFF/,''));
for(const [day,pack] of Object.entries(packs)){
 if(!/^\d{4}-\d{2}-\d{2}$/.test(day)||new Date(day).toISOString().slice(0,10)!==day)throw new Error('Invalid date '+day);
 packSchema.parse(pack);
 for(const c of pack.challenges)if(new Set(c.options).size!==4)throw new Error('Duplicate choices '+day);
}
console.log('Validated '+Object.keys(packs).length+' local daily packs.');
