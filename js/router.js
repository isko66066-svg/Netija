// Netija navigation guard
//
// IMPORTANT: test pages must be opened as real documents. The old SPA router
// replaced only <main>, so natcert-test.html kept the previous page header and
// its page-specific CSS was not reloaded. That caused the test page to look
// broken until a manual refresh.

window.quizInProgress = window.quizInProgress === true;
window.quizSubmitted = window.quizSubmitted === true;

function isActiveQuiz() {
    return window.quizInProgress === true && window.quizSubmitted !== true;
}

window.addEventListener('beforeunload', function (event) {
    if (!isActiveQuiz()) return;
    event.preventDefault();
    event.returnValue = '';
});

// Do not intercept internal .html navigation.
// Let the browser load the complete document so that:
// - the correct header is rendered;
// - style.css/test.css are loaded normally;
// - page-specific scripts start once, in the correct order;
// - stale SPA DOM/CSS cannot remain on the screen.
//
// We intentionally keep this file as a navigation guard only.
