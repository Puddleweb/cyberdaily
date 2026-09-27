import { z } from 'zod';
import { getChatGPTUser } from '../../chatgpt-auth';
import { database,readPack,userStats } from '../../../lib/server';
import { utcDay } from '../../../lib/challenges';
export const dynamic='force-dynamic';
const input=z.object({day:z.string().regex(/^\d{4}-\d{2}-\d{2}$/),id:z.enum(['phishing','logs','code']),answer:z.number().int().min(0).max(3)});
export async function POST(request:Request){
 if(request.headers.get('origin')!==new URL(request.url).origin)return Response.json({error:'Please submit from CyberDaily.'},{status:403});
 const user=await getChatGPTUser();if(!user)return Response.json({error:'Sign in to save your answer.'},{status:401});
 if(!request.headers.get('content-type')?.includes('application/json'))return Response.json({error:'Expected JSON.'},{status:415});
 const body=await request.text();if(body.length>1000)return Response.json({error:'Request too large.'},{status:413});
 let data;try{data=input.parse(JSON.parse(body));}catch{return Response.json({error:'Choose one of the four answers.'},{status:400});}
 if(data.day!==utcDay())return Response.json({error:'A new day has started. Reload to open today’s challenges.'},{status:409});
 try{
  const pack=await readPack(data.day);const c=pack?.challenges.find(c=>c.id===data.id);
  if(!c)return Response.json({error:'Challenge unavailable. Reload and try again.'},{status:404});
  const db=database();
  await db.prepare('INSERT OR IGNORE INTO attempts(user_id,day,challenge_id,answer,score,completed_at) VALUES(?,?,?,?,?,?)').bind(user.userId,data.day,data.id,data.answer,data.answer===c.correctIndex?100:0,new Date().toISOString()).run();
  const saved=await db.prepare('SELECT answer,score FROM attempts WHERE user_id=? AND day=? AND challenge_id=?').bind(user.userId,data.day,data.id).first<{answer:number;score:number}>();
  return Response.json({result:{id:c.id,...saved,correctIndex:c.correctIndex,explanation:c.explanation,takeaway:c.takeaway},stats:await userStats(user.userId)},{headers:{'Cache-Control':'private, no-store'}});
 }catch(error){console.error(error);return Response.json({error:'Your answer could not be saved. Please try again.'},{status:503});}
}
