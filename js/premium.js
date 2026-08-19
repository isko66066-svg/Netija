/* Netija Premium client.
   Replace /api endpoints only if your existing auth/router uses a different base path. */
export async function getAccount(){ const r=await fetch('/api/me',{credentials:'include'}); if(!r.ok) return null; return r.json(); }
export async function cancelPremium(immediate=false){ const r=await fetch('/api/subscription/cancel',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'include',body:JSON.stringify({immediate})}); if(!r.ok) throw new Error((await r.json()).error||'CANCEL_FAILED'); return r.json(); }
export async function resumePremium(){ const r=await fetch('/api/subscription/resume',{method:'POST',credentials:'include'}); if(!r.ok) throw new Error('RESUME_FAILED'); return r.json(); }

export function setupRewardedResultGate({onReward}){
  let rewardedReady=false, rewardedSlot=null;
  window.googletag=window.googletag||{cmd:[]};
  googletag.cmd.push(()=>{
    rewardedSlot=googletag.defineOutOfPageSlot('/YOUR_AD_MANAGER_NETWORK_ID/netija_rewarded',googletag.enums.OutOfPageFormat.REWARDED);
    if(!rewardedSlot) return;
    rewardedSlot.addService(googletag.pubads());
    googletag.pubads().addEventListener('rewardedSlotReady',e=>{
      if(e.slot===rewardedSlot){ rewardedReady=true; window.dispatchEvent(new CustomEvent('netija:rewarded-ready')); }
    });
    googletag.pubads().addEventListener('rewardedSlotGranted',async e=>{
      if(e.slot!==rewardedSlot) return;
      try{
        const tokenRes=await fetch('/api/reward/claim-token',{method:'POST',credentials:'include'});
        const {claimToken}=await tokenRes.json();
        const consume=await fetch('/api/reward/consume',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'include',body:JSON.stringify({claimToken})});
        if(consume.ok) onReward();
      } catch(err){ console.error(err); }
    });
    googletag.pubads().addEventListener('rewardedSlotClosed',e=>{ if(e.slot===rewardedSlot){googletag.destroySlots([rewardedSlot]); rewardedSlot=null; rewardedReady=false;} });
    googletag.enableServices();
    googletag.display(rewardedSlot);
  });
  return {show(){
    if(!rewardedReady||!rewardedSlot) return false;
    googletag.cmd.push(()=>googletag.pubads().addEventListener('rewardedSlotReady',e=>{if(e.slot===rewardedSlot)e.makeRewardedVisible()}));
    return true;
  }};
}
