let isRunning = false;

document.addEventListener("DOMContentLoaded", function () {
  const startBtn = document.getElementById("startBtn");
  const stopBtn = document.getElementById("stopBtn");
  const status = document.getElementById("status");
  const connectCount = document.getElementById("connectCount");

  // Recuperar estado salvo
  chrome.storage.local.get(["isRunning", "connectCount"], function (result) {
    if (result.isRunning) {
      startAutomation();
    }
    if (result.connectCount) {
      connectCount.textContent = result.connectCount;
    }
  });

  startBtn.addEventListener("click", function () {
    startAutomation();
  });

  stopBtn.addEventListener("click", function () {
    stopAutomation();
  });

  function startAutomation() {
    isRunning = true;
    startBtn.disabled = true;
    stopBtn.disabled = false;
    status.textContent = "Automação iniciada...";
    status.className = "status info";

    // Salvar estado
    chrome.storage.local.set({ isRunning: true });

    // Enviar mensagem para o content script
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "start" },
        function (response) {
          if (chrome.runtime.lastError) {
            console.log(
              "Erro ao enviar mensagem:",
              chrome.runtime.lastError.message
            );

            // Tentar injetar o content script manualmente
            chrome.scripting.executeScript(
              {
                target: { tabId: tabs[0].id },
                files: ["content.js"],
              },
              function () {
                if (chrome.runtime.lastError) {
                  status.textContent = "Erro: Recarregue a página do LinkedIn";
                  status.className = "status error";
                  startBtn.disabled = false;
                  stopBtn.disabled = true;
                } else {
                  // Tentar enviar mensagem novamente após injetar
                  setTimeout(() => {
                    chrome.tabs.sendMessage(tabs[0].id, { action: "start" });
                  }, 1000);
                }
              }
            );
          }
        }
      );
    });
  }

  function stopAutomation() {
    isRunning = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    status.textContent = "Automação parada";
    status.className = "status error";

    // Salvar estado
    chrome.storage.local.set({ isRunning: false });

    // Enviar mensagem para o content script
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "stop" });
    });
  }

  // Escutar mensagens do content script
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request.action === "updateStatus") {
      status.textContent = request.message;
      status.className = "status " + request.type;
    }
    if (request.action === "updateCount") {
      connectCount.textContent = request.count;
      chrome.storage.local.set({ connectCount: request.count });
    }
    if (request.action === "finished") {
      stopAutomation();
    }
    return true; // Importante para Manifest V3
  });
});
