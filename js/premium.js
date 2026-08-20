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
  if(!user?.email) return { premium: false, premiumUntil: null, subscriptionStatus: 'inactive' };
  const r = await fetch(`${BACKEND_URL}/api/premium/status?email=${encodeURIComponent(user.email)}`);
  if(!r.ok) return { premium: false, premiumUntil: null, subscriptionStatus: 'inactive' };
  return r.json();
}

export async function createPaymeOrder(plan = 'monthly'){
  const user = getCurrentUser();
  if (!user?.email) throw new Error('LOGIN_REQUIRED');
  if (!['monthly', 'yearly'].includes(plan)) throw new Error('INVALID_PLAN');

  const r = await fetch(`${BACKEND_URL}/api/payments/payme/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: user.email, plan })
  });

  const data = await r.json().catch(() => ({}));
  if(!r.ok) throw new Error(data.error || 'PAYMENT_ORDER_FAILED');
  return data;
}

export async function openPaymePayment(plan = 'monthly'){
  const order = await createPaymeOrder(plan);
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

export async function cancelPremium(){ throw new Error('CANCEL_NOT_AVAILABLE'); }
export async function resumePremium(){ throw new Error('RESUME_NOT_AVAILABLE'); }

export function setupRewardedResultGate({onReward}){
  let rewardedReady=false, rewardedSlot=null;
  window.googletag=window.googletag||{cmd:[]};
  googletag.cmd.push(()=>{
    rewardedSlot=googletag.defineOutOfPageSlot('/YOUR_AD_MANAGER_NETWORK_ID/netija_rewarded',googletag.enums.OutOfPageFormat.REWARDED);
    if(!rewardedSlot) return;
    rewardedSlot.addService(googletag.pubads());
    googletag.pubads().addEventListener('rewardedSlotReady',e=>{ if(e.slot===rewardedSlot){ rewardedReady=true; window.dispatchEvent(new CustomEvent('netija:rewarded-ready')); } });
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

/* Exam-page fixes: load the dedicated exam CSS and repair the 34/35 matching items. */
(function initExamFixes(){
  if(!document.getElementById('questionGrid')) return;

  if(!document.getElementById('netija-exam-fixes-css')){
    const link=document.createElement('link');
    link.id='netija-exam-fixes-css';
    link.rel='stylesheet';
    link.href='exam-fixes.css';
    document.head.appendChild(link);
  }

  const EXPECTED=45;
  const resultByNumber=new Map();
  window.netijaExamResultByNumber=resultByNumber;

  function getBlocks(){
    return Array.from(document.querySelectorAll('#quizContainer .question-block'));
  }

  function findBlockForNumber(id){
    const direct=document.getElementById(`question-block-${id}`);
    if(direct) return direct;
    return getBlocks().find(block =>
      block.querySelector(`select[data-item-id="${id}"]`) ||
      Array.from(block.querySelectorAll('.sub-question-text')).some(el => new RegExp(`^\\s*${id}\\.`).test(el.textContent || ''))
    ) || null;
  }

  function isAnsweredForNumber(block,id){
    if(!block) return false;
    const matching=block.querySelector(`select[data-item-id="${id}"]`);
    if(matching) return matching.value !== '';
    const textInput=block.querySelector(`input[data-question-id="${id}"]`);
    if(textInput) return textInput.value.trim() !== '';
    return !!block.querySelector('input[type="radio"]:checked') ||
      Array.from(block.querySelectorAll('input[type="text"]')).some(i=>i.value.trim()!=='') ||
      Array.from(block.querySelectorAll('select')).some(s=>s.value!=='');
  }

  function patchQuestionMap(){
    const grid=document.getElementById('questionGrid');
    if(!grid) return;
    const buttons=Array.from(grid.querySelectorAll('.question-number'));
    if(buttons.length!==EXPECTED) return;

    for(let id=1;id<=EXPECTED;id++){
      const button=buttons[id-1];
      const block=findBlockForNumber(id);
      if(!button || !block) continue;

      button.disabled=false;
      button.classList.remove('missing');
      button.title=`Перейти к вопросу ${id}`;
      button.onclick=(event)=>{
        event.preventDefault();
        event.stopPropagation();
        block.scrollIntoView({behavior:'smooth',block:'start'});
      };

      const result=resultByNumber.get(String(id)) || resultByNumber.get(id);
      const answered=isAnsweredForNumber(block,id);
      button.classList.toggle('answered',answered && !window.quizSubmitted);
      button.classList.toggle('correct',!!result && result.isCorrect===true);
      button.classList.toggle('incorrect',!!result && result.isCorrect===false);
    }
  }

  function captureResults(event){
    const details=event?.detail?.details || [];
    resultByNumber.clear();
    details.forEach(item=>{
      resultByNumber.set(String(item.number),item);
      resultByNumber.set(item.number,item);
    });
    patchQuestionMap();
    requestAnimationFrame(patchQuestionMap);
    setTimeout(patchQuestionMap,100);
  }

  document.addEventListener('netija:quizRendered',()=>{
    setTimeout(patchQuestionMap,0);
    setTimeout(patchQuestionMap,100);
    setTimeout(patchQuestionMap,400);
  });
  document.addEventListener('netija:testSubmitted',captureResults);

  const observer=new MutationObserver(()=>patchQuestionMap());
  const start=()=>{
    const container=document.getElementById('quizContainer');
    if(container) observer.observe(container,{childList:true,subtree:true});
    patchQuestionMap();
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
