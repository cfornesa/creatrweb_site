// app.js — Creatrweb vanilla JS: clock, nav, terminal

(function () {
  "use strict";

  // ─── Page identity ───────────────────────────────────────────────────────────

  var pathname = document.body.dataset.pathname || "/";

  var titles = {
    "/": "Home",
    "/projects": "Studio Journal",
    "/readme": "Readme",
    "/indieweb-platform": "IndieWeb Platform",
    "/creatrweb-rag": "Creatrweb RAG",
    "/terminal-ui": "Terminal UI",
  };

  var backUrls = {
    "/": "https://augmenthumankind.com",
    "/projects": "/",
    "/readme": "/",
    "/indieweb-platform": "/projects",
    "/creatrweb-rag": "/projects",
    "/terminal-ui": "/projects",
  };

  // ─── Clock ───────────────────────────────────────────────────────────────────

  function startClock(el) {
    if (!el) return;
    function tick() {
      var now = new Date();
      el.setAttribute("datetime", now.toISOString());
      el.textContent =
        String(now.getUTCHours()).padStart(2, "0") +
        ":" +
        String(now.getUTCMinutes()).padStart(2, "0") +
        " UTC";
    }
    tick();
    setInterval(tick, 60000);
  }

  // ─── Desktop toolbar ─────────────────────────────────────────────────────────

  var toolbarTitle = document.querySelector(".desktop-toolbar-title");
  if (toolbarTitle) {
    toolbarTitle.textContent = titles[pathname] || "Creatrweb";
  }

  var toolbarTime = document.querySelector(".desktop-toolbar-time");
  startClock(toolbarTime);

  // ─── Mobile clock ─────────────────────────────────────────────────────────────

  startClock(document.getElementById("mobile-clock"));

  // ─── Mobile nav pill ─────────────────────────────────────────────────────────

  var pillBack = document.getElementById("pill-back");
  if (pillBack) {
    pillBack.href = backUrls[pathname] || "/";
  }

  var pillTitle = document.querySelector(".pill-title");
  if (pillTitle) {
    pillTitle.textContent = titles[pathname] || "Creatrweb";
  }

  // ─── Terminal dialog ─────────────────────────────────────────────────────────

  var terminalHistory = [
    "Welcome to Creatrweb Terminal OS v1.0",
    "Type 'help' for commands.",
  ];
  var isTyping = false;
  var terminalEl = null;
  var lastFocusedElement = null;
  var terminalStatusText = "";
  var terminalTriggers = Array.prototype.slice.call(
    document.querySelectorAll("#terminal-trigger, #pill-chat")
  );

  function setTerminalExpanded(isExpanded) {
    terminalTriggers.forEach(function (trigger) {
      trigger.setAttribute("aria-expanded", isExpanded ? "true" : "false");
    });
  }

  function updateTerminalStatus(message) {
    terminalStatusText = message;
    var status = document.getElementById("terminal-status");
    if (status) {
      status.textContent = message;
    }
  }

  function renderHistory() {
    var body = document.getElementById("terminal-body");
    if (!body) return;
    body.setAttribute("aria-busy", isTyping ? "true" : "false");
    body.innerHTML = "";
    terminalHistory.forEach(function (line) {
      var div = document.createElement("div");
      div.className = "terminal-line";
      div.textContent = line;
      body.appendChild(div);
    });
    if (isTyping) {
      var thinking = document.createElement("div");
      thinking.className = "terminal-line";
      thinking.textContent = "_ AI is thinking...";
      body.appendChild(thinking);
    }
    body.scrollTop = body.scrollHeight;
  }

  function closeTerminal() {
    if (terminalEl && terminalEl.parentNode) {
      terminalEl.parentNode.removeChild(terminalEl);
      terminalEl = null;
    }
    document.body.style.overflow = "";
    document.removeEventListener("keydown", handleTerminalGlobalKeydown);
    setTerminalExpanded(false);
    updateTerminalStatus("Terminal closed.");

    if (lastFocusedElement) {
      lastFocusedElement.focus();
      lastFocusedElement = null;
    }
  }

  function handleTerminalGlobalKeydown(e) {
    if (e.key === "Escape") {
      closeTerminal();
      return;
    }

    if (e.key === "Tab") {
      if (!terminalEl) return;
      var focusableElements = terminalEl.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusableElements.length) return;
      var firstElement = focusableElements[0];
      var lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  }

  async function sendMessage(msg) {
    try {
      var res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });
      var data = null;
      try {
        data = await res.json();
      } catch (_) {
        // ignore parse error
      }
      if (data && typeof data === "object") {
        if (res.ok && typeof data.reply === "string" && data.reply.trim()) {
          return data.reply;
        }
        if (typeof data.error === "string" && data.error.trim()) {
          return "Error: " + data.error;
        }
        if (typeof data.reply === "string" && data.reply.trim()) {
          return data.reply;
        }
      }
      return res.ok ? "Error: No response." : "Error: " + res.status + " " + res.statusText;
    } catch (_) {
      return "Error: Failed to connect to backend.";
    }
  }

  function handleTerminalSubmit(e) {
    e.preventDefault();
    var input = document.getElementById("terminal-command-input");
    if (!input || !input.value.trim()) return;

    var msg = input.value.trim();
    terminalHistory.push("> " + msg);
    input.value = "";
    renderHistory();

    if (msg.toLowerCase() === "help") {
      terminalHistory.push("Commands: help, clear, exit, whoami");
      updateTerminalStatus("Displayed available terminal commands.");
      renderHistory();
      return;
    }
    if (msg.toLowerCase() === "clear") {
      terminalHistory = [];
      updateTerminalStatus("Terminal history cleared.");
      renderHistory();
      return;
    }
    if (msg.toLowerCase() === "exit") {
      closeTerminal();
      return;
    }
    if (msg.toLowerCase() === "whoami") {
      terminalHistory.push("You are a visitor of creatrweb.com.");
      updateTerminalStatus("Displayed identity response.");
      renderHistory();
      return;
    }

    isTyping = true;
    updateTerminalStatus("Assistant is thinking.");
    renderHistory();

    sendMessage(msg).then(function (reply) {
      isTyping = false;
      terminalHistory.push(reply);
      updateTerminalStatus(
        reply.indexOf("Error:") === 0 ? "Assistant returned an error." : "Assistant replied."
      );
      renderHistory();
    });
  }

  function openTerminal() {
    if (terminalEl) return;

    lastFocusedElement = document.activeElement;

    var overlay = document.createElement("div");
    overlay.className = "terminal-overlay";
    overlay.id = "terminal-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "terminal-title");
    overlay.setAttribute("aria-describedby", "terminal-description terminal-shortcuts");

    overlay.innerHTML =
      '<div class="terminal-window">' +
        '<div class="terminal-header">' +
          '<div class="mac-title-bar" aria-hidden="true">' +
            '<span class="mac-dot mac-red"></span>' +
            '<span class="mac-dot mac-yellow"></span>' +
            '<span class="mac-dot mac-green"></span>' +
          "</div>" +
          '<span class="terminal-header-title" id="terminal-title">Creatrweb OS Terminal</span>' +
          '<button id="terminal-close" class="terminal-close" type="button" aria-label="Close terminal">\u00d7</button>' +
        "</div>" +
        '<p id="terminal-description" class="sr-only">Terminal chat window for asking questions and receiving replies.</p>' +
        '<p id="terminal-shortcuts" class="sr-only">Type help for available commands. Press Escape to close the terminal.</p>' +
        '<div id="terminal-status" class="sr-only" aria-live="polite" aria-atomic="true"></div>' +
        '<div class="terminal-body" id="terminal-body" role="log" aria-label="Terminal conversation history" aria-live="off" aria-relevant="additions text" aria-busy="false" tabindex="0"></div>' +
        '<form class="terminal-footer" id="terminal-form">' +
          '<span class="terminal-prompt" aria-hidden="true">&gt;</span>' +
          '<input type="text" id="terminal-command-input" name="terminal-command" ' +
            'class="terminal-input" autocomplete="off" aria-label="Terminal input" aria-describedby="terminal-description terminal-shortcuts" />' +
        "</form>" +
      "</div>";

    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";
    terminalEl = overlay;
    setTerminalExpanded(true);
    updateTerminalStatus("Terminal opened.");

    renderHistory();
    updateTerminalStatus(terminalStatusText);

    document.getElementById("terminal-close").addEventListener("click", closeTerminal);
    document.getElementById("terminal-form").addEventListener("submit", handleTerminalSubmit);
    document.addEventListener("keydown", handleTerminalGlobalKeydown);

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeTerminal();
    });

    var inp = document.getElementById("terminal-command-input");
    if (inp) inp.focus();
  }

  // ─── Wire up triggers ─────────────────────────────────────────────────────────

  var terminalTrigger = document.getElementById("terminal-trigger");
  if (terminalTrigger) {
    terminalTrigger.addEventListener("click", openTerminal);
  }

  var pillChat = document.getElementById("pill-chat");
  if (pillChat) {
    pillChat.addEventListener("click", openTerminal);
  }

  setTerminalExpanded(false);
})();
