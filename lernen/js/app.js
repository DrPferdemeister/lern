(function () {
  const KEY = "qb1-bonn-lernen-v1";
  const data = window.QB1;
  const main = document.getElementById("main");
  const nav = document.getElementById("nav");
  const side = document.getElementById("side");
  const toggle = document.getElementById("nav-toggle");
  const backdrop = document.getElementById("nav-backdrop");
  const topProgress = document.getElementById("top-progress");

  const state = load();
  let quizFilter = 0;
  let quizIndex = 0;

  function load() {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || "{}");
      return {
        last: raw.last || "start",
        read: raw.read || {},
        sessions: raw.sessions || {},
        quiz: raw.quiz || {},
        cards: raw.cards || {}
      };
    } catch (err) {
      return { last: "start", read: {}, sessions: {}, quiz: {}, cards: {} };
    }
  }

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
    paintNav();
  }

  function chapterById(id) {
    return data.chapters.filter(function (chapter) { return chapter.id === id; })[0] || data.chapters[0];
  }

  function addRich(parent, text) {
    const re = /\*\*(.+?)\*\*/g;
    let last = 0;
    let match = re.exec(text);
    while (match) {
      parent.appendChild(document.createTextNode(text.slice(last, match.index)));
      parent.appendChild(el("strong", match[1]));
      last = match.index + match[0].length;
      match = re.exec(text);
    }
    parent.appendChild(document.createTextNode(text.slice(last)));
  }

  function el(tag, text) {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    return node;
  }

  function paintNav() {
    nav.replaceChildren();
    data.chapters.forEach(function (chapter) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = chapter.nav;
      if (chapter.id === state.last) button.setAttribute("aria-current", "page");
      if (state.read[chapter.id]) button.classList.add("is-read");
      const tick = document.createElement("span");
      tick.className = "tick";
      tick.setAttribute("aria-hidden", "true");
      button.appendChild(tick);
      button.addEventListener("click", function () { show(chapter.id); });
      nav.appendChild(button);
    });
    const done = data.sessions.filter(function (session) { return state.sessions[session.id]; }).length;
    topProgress.textContent = done + " von 8 Sitzungen";
  }

  function setMenu(open) {
    side.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    backdrop.hidden = !open;
    document.body.classList.toggle("nav-open", open);
  }

  function show(id) {
    state.last = id;
    save();
    setMenu(false);
    if (id === "quiz") renderQuiz();
    else renderChapter(chapterById(id));
    main.focus();
  }

  function renderChapter(chapter) {
    main.replaceChildren();
    main.appendChild(el("p", chapter.kicker)).className = "kicker";
    main.appendChild(el("h2", chapter.title));
    chapter.blocks.forEach(function (block) {
      if (block.type === "p" || block.type === "note") {
        const node = document.createElement(block.type === "note" ? "div" : "p");
        if (block.type === "note") node.className = "note";
        if (block.type === "p" && chapter.id === "start") node.className = "lead";
        addRich(node, block.text);
        main.appendChild(node);
      } else if (block.type === "ul") {
        const list = document.createElement("ul");
        block.items.forEach(function (item) {
          const li = document.createElement("li");
          addRich(li, item);
          list.appendChild(li);
        });
        main.appendChild(list);
      } else if (block.type === "table") {
        const wrap = document.createElement("div");
        wrap.className = "table-wrap";
        const table = document.createElement("table");
        const head = document.createElement("tr");
        block.head.forEach(function (cell) { head.appendChild(el("th", cell)); });
        table.appendChild(document.createElement("thead")).appendChild(head);
        const body = document.createElement("tbody");
        block.rows.forEach(function (row) {
          const tr = document.createElement("tr");
          row.forEach(function (cell) { tr.appendChild(el("td", cell)); });
          body.appendChild(tr);
        });
        table.appendChild(body);
        wrap.appendChild(table);
        main.appendChild(wrap);
      } else if (block.type === "formula") {
        main.appendChild(el("p", block.text)).className = "formula";
      } else if (block.type === "plain") {
        const box = document.createElement("section");
        box.className = "plain";
        box.appendChild(el("h3", "In einfachen Worten"));
        block.items.forEach(function (item) {
          const paragraph = document.createElement("p");
          addRich(paragraph, item);
          box.appendChild(paragraph);
        });
        main.appendChild(box);
      } else if (block.type === "words") {
        const details = document.createElement("details");
        details.className = "words";
        const summary = document.createElement("summary");
        summary.textContent = block.title || "Schwere Wörter";
        details.appendChild(summary);
        const list = document.createElement("dl");
        block.items.forEach(function (item) {
          list.appendChild(el("dt", item.word));
          const meaning = document.createElement("dd");
          addRich(meaning, item.text);
          list.appendChild(meaning);
        });
        details.appendChild(list);
        main.appendChild(details);
      } else if (block.type === "groups") {
        block.items.forEach(function (group) {
          const details = document.createElement("details");
          details.className = "sheet-group";
          const summary = document.createElement("summary");
          summary.textContent = group.title;
          details.appendChild(summary);
          group.cards.forEach(function (card) {
            const article = document.createElement("article");
            article.className = "sheet-card";
            article.appendChild(el("h3", card.term));
            const paragraph = document.createElement("p");
            addRich(paragraph, card.text);
            article.appendChild(paragraph);
            if (card.formula) article.appendChild(el("p", card.formula)).className = "formula";
            details.appendChild(article);
          });
          main.appendChild(details);
        });
      } else if (block.type === "widget") {
        const box = document.createElement("div");
        box.className = "widget";
        main.appendChild(box);
        const extra = {};
        if (block.name === "designs") extra.items = data.designItems;
        if (block.name === "match") extra.pairs = data.matchPairs;
        if (block.name === "cards") {
          extra.cards = data.cards;
          extra.onRate = function (front, ok) {
            state.cards[front] = ok;
            save();
          };
        }
        window.QB1Widgets.mount(block.name, box, extra);
      }
    });
    if (chapter.id === "start") renderSessions();
    if (chapter.id !== "quiz") renderFooter(chapter);
  }

  function renderSessions() {
    const list = document.createElement("ol");
    list.className = "sessions";
    data.sessions.forEach(function (session) {
      const item = document.createElement("li");
      const box = document.createElement("input");
      box.type = "checkbox";
      box.checked = Boolean(state.sessions[session.id]);
      box.setAttribute("aria-label", session.title);
      box.addEventListener("change", function () {
        state.sessions[session.id] = box.checked;
        save();
      });
      const title = el("span", session.title);
      title.className = "who";
      const detail = document.createElement("div");
      detail.className = "detail";
      detail.appendChild(document.createTextNode(session.detail + " "));
      const open = document.createElement("button");
      open.type = "button";
      open.className = "linkish";
      open.textContent = "Zum Kapitel";
      open.addEventListener("click", function () { show(session.chapter); });
      detail.appendChild(open);
      item.appendChild(box);
      item.appendChild(title);
      item.appendChild(detail);
      list.appendChild(item);
    });
    main.appendChild(el("h3", "Acht Sitzungen"));
    main.appendChild(list);
    const reset = document.createElement("button");
    reset.type = "button";
    reset.className = "btn secondary";
    reset.textContent = "Fortschritt löschen";
    reset.addEventListener("click", function () {
      localStorage.removeItem(KEY);
      state.last = "start";
      state.read = {};
      state.sessions = {};
      state.quiz = {};
      state.cards = {};
      show("start");
    });
    main.appendChild(el("div", "")).className = "row-actions";
    main.lastChild.appendChild(reset);
  }

  function renderFooter(chapter) {
    const row = document.createElement("div");
    row.className = "row-actions";
    const mark = document.createElement("button");
    mark.type = "button";
    mark.className = "btn";
    mark.textContent = state.read[chapter.id] ? "Als gelesen gespeichert" : "Kapitel abhaken";
    mark.addEventListener("click", function () {
      state.read[chapter.id] = !state.read[chapter.id];
      save();
      mark.textContent = state.read[chapter.id] ? "Als gelesen gespeichert" : "Kapitel abhaken";
    });
    row.appendChild(mark);
    const index = data.chapters.findIndex(function (item) { return item.id === chapter.id; });
    const next = data.chapters[index + 1];
    if (next) {
      const forward = document.createElement("button");
      forward.type = "button";
      forward.className = "btn secondary";
      forward.textContent = "Weiter: " + next.nav;
      forward.addEventListener("click", function () { show(next.id); });
      row.appendChild(forward);
    }
    main.appendChild(row);
  }

  function filteredQuiz() {
    return data.quiz.filter(function (question) {
      return !quizFilter || question.block === quizFilter;
    });
  }

  function renderQuiz() {
    const questions = filteredQuiz();
    if (quizIndex >= questions.length) quizIndex = 0;
    main.replaceChildren();
    main.appendChild(el("p", "Übungsblöcke")).className = "kicker";
    main.appendChild(el("h2", "Klausurtrainer"));
    main.appendChild(el("p", "Eine Antwort wählen, dann abschicken. Die Erklärung kommt danach. Die ROC-Aufgabe aus Block 2 braucht die Abbildung auf der Folie; Sensitivität und Spezifität übst du im Kapitel Diagnostik."));
    const chips = document.createElement("div");
    chips.className = "chips";
    [[0, "Alle"], [1, "Block 1"], [2, "Block 2"], [3, "Block 3"]].forEach(function (pair) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = pair[1];
      button.setAttribute("aria-pressed", quizFilter === pair[0] ? "true" : "false");
      button.addEventListener("click", function () {
        quizFilter = pair[0];
        quizIndex = 0;
        renderQuiz();
      });
      chips.appendChild(button);
    });
    main.appendChild(chips);

    const answered = data.quiz.filter(function (q) { return state.quiz[q.id] && state.quiz[q.id].submitted; });
    const correct = answered.filter(function (q) { return state.quiz[q.id].choice === q.answer; }).length;
    main.appendChild(el("p", correct + " richtig von " + answered.length + " beantworteten, " + data.quiz.length + " Aufgaben insgesamt.")).className = "hint";

    const question = questions[quizIndex];
    if (!question) return;
    const saved = state.quiz[question.id] || {};
    const card = document.createElement("article");
    card.className = "q-card";
    card.appendChild(el("p", "Block " + question.block + " · " + (quizIndex + 1) + " von " + questions.length)).className = "q-meta";
    card.appendChild(el("h3", question.title));
    const prompt = document.createElement("p");
    addRich(prompt, question.prompt);
    card.appendChild(prompt);
    const options = document.createElement("div");
    options.className = "options";
    options.setAttribute("role", "radiogroup");
    let choice = saved.choice === undefined ? null : saved.choice;
    question.options.forEach(function (text, index) {
      const button = document.createElement("button");
      button.type = "button";
      button.setAttribute("role", "radio");
      button.textContent = (index + 1) + ". " + text;
      if (choice === index) button.setAttribute("aria-checked", "true");
      if (saved.submitted && index === question.answer) button.classList.add("is-correct");
      if (saved.submitted && choice === index && index !== question.answer) button.classList.add("is-wrong");
      button.disabled = Boolean(saved.submitted);
      button.addEventListener("click", function () {
        choice = index;
        state.quiz[question.id] = { choice: index, submitted: false };
        save();
        renderQuiz();
      });
      options.appendChild(button);
    });
    card.appendChild(options);
    if (saved.submitted) {
      const explain = document.createElement("p");
      explain.className = "explain " + (saved.choice === question.answer ? "ok" : "bad");
      explain.textContent = (saved.choice === question.answer ? "Richtig. " : "Noch nicht. ") + question.why;
      card.appendChild(explain);
    }
    const actions = document.createElement("div");
    actions.className = "q-nav";
    const back = document.createElement("button");
    back.type = "button";
    back.className = "btn secondary";
    back.textContent = "Zurück";
    back.disabled = quizIndex === 0;
    back.addEventListener("click", function () {
      quizIndex -= 1;
      renderQuiz();
    });
    const submit = document.createElement("button");
    submit.type = "button";
    submit.className = "btn";
    submit.textContent = saved.submitted ? "Nochmal antworten" : "Antwort abschicken";
    submit.disabled = !saved.submitted && choice === null;
    submit.addEventListener("click", function () {
      if (saved.submitted) {
        delete state.quiz[question.id];
      } else {
        state.quiz[question.id] = { choice: choice, submitted: true };
        if (answered.length + 1 === data.quiz.length) state.read.quiz = true;
      }
      save();
      renderQuiz();
    });
    const next = document.createElement("button");
    next.type = "button";
    next.className = "btn secondary";
    next.textContent = "Weiter";
    next.disabled = quizIndex >= questions.length - 1;
    next.addEventListener("click", function () {
      quizIndex += 1;
      renderQuiz();
    });
    actions.appendChild(back);
    actions.appendChild(submit);
    actions.appendChild(next);
    card.appendChild(actions);
    main.appendChild(card);
  }

  toggle.addEventListener("click", function () {
    setMenu(!side.classList.contains("is-open"));
  });
  backdrop.addEventListener("click", function () { setMenu(false); });

  paintNav();
  show(state.last);
}());
