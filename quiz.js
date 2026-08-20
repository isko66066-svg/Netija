function initQuiz() {
  const quizContainer = document.getElementById("quizContainer");
  const submitBtn = document.getElementById("submitBtn");
  const resultBox = document.getElementById("resultBox");
  const timerEl = document.getElementById("timer");

  if (!quizContainer || typeof questions === "undefined") {
    console.error("Quiz: quizContainer или questions не найдены");
    return;
  }

  let testSubmitted = false;
  window.quizInProgress = true;
  window.quizSubmitted = false;

  function renderMath(element) {
    if (window.MathJax && typeof window.MathJax.typesetPromise === "function") {
      return window.MathJax.typesetPromise([element]).catch((error) =>
        console.error("MathJax error:", error),
      );
    }
    return Promise.resolve();
  }

  async function waitForMathJax() {
    if (window.MathJax && typeof window.MathJax.typesetPromise === "function")
      return;
    await new Promise((resolve) => {
      let attempts = 0;
      const check = setInterval(() => {
        attempts++;
        if (
          window.MathJax &&
          typeof window.MathJax.typesetPromise === "function"
        ) {
          clearInterval(check);
          resolve();
        }
        if (attempts >= 100) {
          clearInterval(check);
          resolve();
        }
      }, 50);
    });
  }

  window.addEventListener("beforeunload", function (e) {
    if (!testSubmitted) {
      e.preventDefault();
      e.returnValue = "";
    }
  });

  let timeLeft = 2 * 60 * 60 + 30 * 60;
  let timerInterval;

  function updateTimerDisplay() {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    if (timerEl) {
      timerEl.textContent = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
      if (timeLeft <= 300) timerEl.classList.add("timer--warning");
    }
  }

  function startTimer() {
    updateTimerDisplay();
    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        submitTest();
        if (timerEl) timerEl.textContent = "Время вышло";
      }
    }, 1000);
  }

  function escapeHtmlOutsideMath(text) {
    if (!text) return "";
    return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function createMathText(className, text) {
    const element = document.createElement("p");
    element.className = className;
    element.innerHTML = escapeHtmlOutsideMath(text || "");
    return element;
  }

  function latexToPlainText(text) {
    if (!text) return "";
    let result = String(text);
    result = result.replace(/\$\$?/g, "");
    result = result.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, "$1/$2");
    result = result.replace(/\\sqrt\{([^{}]+)\}/g, "√$1");
    result = result.replace(/\\sqrt(\d+)/g, "√$1");
    result = result.replace(/\\operatorname\{([^{}]+)\}/g, "$1");
    result = result.replace(/[{}]/g, "");
    result = result.replace(/\\,|\\ /g, " ");
    return result.trim();
  }

  async function renderQuestions() {
    quizContainer.innerHTML = "";
    questions.forEach((q) => {
      const block = document.createElement("div");
      block.className = "question-block";
      block.id = `question-block-${q.id}`;
      block.appendChild(
        createMathText("question-text", `${q.id}. ${q.question || ""}`),
      );

      if (q.subtitle) {
        const subtitle = document.createElement("div");
        subtitle.className = "question-subtitle";
        subtitle.innerHTML = escapeHtmlOutsideMath(q.subtitle);
        block.appendChild(subtitle);
      }

      if (q.image) {
        const img = document.createElement("img");
        img.className = "question-image";
        img.src = q.image;
        img.alt = `Изображение к заданию ${q.id}`;
        block.appendChild(img);
      }

      if (q.type === "single_choice") {
        const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
        q.options.forEach((option, optIndex) => {
          const label = document.createElement("label");
          label.className = "option-label";
          const input = document.createElement("input");
          input.type = "radio";
          input.name = `q-${q.id}`;
          input.value = optIndex;
          label.appendChild(input);
          const optionText = document.createElement("span");
          optionText.innerHTML = escapeHtmlOutsideMath(
            `${letters[optIndex] || ""}) ${option}`,
          );
          label.appendChild(optionText);
          block.appendChild(label);
        });
      }

      if (q.type === "matching") {
        if (q.context) {
          const context = document.createElement("div");
          context.className = "matching-context";
          context.innerHTML = escapeHtmlOutsideMath(q.context);
          block.appendChild(context);
        }
        q.items.forEach((item) => {
          const itemBlock = document.createElement("div");
          itemBlock.className = "matching-item";
          const itemText = document.createElement("p");
          itemText.className = "sub-question-text";
          itemText.innerHTML = escapeHtmlOutsideMath(
            `${item.id}. ${item.text}`,
          );
          itemBlock.appendChild(itemText);
          const select = document.createElement("select");
          select.className = "matching-select";
          select.dataset.itemId = item.id;
          const emptyOption = document.createElement("option");
          emptyOption.value = "";
          emptyOption.textContent = "Выберите ответ";
          select.appendChild(emptyOption);
          Object.entries(q.optionsPool || {}).forEach(([letter, value]) => {
            const opt = document.createElement("option");
            opt.value = letter;
            opt.textContent = `${letter}) ${latexToPlainText(value)}`;
            select.appendChild(opt);
          });
          itemBlock.appendChild(select);
          block.appendChild(itemBlock);
        });
      }

      if (q.type === "open_ended") {
        q.subQuestions.forEach((sub) => {
          const subBlock = document.createElement("div");
          subBlock.className = "sub-question-item";
          const subText = document.createElement("p");
          subText.className = "sub-question-text";
          subText.innerHTML = escapeHtmlOutsideMath(sub.text || "");
          subBlock.appendChild(subText);
          const input = document.createElement("input");
          input.type = "text";
          input.className = "sub-question-input";
          input.placeholder = "Введите ответ";
          input.dataset.questionId = q.id;
          input.dataset.subId = sub.id;
          subBlock.appendChild(input);
          block.appendChild(subBlock);
        });
      }
      quizContainer.appendChild(block);
    });
    await waitForMathJax();
    await renderMath(quizContainer);
  }

  if (submitBtn) {
    submitBtn.addEventListener("click", () => {
      if (testSubmitted) return;
      const confirmed = window.confirm(
        "Вы уверены, что хотите завершить тест и проверить результат?",
      );
      if (!confirmed) return;
      submitTest();
    });
  } else console.error("Quiz: кнопка #submitBtn не найдена");

  function getCertificateGrade(score) {
    if (score < 44.0) return { level: "Не выдается", passed: false };
    if (score <= 49.99) return { level: "C", passed: true };
    if (score <= 54.99) return { level: "C+", passed: true };
    if (score <= 59.99) return { level: "B", passed: true };
    if (score <= 64.99) return { level: "B+", passed: true };
    if (score <= 69.99) return { level: "A", passed: true };
    return { level: "A+", passed: true };
  }

  function submitTest() {
    if (testSubmitted) return;
    testSubmitted = true;
    window.quizSubmitted = true;
    window.quizInProgress = false;
    clearInterval(timerInterval);
    let totalRawScore = 0;
    let correctFullTasksCount = 0;
    let totalTasksCount = 0;
    const details = [];

    questions.forEach((q) => {
      const block = document.getElementById(`question-block-${q.id}`);
      let questionCorrect = true;

      if (q.type === "single_choice") {
        totalTasksCount++;
        const questionPoints = q.points !== undefined ? q.points : 1.3;
        const selected = document.querySelector(
          `input[name="q-${q.id}"]:checked`,
        );
        const selectedValue = selected ? parseInt(selected.value) : null;
        const isCorrect = selectedValue === q.correctAnswer;
        if (isCorrect) {
          totalRawScore += questionPoints;
          correctFullTasksCount++;
        } else questionCorrect = false;
        details.push({
          number: q.id,
          isCorrect,
          answered: selectedValue !== null,
        });
        if (block) {
          const labels = block.querySelectorAll(".option-label");
          labels.forEach((label, idx) => {
            label.classList.remove("correct-answer", "wrong-answer");
            const input = label.querySelector("input");
            if (input) input.disabled = true;
            if (q.correctAnswer !== null && idx === q.correctAnswer)
              label.classList.add("correct-answer");
            else if (idx === selectedValue && !isCorrect)
              label.classList.add("wrong-answer");
          });
        }
      }

      if (q.type === "matching") {
        const matchingPoints = q.points !== undefined ? q.points : 2.2;
        let subItemsCorrect = true;
        q.items.forEach((item) => {
          totalTasksCount++;
          const select = block
            ? block.querySelector(`select[data-item-id="${item.id}"]`)
            : null;
          const selectedValue = select ? select.value : "";
          const isItemCorrect = selectedValue === item.correctAnswer;
          if (!isItemCorrect) subItemsCorrect = false;
          details.push({
            number: item.id,
            isCorrect: isItemCorrect,
            answered: selectedValue !== "",
          });
          if (select) {
            select.disabled = true;
            const parent = select.parentElement;
            const oldHint = parent.querySelector(".correct-hint");
            if (oldHint) oldHint.remove();
            if (!isItemCorrect) {
              const hint = document.createElement("span");
              hint.className = "correct-hint";
              const correctText =
                q.optionsPool && q.optionsPool[item.correctAnswer]
                  ? q.optionsPool[item.correctAnswer]
                  : "";
              hint.innerHTML = escapeHtmlOutsideMath(
                `Правильный ответ: ${item.correctAnswer}) ${correctText}`,
              );
              select.insertAdjacentElement("afterend", hint);
              renderMath(hint);
            }
          }
        });
        if (subItemsCorrect) {
          totalRawScore += matchingPoints;
          correctFullTasksCount++;
        } else questionCorrect = false;
      }

      if (q.type === "open_ended") {
        let partACorrect = false;
        let partBCorrect = false;
        const pointsA = 1.5;
        const pointsB = 1.7;
        q.subQuestions.forEach((sub) => {
          totalTasksCount++;
          const input = block
            ? block.querySelector(
                `input[data-question-id="${q.id}"][data-sub-id="${sub.id}"]`,
              )
            : null;
          const value = input ? input.value.trim() : "";
          const correctAnswer = sub.correctAnswer;
          const isSubCorrect =
            correctAnswer !== null &&
            correctAnswer !== undefined &&
            value !== "" &&
            value.toLowerCase() === String(correctAnswer).toLowerCase();
          if (sub.id === "a" && isSubCorrect) {
            totalRawScore += pointsA;
            partACorrect = true;
          }
          if (sub.id === "b" && isSubCorrect) {
            totalRawScore += pointsB;
            partBCorrect = true;
          }
          details.push({
            number: `${q.id}${sub.id}`,
            isCorrect: isSubCorrect,
            answered: value !== "",
          });
          if (input) {
            input.disabled = true;
            const oldHint = input.parentElement.querySelector(".correct-hint");
            if (oldHint) oldHint.remove();
            if (!isSubCorrect) {
              const hint = document.createElement("span");
              hint.className = "correct-hint";
              if (correctAnswer !== null && correctAnswer !== undefined)
                hint.innerHTML = escapeHtmlOutsideMath(
                  `Правильный ответ: ${correctAnswer}`,
                );
              else hint.textContent = "Правильный ответ не указан";
              input.insertAdjacentElement("afterend", hint);
              renderMath(hint);
            }
          }
        });
        if (!(partACorrect && partBCorrect)) questionCorrect = false;
        else correctFullTasksCount++;
      }

      if (block) {
        block.classList.remove("question-correct", "question-incorrect");
        block.classList.add(
          questionCorrect ? "question-correct" : "question-incorrect",
        );
      }
    });

    const maxRawScore = 64.2;
    let scaledScore = (totalRawScore / maxRawScore) * 100;
    if (scaledScore > 100) scaledScore = 100;
    const finalScore = Number(scaledScore.toFixed(2));
    const gradeInfo = getCertificateGrade(finalScore);

    const params = new URLSearchParams(window.location.search);
    const testId = params.get("id");
    const storageKey = `result_natcert-${testId}`;
    const currentResult = {
      score: finalScore,
      correctCount: correctFullTasksCount,
      total: totalTasksCount,
      level: gradeInfo.level,
    };
    const existingData = localStorage.getItem(storageKey);
    if (existingData) {
      try {
        const bestResult = JSON.parse(existingData);
        if (bestResult.score > finalScore) {
          currentResult.score = bestResult.score;
          currentResult.correctCount = bestResult.correctCount;
          currentResult.level = bestResult.level;
        }
      } catch (error) {
        console.error("Ошибка localStorage:", error);
      }
    }
    localStorage.setItem(storageKey, JSON.stringify(currentResult));
    renderResultBox(
      finalScore,
      correctFullTasksCount,
      totalTasksCount,
      gradeInfo,
      details,
    );
    if (resultBox)
      resultBox.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderResultBox(
    score,
    correctCount,
    totalCount,
    gradeInfo,
    details,
  ) {
    if (!resultBox) return;
    resultBox.innerHTML = "";
    resultBox.style.display = "block";
    const isPassed = gradeInfo.passed;
    const statusClass = isPassed
      ? "result-status--success"
      : "result-status--fail";
    const statusText = isPassed
      ? "🎉 Поздравляем! Сертификат получен"
      : "⚠️ Порог не пройден, попробуйте еще раз";
    const summary = document.createElement("div");
    summary.className = "result-summary-card";
    summary.innerHTML = `<div class="result-header"><h3>Итоги тестирования</h3><span class="result-status-badge ${statusClass}">${statusText}</span></div><div class="result-metrics"><div class="metric-item"><span class="metric-label">Итоговый балл</span><span class="metric-value">${score}</span></div><div class="metric-item"><span class="metric-label">Уровень</span><span class="metric-value highlight">${gradeInfo.level}</span></div><div class="metric-item"><span class="metric-label">Заданий верно</span><span class="metric-value">${correctCount}<small>/ ${totalCount}</small></span></div></div>`;
    resultBox.appendChild(summary);
    const gridTitle = document.createElement("h4");
    gridTitle.className = "result-grid-title";
    gridTitle.textContent = "Карта ответов по заданиям:";
    resultBox.appendChild(gridTitle);
    const grid = document.createElement("div");
    grid.className = "result-grid";
    details.forEach((item) => {
      const cell = document.createElement("div");
      cell.className = `result-cell ${item.isCorrect ? "result-cell--correct" : "result-cell--incorrect"}`;
      cell.textContent = item.number;
      if (!item.answered) {
        cell.classList.add("result-cell--empty");
        cell.title = "Вопрос без ответа";
      }
      grid.appendChild(cell);
    });
    resultBox.appendChild(grid);
    renderMath(resultBox);
  }

  renderQuestions();
  startTimer();
}
