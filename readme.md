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

- **Easy Integration**: Embed the chat widget with minimal setup.
- **Customizable Appearance**: Modify colors, fonts, sizes, and other styling options.
- **Multiple Chat Histories**: Maintain separate chat histories for different contexts using `chatId`.
- **Persistent Chat History**: Stores conversation history using `localStorage`.
- **Reset Functionality**: Programmatically reset the chat history when needed.
- **Extensible Configuration**: Pass additional parameters to the API for custom behavior.

## Demo

You can see the chat widget in action at [app.snaap.ai](https://app.snaap.ai).

## Installation

To use the Snaap AI Chat Widget, you need to:

1. Include the chat widget container in your HTML.
2. Configure the widget with your API endpoint and options.
3. Include the chat widget script.
4. Optionally, implement chat switching for different contexts.

## Usage

### 1. Include the Chat Widget Container

Place the following `<div>` element in your HTML where you want the chat widget to appear:

```html
<div id="snaap-ai-chat-widget-container"></div>
```

### 2. Configure the Widget

Before including the chat widget script, configure it using the `window.snaapAiChatWidgetConfig` object. This should be placed in a `<script>` tag before the widget script.

```html
<script>
  window.snaapAiChatWidgetConfig = {
    apiEndpoint: 'https://api.snaap.ai/your-endpoint',
    chatId: 'context-1', // Unique identifier for the chat session (e.g., product ID)
    extraParams: {
      // Additional parameters to include in API requests
    },
    headerBackgroundColor: '#123456',
    headerTextColor: '#ffffff',
    // ... other configuration options
  };
</script>
```

**Important:**

- **apiEndpoint**: Replace `'https://api.snaap.ai/your-endpoint'` with your actual Snaap AI API endpoint. See [API Endpoint Setup](#api-endpoint-setup) for instructions on obtaining an endpoint.
- **chatId**: Set a unique identifier for each chat context (e.g., product ID, page ID). This allows the widget to maintain separate chat histories for different contexts.

### 3. Include the Chat Widget Script

Include the chat widget script in your HTML after the configuration script:

```html
<script src="https://snaap-ai-chat-widget.pages.dev/chat-widget.js"></script>
```

### 4. Switching Between Chats

When the user navigates to a different context (e.g., a different product), you can switch the chat session to display the appropriate chat history.

Use the `switchChat` method provided by the widget:

```javascript
// Example: User navigates to product with ID 'product-2'
window.snaapAiChatWidget.switchChat({
  apiEndpoint: 'https://api.snaap.ai/exec/v1/execute/endpoint-for-product-2',
  chatId: 'product-2',
  // ... other configurations if needed
});
```

This method updates the widget's configuration and reloads the chat history for the new context.

## Configuration Options

The `window.snaapAiChatWidgetConfig` object supports the following options:

| Option                  | Type   | Default Value                     | Description                                          |
|-------------------------|--------|-----------------------------------|------------------------------------------------------|
| **apiEndpoint**         | String | `''`                              | **Required.** The API endpoint URL for handling chat messages. |
| **chatId**              | String | `''`                              | Unique identifier for the chat session (e.g., product ID). |
| **extraParams**         | Object | `{}`                              | Additional parameters to include in the API request payload. |
| **headerBackgroundColor** | String | `#EFEFFB`                         | Background color of the chat header.                 |
| **headerTextColor**     | String | `#000000`                         | Text color of the chat header.                       |
| **chatBackgroundColor** | String | `#ffffff`                         | Background color of the chat area.                   |
| **userMessageColor**    | String | `#8961FF`                         | Background color of user messages.                   |
| **botMessageColor**     | String | `#EFEFF1`                         | Background color of bot messages.                    |
| **fontFamily**          | String | `'Lexend Deca, Arial, sans-serif'` | Font family used in the widget.                      |
| **fontSize**            | String | `16px`                            | Base font size used in the widget.                   |
| **borderRadius**        | String | `12px`                            | Border radius of the chat widget container.          |
| **width**               | String | `350px`                           | Width of the chat widget.                            |
| **height**              | String | `500px`                           | Height of the chat widget.                           |

### Example Configuration:

```html
<script>
  window.snaapAiChatWidgetConfig = {
    apiEndpoint: 'https://api.snaap.ai/exec/v1/execute/endpoint-for-product-1',
    chatId: 'product-1',
    extraParams: {
      userId: 'user-123',
      sessionId: 'session-456',
    },
    headerBackgroundColor: '#004080',
    headerTextColor: '#ffffff',
    chatBackgroundColor: '#f0f0f0',
    userMessageColor: '#007acc',
    botMessageColor: '#e0e0e0',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
    borderRadius: '8px',
    width: '400px',
    height: '600px',
  };
</script>
```

## API Endpoint Setup

To use the chat widget, you need a Snaap AI API endpoint that will process the messages sent by the widget.

### Steps to Obtain an API Endpoint:

1. **Visit the Snaap AI Platform**:  
   Go to [app.snaap.ai](https://app.snaap.ai) and sign up or log in to your account.

2. **Create a New Chatbot or API Endpoint**:  
   - Navigate to the section where you can create a new chatbot or API endpoint.
   - Configure your chatbot's behavior, responses, and any required settings.

3. **Obtain the API Endpoint URL**:  
   - After setting up your chatbot, you will receive an API endpoint URL.  
   - This URL should be set as the `apiEndpoint` in your widget configuration.

**Example**:

```html
<script>
  window.snaapAiChatWidgetConfig = {
    apiEndpoint: 'https://api.snaap.ai/exec/v1/execute/your-endpoint-id',
    chatId: 'context-1',
    // ... other configurations
  };
</script>
```

Replace `'your-endpoint-id'` with the actual identifier provided by Snaap AI.

## Resetting the Chat History

If you need to reset the chat history for the current chat session (e.g., when a user logs out or starts a new session), you can call the `resetChatHistory` function exposed by the widget:

```javascript
window.snaapAiChatWidget.resetChatHistory();
```

This function clears the chat history stored in `localStorage` for the current `chatId` and re-initializes the chat widget.

## Styling and Customization

You can customize the appearance of the chat widget using the configuration options provided. If you need further customization, you can override the default styles by adding your own CSS rules.

**Example**:

```html
<style>
  /* Override the font size of messages */
  #snaap-ai-chat-widget-container .snaap-ai-chat-message {
    font-size: 16px;
  }

  /* Change the border radius of user messages */
  #snaap-ai-chat-widget-container .snaap-ai-user-message {
    border-radius: 20px;
  }
</style>
```

**Note**: Be cautious when overriding styles to ensure compatibility across different browsers and devices.

## Support

If you encounter any issues or have questions about integrating the Snaap AI Chat Widget, please contact our support team:

- **Email**: support@snaap.ai
- **Website**: [www.snaap.ai](https://www.snaap.ai)
- **Documentation**: [Snaap AI Documentation](https://www.snaap.ai/documentation)

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

Thank you for choosing Snaap AI for your conversational AI needs! We are excited to help you enhance your user engagement and experience. If you have any feedback or feature requests, please let us know.
