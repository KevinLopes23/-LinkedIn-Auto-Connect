let isRunning = false;
let connectCount = 0;
let currentIndex = 0;
let connectButtons = [];

// Função para aguardar um tempo
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Função para encontrar botões de conectar
function findConnectButtons() {
  console.log("Procurando botões de conectar...");

  // Buscar por todos os botões na página
  const allButtons = document.querySelectorAll("button");
  console.log(`Encontrados ${allButtons.length} botões na página`);

  let connectButtons = [];

  allButtons.forEach((button) => {
    const buttonText = button.textContent?.trim().toLowerCase() || "";
    const ariaLabel = button.getAttribute("aria-label")?.toLowerCase() || "";
    const dataControlName = button.getAttribute("data-control-name") || "";

    // Verificar se é um botão de conectar
    if (
      buttonText === "conectar" ||
      ariaLabel.includes("conectar") ||
      dataControlName.includes("connect")
    ) {
      // Verificar se o botão está visível
      if (button.offsetParent !== null && !button.disabled) {
        connectButtons.push(button);
        console.log("Botão conectar encontrado:", buttonText, ariaLabel);
      }
    }
  });

  console.log(
    `Encontrados ${connectButtons.length} botões de conectar válidos`
  );
  return connectButtons;
}

// Função para clicar em "Enviar sem nota"
async function clickSendWithoutNote() {
  await sleep(2000); // Aguardar modal aparecer

  console.log('Procurando botão "Enviar sem nota"...');

  // Buscar por todos os botões visíveis
  const allButtons = document.querySelectorAll("button");

  for (let button of allButtons) {
    const buttonText = button.textContent?.trim().toLowerCase() || "";
    const ariaLabel = button.getAttribute("aria-label")?.toLowerCase() || "";

    // Verificar se é o botão "Enviar sem nota"
    if (
      buttonText.includes("enviar sem nota") ||
      ariaLabel.includes("enviar sem nota") ||
      buttonText.includes("send without note")
    ) {
      if (button.offsetParent !== null && !button.disabled) {
        console.log('Clicando em "Enviar sem nota"');
        button.click();
        return true;
      }
    }
  }

  console.log('Botão "Enviar sem nota" não encontrado');
  return false;
}

// Função para fechar modal se necessário
async function closeModal() {
  await sleep(500);

  const closeSelectors = [
    'button[aria-label*="Fechar"]',
    'button[aria-label*="Dismiss"]',
    ".artdeco-modal__dismiss",
    ".msg-overlay-bubble-header__control--new-convo-btn",
  ];

  for (let selector of closeSelectors) {
    const closeBtn = document.querySelector(selector);
    if (closeBtn && closeBtn.offsetParent !== null) {
      closeBtn.click();
      await sleep(500);
      break;
    }
  }
}

// Função para processar um botão de conectar
async function processConnectButton(button) {
  try {
    // Scroll para o botão
    button.scrollIntoView({ behavior: "smooth", block: "center" });
    await sleep(1000);

    // Clicar no botão conectar
    button.click();
    await sleep(2000);

    // Tentar clicar em "Enviar sem nota"
    const sentWithoutNote = await clickSendWithoutNote();

    if (sentWithoutNote) {
      connectCount++;
      chrome.runtime.sendMessage({
        action: "updateCount",
        count: connectCount,
      });

      chrome.runtime.sendMessage({
        action: "updateStatus",
        message: `Conexão ${connectCount} enviada com sucesso`,
        type: "success",
      });
    } else {
      // Se não conseguiu enviar sem nota, fechar modal
      await closeModal();

      chrome.runtime.sendMessage({
        action: "updateStatus",
        message: "Não foi possível enviar sem nota, pulando...",
        type: "error",
      });
    }

    await sleep(3000); // Aguardar entre conexões
  } catch (error) {
    console.log("Erro ao processar conexão:", error);
    await closeModal();
  }
}

