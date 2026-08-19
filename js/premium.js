const BACKEND_URL = "https://netija.onrender.com";

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('netija_user') || 'null');
  } catch {
    return null;
  }
}

export async function getAccount(){
  const user = getCurrentUser();
  if (!user?.email) return null;
  const r = await fetch(`${BACKEND_URL}/api/me?email=${encodeURIComponent(user.email)}`);
  if(!r.ok) return null;
  return r.json();
}

export async function getPremiumStatus(){
  const user = getCurrentUser();
  if (!user?.email) return { premium: false, premiumUntil: null, subscriptionStatus: 'inactive' };
  const r = await fetch(`${BACKEND_URL}/api/premium/status?email=${encodeURIComponent(user.email)}`);
  if(!r.ok) return { premium: false, premiumUntil: null, subscriptionStatus: 'inactive' };
  return r.json();
}

export async function createPaymeOrder(){
  const user = getCurrentUser();
  if (!user?.email) throw new Error('LOGIN_REQUIRED');

  const r = await fetch(`${BACKEND_URL}/api/payments/payme/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: user.email })
  });

  const data = await r.json().catch(() => ({}));
  if(!r.ok) throw new Error(data.error || 'PAYMENT_ORDER_FAILED');
  return data;
}

export async function openPaymePayment(){
  const order = await createPaymeOrder();

  // Payme Checkout expects the merchant, amount and account in the URL payload.
  const payload = [
    `m=${order.merchant}`,
    `ac.order_id=${order.orderId}`,
    `a=${order.amount}`
  ].join(';');

  const encoded = btoa(unescape(encodeURIComponent(payload)));
  const url = `https://checkout.paycom.uz/${encoded}`;
  window.location.href = url;
  return order;
}

// Backwards-compatible aliases used by existing UI code.
export async function cancelPremium(){
  throw new Error('CANCEL_NOT_AVAILABLE');
}

export async function resumePremium(){
  throw new Error('RESUME_NOT_AVAILABLE');
}

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
        const user=getCurrentUser();
        if(!user?.email) return;
        const tokenRes=await fetch(`${BACKEND_URL}/api/reward/claim-token`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:user.email})});
        const tokenData=await tokenRes.json();
        if(!tokenData.claimToken) return;
        const consume=await fetch(`${BACKEND_URL}/api/reward/consume`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({claimToken:tokenData.claimToken,email:user.email})});
        if(consume.ok) onReward();
      }catch(err){ console.error(err); }
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
