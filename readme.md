# Snaap AI Chat Widget

The Snaap AI Chat Widget is a customizable chat interface that you can embed into your website or application. It integrates conversational AI capabilities provided by Snaap AI, enabling real-time interactions with your users.

This widget supports multiple chat histories for different contexts (e.g., different products in an e-shop), allowing you to provide personalized chat experiences based on the current context.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
  - [1. Include the Chat Widget Container](#1-include-the-chat-widget-container)
  - [2. Configure the Widget](#2-configure-the-widget)
  - [3. Include the Chat Widget Script](#3-include-the-chat-widget-script)
  - [4. Switching Between Chats](#4-switching-between-chats)
- [Configuration Options](#configuration-options)
- [API Endpoint Setup](#api-endpoint-setup)
- [Resetting the Chat History](#resetting-the-chat-history)
- [Styling and Customization](#styling-and-customization)
- [Support](#support)
- [License](#license)

## Features

- **Easy Integration**: Embed the chat widget with minimal setup
- **Customizable Appearance**: Modify colors, fonts, sizes, and other styling options
- **Multiple Chat Histories**: Maintain separate chat histories for different contexts using `chatId`
- **Persistent Chat History**: Stores conversation history using `localStorage`
- **Reset Functionality**: Programmatically reset the chat history when needed
- **Extensible Configuration**: Pass additional parameters to the API for custom behavior
- **Online Status Indicator**: Shows the current online/offline status
- **Automatic Link Detection**: Converts URLs in messages to clickable links
- **Mobile-Friendly**: Responsive design with mobile-specific optimizations
- **XSS Protection**: Built-in HTML escaping for security
- **Custom Welcome Messages**: Configurable initial greeting message

## Installation

Follow these steps to integrate the Snaap AI Chat Widget into your website:

### 1. Include the Chat Widget Container

```html
<div id="snaap-ai-chat-widget-container"></div>
```

### 2. Configure the Widget

```html
<script>
  window.snaapAiChatWidgetConfig = {
    apiEndpoint: 'https://api.snaap.ai/your-endpoint',
    chatId: 'your-chat-id',
    headerName: 'Jessica Smith', // Optional: Custom agent name
    welcomeMessage: 'Welcome! How can I assist you today?', // Optional: Custom welcome message
    // ... other configuration options
  };
</script>
```

### 3. Include the Chat Widget Script

```html
<script src="https://snaap-ai-chat-widget.pages.dev/chat-widget.js"></script>
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| **apiEndpoint** | String | `''` | **Required.** The API endpoint URL for handling chat messages |
| **chatId** | String | `'default'` | Unique identifier for the chat session |
| **extraParams** | Object | `{}` | Additional parameters to include in API requests |
| **headerName** | String | `'Jessica Smith'` | Name displayed in the chat header |
| **welcomeMessage** | String | `'Welcome! How can I assist you today?'` | Initial message displayed in the chat |
| **headerBackgroundColor** | String | `'#EFEFFB'` | Header background color |
| **headerTextColor** | String | `'#000000'` | Header text color |
| **chatBackgroundColor** | String | `'#ffffff'` | Main chat area background color |
| **userMessageBackgroundColor** | String | `'#8961FF'` | User message bubble background color |
| **userMessageTextColor** | String | `'#ffffff'` | User message text color |
| **botMessageBackgroundColor** | String | `'#EFEFF1'` | Bot message bubble background color |
| **botMessageTextColor** | String | `'#000000'` | Bot message text color |
| **inputBackgroundColor** | String | `'#ffffff'` | Input field background color |
| **inputTextColor** | String | `'#000000'` | Input field text color |
| **sendButtonBackgroundColor** | String | `'#000000'` | Send button background color |
| **sendButtonIconColor** | String | `'#ffffff'` | Send button icon color |
| **fontFamily** | String | `'Lexend Deca, Arial, sans-serif'` | Font family for the widget |
| **fontSize** | String | `'16px'` | Base font size |
| **borderRadius** | String | `'12px'` | Widget border radius |
| **width** | String | `'350px'` | Widget width |
| **height** | String | `'500px'` | Widget height |

### Example Configuration

```javascript
window.snaapAiChatWidgetConfig = {
  apiEndpoint: 'https://api.snaap.ai/exec/v1/execute/your-endpoint',
  chatId: 'product-123',
  headerName: 'Support Team',
  welcomeMessage: 'Hi there! How can I help you today?',
  headerBackgroundColor: '#004080',
  headerTextColor: '#ffffff',
  userMessageBackgroundColor: '#007acc',
  userMessageTextColor: '#ffffff',
  botMessageBackgroundColor: '#f0f0f0',
  botMessageTextColor: '#000000',
  sendButtonBackgroundColor: '#007acc',
  sendButtonIconColor: '#ffffff',
  width: '400px',
  height: '600px'
};
```

## API Integration

The widget sends POST requests to your configured API endpoint with the following payload structure:

```javascript
{
  message: "User's message",
  chat_history: "Complete chat history in 'role: message' format",
  ...extraParams // Any additional parameters specified in configuration
}
```

### Expected API Response Format

Your API endpoint should return JSON in the following format:

```javascript
{
  message: "Bot's response message"
}
```

## JavaScript Methods

The widget exposes two methods globally:

### Reset Chat History

```javascript
window.snaapAiChatWidget.resetChatHistory();
```

Clears the current chat history and reinitializes the widget with the welcome message.

### Switch Chat Context

```javascript
window.snaapAiChatWidget.switchChat({
  chatId: 'new-context',
  apiEndpoint: 'https://api.snaap.ai/new-endpoint',
  headerName: 'New Agent Name',
  // ... other configuration options
});
```

Switches to a different chat context with new configuration options.

## Security Features

- HTML Escaping: All messages are automatically escaped to prevent XSS attacks
- Safe Link Handling: External links open in new tabs with `noopener` and `noreferrer`
- Content Security: No external resources except Google Fonts are loaded

## Mobile Optimizations

The widget includes several mobile-specific optimizations:

- Responsive layout adjustments
- Mobile-friendly input handling
- Automatic scroll adjustments when the keyboard appears
- Touch-friendly UI elements

## Support

For support or questions, contact:

- **Email**: support@snaap.ai
- **Website**: [www.snaap.ai](https://www.snaap.ai)
- **Documentation**: [Snaap AI Documentation](https://www.snaap.ai/documentation)

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
