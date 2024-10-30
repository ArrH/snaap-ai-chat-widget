"use strict";

(function() {
  const defaultConfig = {
    apiEndpoint: '',
    extraParams: {},
    headerBackgroundColor: '#EFEFFB',
    headerTextColor: '#000000',
    chatBackgroundColor: '#ffffff',
    userMessageColor: '#8961FF',
    botMessageColor: '#EFEFF1',
    fontFamily: 'Lexend Deca, Arial, sans-serif',
    fontSize: '16px',
    borderRadius: '12px',
    width: '350px',
    height: '500px',
    chatId: 'default', // New property to uniquely identify the chat
  };

  const config = Object.assign({}, defaultConfig, window.snaapAiChatWidgetConfig || {});

  if (!config.apiEndpoint) {
    console.error('Snaap AI Chat Widget: API endpoint is not configured.');
    return;
  }

  if (!config.chatId) {
    console.error('Snaap AI Chat Widget: chatId is not configured.');
    return;
  }

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@400;700&display=swap';
  document.head.appendChild(link);

  const style = document.createElement('style');
  style.textContent = `
    #snaap-ai-chat-widget-container {
      width: ${config.width};
      height: ${config.height};
      background-color: ${config.chatBackgroundColor};
      border-radius: ${config.borderRadius};
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      font-family: ${config.fontFamily};
      font-size: ${config.fontSize};
      font-weight: 400;
      line-height: normal;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    #snaap-ai-chat-widget-header {
      background-color: ${config.headerBackgroundColor};
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      color: ${config.headerTextColor};
      padding: 15px 30px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    #snaap-ai-chat-widget-header .header-name {
      flex-grow: 1;
      font-family: 'Lexend Deca', sans-serif;
      font-size: 16px;
      font-weight: 700;
      margin-right: 10px;
    }
    #snaap-ai-chat-widget-header .status-indicator {
      display: flex;
      align-items: center;
      margin-left: 20px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.6);
    }
    #snaap-ai-chat-widget-header .status-indicator .dot {
      width: 10px;
      height: 10px;
      background-color: #53E90E;
      border-radius: 50%;
      margin-right: 5px;
    }
    #snaap-ai-chat-widget-header .close-button {
      display: none;
    }
    #snaap-ai-chat-widget-messages {
      flex-grow: 1;
      overflow-y: auto;
      padding: 10px;
    }
    .snaap-ai-chat-message {
      margin-bottom: 10px;
      padding: 14px;
      border-radius: 13px;
      max-width: 80%;
      word-wrap: break-word;
    }
    .snaap-ai-user-message {
      color: #ffffff;
      background-color: ${config.userMessageColor};
      align-self: flex-end;
      margin-left: auto;
      border-bottom-right-radius: 3px;
    }
    .snaap-ai-bot-message {
      background-color: ${config.botMessageColor};
      align-self: flex-start;
      margin-right: auto;
      border-bottom-left-radius: 3px;
    }
    .snaap-ai-typing-indicator {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      align-self: flex-start;
      margin-right: auto;
    }
    .snaap-ai-typing-indicator .dot {
      width: 6px;
      height: 6px;
      background-color: #bbb;
      border-radius: 50%;
      margin-right: 4px;
      animation: snaap-ai-blink 1s infinite;
    }
    .snaap-ai-typing-indicator .dot:nth-child(2) {
      animation-delay: 0.2s;
    }
    .snaap-ai-typing-indicator .dot:nth-child(3) {
      animation-delay: 0.4s;
    }
    @keyframes snaap-ai-blink {
      0%, 80%, 100% {
        opacity: 0;
      }
      40% {
        opacity: 1;
      }
    }
    #snaap-ai-chat-widget-input {
      display: flex;
      padding: 5px 20px;
      background-color: #ffffff;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      align-items: center;
    }
    #snaap-ai-chat-widget-input input {
      flex-grow: 1;
      border: none;
      padding: 0;
      font-family: ${config.fontFamily};
      font-size: ${config.fontSize};
      font-weight: 400;
      color: rgba(0, 0, 0, 0.8);
      margin-right: 20px;
      outline: none;
    }
    #snaap-ai-chat-widget-input input::placeholder {
      color: rgba(0, 0, 0, 0.3);
    }
    #snaap-ai-chat-widget-send {
      cursor: pointer;
    }
    .snaap-ai-error-message {
      color: #ff0000;
      font-style: italic;
    }
  `;
  document.head.appendChild(style);

  const chatWidgetHTML = `
    <div id="snaap-ai-chat-widget-header">
      <div class="header-name">Jessica Smith</div>
      <div class="status-indicator">
        <div class="dot"></div>
        Online
      </div>
      <div class="close-button">X</div>
    </div>
    <div id="snaap-ai-chat-widget-messages"></div>
    <div id="snaap-ai-chat-widget-input">
      <input type="text" placeholder="Type your message..." />
      <div id="snaap-ai-chat-widget-send" class="send-button">
        <!-- SVG Icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
          <circle cx="17" cy="17" r="17" fill="black"/>
          <path d="M25.7547 17.6001L13.8155 17.6001M12.8207 10.6062L25.3417 16.677C26.1127 17.0508 26.1127 18.1493 25.3417 18.5232L12.8207 24.5939C11.9629 25.0098 11.0512 24.133 11.4333 23.2597L13.7295 18.0113C13.8442 17.7491 13.8442 17.451 13.7295 17.1889L11.4333 11.9405C11.0512 11.0671 11.9629 10.1903 12.8207 10.6062Z" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
    </div>
  `;

  let chatWidgetContainer = document.getElementById('snaap-ai-chat-widget-container');
  if (!chatWidgetContainer) {
    chatWidgetContainer = document.createElement('div');
    chatWidgetContainer.id = 'snaap-ai-chat-widget-container';
    document.body.appendChild(chatWidgetContainer);
  }
  chatWidgetContainer.innerHTML = chatWidgetHTML;

  const chatMessages = document.getElementById('snaap-ai-chat-widget-messages');
  const chatInput = document.querySelector('#snaap-ai-chat-widget-input input');
  const chatSendButton = document.getElementById('snaap-ai-chat-widget-send');

  // Generate a unique storage key based on the chatId
  let storageKey = `snaapAiChatWidgetMessages_${config.chatId}`;

  function loadMessages() {
    const storedMessages = localStorage.getItem(storageKey);
    return storedMessages ? JSON.parse(storedMessages) : [];
  }

  function saveMessages(messages) {
    localStorage.setItem(storageKey, JSON.stringify(messages));
  }

  function addMessage(content, isUser = false, isError = false, saveToStorage = true) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('snaap-ai-chat-message');
    messageElement.classList.add(isUser ? 'snaap-ai-user-message' : 'snaap-ai-bot-message');
    if (isError) {
      messageElement.classList.add('snaap-ai-error-message');
    }
    messageElement.textContent = content;
    chatMessages.appendChild(messageElement);

    requestAnimationFrame(() => {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });

    if (saveToStorage) {
      const messages = loadMessages();
      messages.push({ content, isUser, isError });
      saveMessages(messages);
    }
  }

  function showTypingIndicator() {
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('snaap-ai-typing-indicator');
    typingIndicator.id = 'snaap-ai-typing-indicator';
    typingIndicator.innerHTML = `
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    `;
    chatMessages.appendChild(typingIndicator);

    requestAnimationFrame(() => {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
  }

  function removeTypingIndicator() {
    const typingIndicator = document.getElementById('snaap-ai-typing-indicator');
    if (typingIndicator) {
      chatMessages.removeChild(typingIndicator);
    }
  }

  function getFormattedChatHistory() {
    const messages = loadMessages();
    return messages.map(msg => {
      const role = msg.isUser ? 'user' : 'system';
      return `${role}: ${msg.content}`;
    }).join('\n');
  }

  function handleSendMessage() {
    const message = chatInput.value.trim();
    if (!message) {
      addMessage('Please enter a valid message.', false, true);
      return;
    }

    addMessage(message, true);
    chatInput.value = '';

    const chatHistory = getFormattedChatHistory();

    showTypingIndicator();

    const payload = Object.assign({
      message: message,
      chat_history: chatHistory
    }, config.extraParams);

    fetch(config.apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
      removeTypingIndicator();

      if (data && data.message) {
        addMessage(data.message);
      } else {
        addMessage('Sorry, I did not understand that.', false, true);
      }
    })
    .catch(error => {
      removeTypingIndicator();

      console.error('Snaap AI Chat Widget Error:', error);
      addMessage('An error occurred while processing your message.', false, true);
    });
  }

  chatSendButton.addEventListener('click', handleSendMessage);
  chatInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  });

  function initializeChat() {
    chatMessages.innerHTML = '';
    const storedMessages = loadMessages();
    if (storedMessages.length > 0) {
      storedMessages.forEach(msg => addMessage(msg.content, msg.isUser, msg.isError, false));
    } else {
      addMessage('Welcome! How can I assist you today?');
    }

    requestAnimationFrame(() => {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
  }

  window.snaapAiChatWidget = {
    resetChatHistory: function() {
      localStorage.removeItem(storageKey);
      initializeChat();
    },
    switchChat: function(newConfig) {
      // Merge new config into existing config
      Object.assign(config, newConfig);

      if (!config.chatId) {
        console.error('Snaap AI Chat Widget: chatId is not configured.');
        return;
      }
      if (!config.apiEndpoint) {
        console.error('Snaap AI Chat Widget: API endpoint is not configured.');
        return;
      }

      // Update storageKey with new chatId
      storageKey = `snaapAiChatWidgetMessages_${config.chatId}`;

      // Re-initialize the chat
      initializeChat();
    }
  };

  initializeChat();
})();
