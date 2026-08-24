(function () {
  'use strict';

  function expression(value) {
    let s = String(value ?? '')
      .trim().replace(/\s+/g, '').replace(/,/g, '.')
      .replace(/[−–—]/g, '-').replace(/×/g, '*').replace(/÷/g, '/')
      .replace(/π|\\pi/g, 'Math.PI').replace(/\$+/g, '')
      .replace(/\\left|\\right/g, '');

    s = s.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '($1)/($2)')
      .replace(/\\sqrt\{([^{}]+)\}/g, 'sqrt($1)')
      .replace(/\\sqrt/g, 'sqrt').replace(/√/g, 'sqrt')
      .replace(/\^\{([^{}]+)\}/g, '^($1)').replace(/\^\(([^()]*)\)/g, '^($1)')
      .replace(/sqrt\(/g, 'Math.sqrt(')
      .replace(/(\d|\))(?=Math\.sqrt|\()/g, '$1*')
      .replace(/\^/g, '**');

    if (!/^[0-9+\-*/().A-Za-z_]+$/.test(s)) return null;
    if (/\b(?:constructor|prototype|window|document|Function|eval|alert)\b/.test(s)) return null;

    try {
      const result = Function('"use strict"; return (' + s + ');')();
      return Number.isFinite(result) ? result : null;
    } catch (_) { return null; }
  }

  function equivalent(a, b) {
    const x = expression(a), y = expression(b);
    return x !== null && y !== null && Math.abs(x - y) < 1e-9 * Math.max(1, Math.abs(x), Math.abs(y));
  }

  function prepare() {
    if (!Array.isArray(window.questions)) return;
    window.questions.forEach(q => {
      if (q.type !== 'open_ended' || !Array.isArray(q.subQuestions)) return;
      q.subQuestions.forEach(sub => {
        const input = document.querySelector(`input[data-question-id="${q.id}"][data-sub-id="${sub.id}"]`);
        if (input && input.value.trim() && equivalent(input.value, sub.correctAnswer)) {
          input.value = String(sub.correctAnswer);
        }
      });
    });
  }

  function attach() {
    const button = document.getElementById('submitBtn');
    if (!button || button.dataset.expressionFixAttached === '1') return;
    button.dataset.expressionFixAttached = '1';
    button.addEventListener('click', prepare, true);
  }

  window.NetijaMathEquivalent = { expression, equivalent, prepare };
  attach();
  document.addEventListener('netija:quizRendered', attach);
  new MutationObserver(attach).observe(document.body, { childList: true, subtree: true });
})();