// Função principal de automação
async function autoConnect() {
  if (!isRunning) return;

  console.log("Iniciando automação...");
  await sleep(2000);

  let processedButtons = new Set(); // Para evitar processar o mesmo botão duas vezes
  let currentScrollPosition = 0;

  // Começar do topo da página
  window.scrollTo({ top: 0, behavior: "smooth" });
  await sleep(1000);

  while (isRunning) {
    // 1. Encontrar e conectar com todos os botões visíveis na tela atual
    const currentButtons = findConnectButtons();
    const newButtons = currentButtons.filter(
      (button) => !processedButtons.has(button)
    );

    // Se encontrou novos botões, conectar com eles
    for (let button of newButtons) {
      if (!isRunning) break;

      processedButtons.add(button); // Marcar como processado

      chrome.runtime.sendMessage({
        action: "updateStatus",
        message: `Conectando... (${connectCount + 1})`,
        type: "info",
      });

      await processConnectButton(button);
    }

    // 2. Fazer scroll para baixo
    const currentScrollHeight = document.body.scrollHeight;
    const viewportHeight = window.innerHeight;

    // Scroll de uma tela para baixo
    currentScrollPosition += viewportHeight * 0.8; // 80% da altura da tela

    // Verificar se chegou no final da página
    if (currentScrollPosition >= currentScrollHeight - viewportHeight) {
      chrome.runtime.sendMessage({
        action: "updateStatus",
        message: "Chegou ao final da página. Verificando se há mais botões...",
        type: "info",
      });

      // Ir até o final da página
      window.scrollTo({ top: currentScrollHeight, behavior: "smooth" });
      await sleep(2000);

      // Verificação final: há mais botões não processados?
      const finalButtons = findConnectButtons();
      const remainingButtons = finalButtons.filter(
        (button) => !processedButtons.has(button)
      );

      if (remainingButtons.length > 0) {
        chrome.runtime.sendMessage({
          action: "updateStatus",
          message: `Conectando com os últimos ${remainingButtons.length} botões...`,
          type: "info",
        });

        for (let button of remainingButtons) {
          if (!isRunning) break;
          processedButtons.add(button);
          await processConnectButton(button);
        }
      }

      // Não há mais botões, ir para próxima página
      chrome.runtime.sendMessage({
        action: "updateStatus",
        message: "Página finalizada. Procurando próxima página...",
        type: "info",
      });

      await goToNextPage();
      return;
    }

    // 3. Fazer o scroll e aguardar
    window.scrollTo({ top: currentScrollPosition, behavior: "smooth" });
    await sleep(2000); // Aguardar o scroll

    chrome.runtime.sendMessage({
      action: "updateStatus",
      message: "Fazendo scroll para encontrar mais conexões...",
      type: "info",
    });
  }
}

// Função para ir para próxima página
async function goToNextPage() {
  // Fazer scroll até o final da página para encontrar a paginação
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  await sleep(2000); // Aguardar scroll completar

  const nextButtons = [
    'button[aria-label*="Próxima"]',
    'button[aria-label*="Next"]',
    ".artdeco-pagination__button--next",
  ];

  let nextButton = null;

  for (let selector of nextButtons) {
    nextButton = document.querySelector(selector);
    if (
      nextButton &&
      !nextButton.disabled &&
      nextButton.offsetParent !== null
    ) {
      break;
    }
  }

  // Se não encontrou, tentar procurar pela seta ">" ou "Avançar"
  if (!nextButton) {
    const allButtons = document.querySelectorAll("button");
    nextButton = Array.from(allButtons).find((btn) => {
      const text = btn.textContent?.trim() || "";
      const ariaLabel = btn.getAttribute("aria-label") || "";
      return (
        (text === ">" ||
          text.includes("Avançar") ||
          text.includes("Next") ||
          ariaLabel.includes("Next") ||
          ariaLabel.includes("Avançar")) &&
        !btn.disabled &&
        btn.offsetParent !== null
      );
    });
  }

  if (nextButton) {
    chrome.runtime.sendMessage({
      action: "updateStatus",
      message: "Indo para próxima página...",
      type: "info",
    });

    nextButton.click();
    currentIndex = 0; // Reset index para nova página

    // Aguardar página carregar e continuar
    await sleep(5000);
    if (isRunning) {
      autoConnect();
    }
  } else {
    chrome.runtime.sendMessage({
      action: "updateStatus",
      message: "Não há mais páginas. Automação finalizada!",
      type: "success",
    });

    chrome.runtime.sendMessage({ action: "finished" });
  }
}

// Escutar mensagens do popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "start") {
    isRunning = true;
    currentIndex = 0;
    autoConnect();
  } else if (request.action === "stop") {
    isRunning = false;
  }
  return true; // Importante para Manifest V3
});

// Inicializar se já estava rodando
chrome.storage.local.get(["isRunning"], function (result) {
  if (result.isRunning) {
    isRunning = true;
    autoConnect();
  }
});
