(function () {
    'use strict';

    if (!document.body || !document.body.classList.contains('exam-body')) return;

    function injectStyles() {
        if (document.getElementById('netija-exam-ui-fixes')) return;

        const style = document.createElement('style');
        style.id = 'netija-exam-ui-fixes';
        style.textContent = `
            @media (max-width: 700px) {
                .exam-body { padding-bottom: 0 !important; }
                .exam-page { padding-bottom: 150px !important; }
                .questions-sidebar {
                    position: static !important;
                    max-height: none !important;
                    overflow: visible !important;
                    padding-bottom: 14px !important;
                }
                .exam-sidebar-controls {
                    position: fixed !important;
                    left: 10px !important;
                    right: 10px !important;
                    bottom: max(8px, env(safe-area-inset-bottom)) !important;
                    z-index: 3000 !important;
                    margin: 0 !important;
                    padding: 8px !important;
                    display: grid !important;
                    grid-template-columns: minmax(0, 1fr) minmax(0, 1.35fr) !important;
                    gap: 8px !important;
                    align-items: stretch !important;
                    background: rgba(255,255,255,.96) !important;
                    backdrop-filter: blur(14px) !important;
                    -webkit-backdrop-filter: blur(14px) !important;
                    border: 1px solid #dfe6ef !important;
                    border-radius: 14px !important;
                    box-shadow: 0 10px 35px rgba(15,23,42,.20) !important;
                }
                .sidebar-timer {
                    min-height: 52px !important;
                    margin: 0 !important;
                    padding: 7px 10px !important;
                    border-radius: 10px !important;
                }
                .sidebar-timer strong { font-size: 15px !important; }
                .sidebar-timer small { font-size: 9px !important; }
                .finish-test {
                    min-height: 52px !important;
                    padding: 9px 10px !important;
                    border-radius: 10px !important;
                    font-size: 12px !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    function getQuestionId(block, fallback) {
        const idMatch = block && block.id && block.id.match(/question-block-(\d+)/);
        if (idMatch) return Number(idMatch[1]);
        const text = block && block.querySelector('.question-text');
        const match = text && text.textContent.match(/^\s*(\d+)\./);
        return match ? Number(match[1]) : fallback;
    }

    function getEntries() {
        const blocks = Array.from(document.querySelectorAll('#quizContainer .question-block'));
        const entries = new Map();

        blocks.forEach((block, index) => {
            const qId = getQuestionId(block, index + 1);
            entries.set(qId, { id: qId, block, item: null });

            // Matching tasks contain sub-questions (for example 34 and 35)
            // inside the same question block. They must still get their own cells.
            block.querySelectorAll('.matching-item').forEach(itemBlock => {
                const select = itemBlock.querySelector('select[data-item-id]');
                const text = itemBlock.querySelector('.sub-question-text');
                const idMatch = (select && select.dataset.itemId || text && text.textContent || '').match(/\d+/);
                if (!idMatch) return;
                const itemId = Number(idMatch[0]);
                entries.set(itemId, { id: itemId, block, item: itemBlock });
            });
        });

        return entries;
    }

    function isAnswered(entry) {
        if (!entry) return false;
        const block = entry.block;
        if (entry.item) {
            const select = entry.item.querySelector('select');
            return !!select && select.value !== '';
        }
        return Array.from(block.querySelectorAll('input[type="radio"]')).some(input => input.checked)
            || Array.from(block.querySelectorAll('input[type="text"]')).some(input => input.value.trim() !== '')
            || Array.from(block.querySelectorAll('select')).some(select => select.value !== '');
    }

    function isCorrect(entry) {
        if (!entry || !window.quizSubmitted) return false;
        if (entry.item && typeof questions !== 'undefined') {
            const q = questions.find(question => question.type === 'matching'
                && Array.isArray(question.items)
                && question.items.some(item => Number(item.id) === entry.id));
            const item = q && q.items.find(x => Number(x.id) === entry.id);
            const select = entry.item.querySelector('select[data-item-id]');
            return !!item && !!select && select.value === item.correctAnswer;
        }
        return entry.block.classList.contains('question-correct');
    }

    function isIncorrect(entry) {
        return !!entry && !!window.quizSubmitted && !isCorrect(entry);
    }

    function buildQuestionGrid() {
        const grid = document.getElementById('questionGrid');
        if (!grid) return;

        const entries = getEntries();
        const expected = Number(document.body.dataset.questionCount) || 45;
        const buttons = [];

        grid.innerHTML = '';

        for (let id = 1; id <= expected; id++) {
            const entry = entries.get(id);
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'question-number';
            button.textContent = String(id);

            if (!entry) {
                button.classList.add('missing');
                button.disabled = true;
            } else {
                button.addEventListener('click', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    const target = entry.item || entry.block;
                    const header = document.querySelector('.site-header, .header, .exam-header');
                    const headerHeight = header ? header.getBoundingClientRect().height : 0;
                    const rect = target.getBoundingClientRect();
                    const y = Math.max(0, window.scrollY + rect.top - headerHeight - 12);
                    window.scrollTo({ top: y, behavior: 'smooth' });
                });
            }

            grid.appendChild(button);
            buttons.push(button);
        }

        function refresh() {
            const currentText = document.getElementById('currentQuestion');
            buttons.forEach((button, index) => {
                const entry = entries.get(index + 1);
                button.classList.toggle('missing', !entry);
                button.classList.toggle('answered', !!entry && isAnswered(entry) && !window.quizSubmitted);
                button.classList.toggle('correct', !!entry && isCorrect(entry));
                button.classList.toggle('incorrect', !!entry && isIncorrect(entry));
            });
            if (currentText && !currentText.textContent) currentText.textContent = '1';
        }

        grid.__netijaRefresh = refresh;
        grid.__netijaEntries = entries;
        refresh();

        const container = document.getElementById('quizContainer');
        if (container && !container.dataset.examFixListeners) {
            container.addEventListener('change', refresh);
            container.addEventListener('input', refresh);
            container.dataset.examFixListeners = '1';
        }

        document.addEventListener('netija:testSubmitted', refresh, { once: false });
    }

    function init() {
        injectStyles();
        buildQuestionGrid();

        document.addEventListener('netija:quizRendered', function () {
            buildQuestionGrid();
        });

        document.addEventListener('netija:testSubmitted', function () {
            const grid = document.getElementById('questionGrid');
            if (grid && typeof grid.__netijaRefresh === 'function') grid.__netijaRefresh();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
