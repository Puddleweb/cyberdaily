import { getChatGPTUser } from '../../chatgpt-auth';
import { dailyView } from '../../../lib/server';
export const dynamic='force-dynamic';
export async function GET(){
 try{const user=await getChatGPTUser();return Response.json(await dailyView(user?.userId||null),{headers:{'Cache-Control':'private, no-store'}});}
 catch(error){console.error(error);return Response.json({error:'The daily challenge could not load. If a new set is being prepared, try again shortly.'},{status:503,headers:{'Cache-Control':'no-store'}});}
}
