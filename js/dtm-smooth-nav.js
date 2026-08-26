(() => {
    const root = document.getElementById("dtmTest");
    if (!root) return;

    root.addEventListener("click", event => {
        const button = event.target.closest(".dtm-nav-number");
        if (!button || !root.contains(button)) return;

        const index = Number(button.dataset.question);
        if (!Number.isInteger(index)) return;

        const target = document.getElementById(`dtm-question-${index}`);
        if (!target) return;

        // The main test script also has a navigation handler. Intercept it here
        // so navigation stays smooth without rebuilding or re-rendering the test.
        event.preventDefault();
        event.stopImmediatePropagation();

        const top = target.getBoundingClientRect().top + window.scrollY - 24;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }, true);
})();
