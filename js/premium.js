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

/* Exam-page fixes: remove account text from navigation and reliably build the question map. */
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
  let lastSignature='';

  function buildQuestionMap(){
    const grid=document.getElementById('questionGrid');
    const map=document.getElementById('answerMapGrid');
    const container=document.getElementById('quizContainer');
    const total=document.getElementById('totalQuestions');
    if(!grid||!map||!container) return;

    const blocks=Array.from(container.querySelectorAll('.question-block'));
    if(blocks.length<EXPECTED) return;

    const signature=blocks.slice(0,EXPECTED).map(b=>b.id).join('|');
    if(signature===lastSignature && grid.children.length===EXPECTED) return;
    lastSignature=signature;

    grid.innerHTML='';
    map.innerHTML='';
    if(total) total.textContent=String(EXPECTED);

    const buttons=[];
    const mapButtons=[];

    blocks.slice(0,EXPECTED).forEach((block,index)=>{
      const text=block.querySelector('.question-text');
      const match=text?.textContent.match(/^(\d+)/);
      const number=match?match[1]:String(index+1);

      const button=document.createElement('button');
      button.type='button';
      button.className='question-number';
      button.textContent=number;
      button.addEventListener('click',()=>block.scrollIntoView({behavior:'smooth',block:'start'}));
      grid.appendChild(button);
      buttons.push(button);

      const mapButton=document.createElement('button');
      mapButton.type='button';
      mapButton.className='answer-map-cell';
      mapButton.textContent=number;
      mapButton.addEventListener('click',()=>block.scrollIntoView({behavior:'smooth',block:'start'}));
      map.appendChild(mapButton);
      mapButtons.push(mapButton);
    });

    function answered(block){
      return [...block.querySelectorAll('input[type="radio"]')].some(i=>i.checked)
        || [...block.querySelectorAll('input[type="text"]')].some(i=>i.value.trim()!=='')
        || [...block.querySelectorAll('select')].some(s=>s.value!=='');
    }

    function updateStates(){
      blocks.slice(0,EXPECTED).forEach((block,index)=>{
        const isAnswered=answered(block);
        buttons[index]?.classList.toggle('answered',isAnswered);
        mapButtons[index]?.classList.toggle('answered',isAnswered);
        mapButtons[index]?.classList.toggle('correct',block.classList.contains('question-correct'));
        mapButtons[index]?.classList.toggle('incorrect',block.classList.contains('question-incorrect'));
      });
    }

    container.addEventListener('change',updateStates);
    container.addEventListener('input',updateStates);

    const current=document.getElementById('currentQuestion');
    if(window.IntersectionObserver){
      const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
        if(!entry.isIntersecting) return;
        const index=blocks.indexOf(entry.target);
        if(index<0||index>=EXPECTED) return;
        buttons.forEach((b,n)=>b.classList.toggle('current',n===index));
        mapButtons.forEach((b,n)=>b.classList.toggle('current',n===index));
        if(current) current.textContent=String(index+1);
      }),{root:null,rootMargin:'-18% 0px -62% 0px',threshold:0});
      blocks.slice(0,EXPECTED).forEach(block=>observer.observe(block));
    }

    updateStates();
  }

  const observer=new MutationObserver(buildQuestionMap);
  const start=()=>{
    const container=document.getElementById('quizContainer');
    if(container) observer.observe(container,{childList:true,subtree:true});
    buildQuestionMap();
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
