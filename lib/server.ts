import { env } from 'cloudflare:workers';
import { starterPack, packSchema, publicChallenge, utcDay, previousDay, type Challenge } from './challenges';
export function database(){if(!env.DB)throw new Error('Database unavailable');return env.DB;}
import preparedPacks from '../content/daily-packs.json';
export type Pack={day:string;source:string;challenges:Challenge[]};
export async function readPack(day:string):Promise<Pack|null>{
 const row=await database().prepare('SELECT payload,source FROM challenges WHERE day=?').bind(day).first<{payload:string;source:string}>();
 return row?{day,source:row.source,challenges:packSchema.parse(JSON.parse(row.payload)).challenges}:null;
}
export async function dailyPack():Promise<Pack>{
 const day=utcDay(); const existing=await readPack(day); if(existing)return existing;
 const entry=(preparedPacks as Record<string,unknown>)[day];
 const pack=entry?packSchema.parse(entry):{challenges:starterPack};
 await database().prepare('INSERT OR IGNORE INTO challenges(day,payload,source,created_at) VALUES(?,?,?,?)').bind(day,JSON.stringify(pack),entry?'prepared':'starter',new Date().toISOString()).run();
 return (await readPack(day))!;
}
export type Attempt={day:string;challenge_id:string;answer:number;score:number};
export async function userStats(userId:string|null){
 if(!userId)return {total:0,completed:0,streak:0};
 const db=database();
 const summary=await db.prepare('SELECT COALESCE(SUM(score),0) AS total,COUNT(*) AS completed FROM attempts WHERE user_id=?').bind(userId).first<{total:number;completed:number}>();
 const {results}=await db.prepare('SELECT day FROM attempts WHERE user_id=? GROUP BY day HAVING COUNT(*)=3 ORDER BY day DESC').bind(userId).all<{day:string}>();
 const days=new Set(results.map(r=>r.day));let cursor=days.has(utcDay())?utcDay():previousDay(utcDay()),streak=0;
 while(days.has(cursor)){streak++;cursor=previousDay(cursor);}
 return {...summary!,streak};
}
export async function dailyView(userId:string|null){
 const pack=await dailyPack();
 const attempts=userId?(await database().prepare('SELECT day,challenge_id,answer,score FROM attempts WHERE user_id=? AND day=?').bind(userId,pack.day).all<Attempt>()).results:[];
 return {day:pack.day,source:pack.source,signedIn:Boolean(userId),challenges:pack.challenges.map(publicChallenge),results:attempts.map(a=>{const c=pack.challenges.find(c=>c.id===a.challenge_id)!;return {id:c.id,answer:a.answer,score:a.score,correctIndex:c.correctIndex,explanation:c.explanation,takeaway:c.takeaway};}),stats:await userStats(userId)};
}
