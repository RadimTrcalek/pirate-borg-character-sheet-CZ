import OBR from '@owlbear-rodeo/sdk';

type RollEntry={id:string;character:string;label:string;die:number;mod:number;total:number;at:number;luck?:boolean;misfortune?:boolean};
const ROLL_CHANNEL='cz.pirateborg.sheet/roll';

OBR.onReady(()=>{
  OBR.broadcast.onMessage(ROLL_CHANNEL,(event)=>{
    const r=event.data as RollEntry;
    if(!r || typeof r.die!=='number') return;
    const mod=r.mod>=0?`+${r.mod}`:`−${Math.abs(r.mod)}`;
    const special=r.luck?' — ŠTĚSTÍ':r.misfortune?' — SMŮLA':'';
    OBR.notification.show(`${r.character} — ${r.label}: ${r.die} ${mod} = ${r.total}${special}`,r.luck?'SUCCESS':r.misfortune?'WARNING':'INFO');
  });
});
