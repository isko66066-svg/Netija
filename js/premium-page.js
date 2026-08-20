import { getPremiumStatus, openPaymePayment } from './premium.js';

function initPremiumPage(){
  const button = document.getElementById('premiumBuy');
  const status = document.getElementById('premiumStatus');
  if(!button || !status || button.dataset.initialized === 'true') return;
  button.dataset.initialized = 'true';
  let selectedPlan = 'monthly';

  document.querySelectorAll('.premium-plan').forEach(plan => {
    plan.addEventListener('click', () => {
      document.querySelectorAll('.premium-plan').forEach(x => x.classList.remove('active'));
      plan.classList.add('active');
      selectedPlan = plan.dataset.plan;
      refresh();
    });
  });

  function updateText(){
    button.textContent = selectedPlan === 'yearly' ? 'Купить Premium — 135 000 сум' : 'Купить Premium — 15 000 сум';
  }

  async function refresh(){
    const user = JSON.parse(localStorage.getItem('netija_user') || 'null');
    if(!user?.email){ button.disabled = true; button.textContent = 'Войдите через Google'; return; }
    button.disabled = false; updateText();
    try{
      const data = await getPremiumStatus();
      if(data.premium){
        button.disabled = true;
        button.textContent = 'Premium уже активен';
        status.className = 'premium-status ok';
        status.textContent = data.premiumUntil ? `Активен до ${new Date(data.premiumUntil).toLocaleDateString('ru-RU')}` : 'Premium активен';
      }else{
        status.className = 'premium-status';
        status.textContent = 'Premium не активен';
      }
    }catch(e){
      status.className = 'premium-status error';
      status.textContent = 'Не удалось проверить статус Premium';
    }
  }

  button.addEventListener('click', async () => {
    button.disabled = true;
    button.textContent = 'Создаём заказ...';
    status.textContent = '';
    try{
      await openPaymePayment(selectedPlan);
    }catch(e){
      button.disabled = false;
      updateText();
      status.className = 'premium-status error';
      status.textContent = e.message === 'LOGIN_REQUIRED' ? 'Сначала войдите через Google' : (e.message || 'Оплата пока не настроена');
    }
  });

  window.addEventListener('netija:auth-changed', refresh);
  refresh();
}

if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initPremiumPage, {once:true});
else initPremiumPage();
