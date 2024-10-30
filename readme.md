# Snaap AI Chat Widget

The Snaap AI Chat Widget is a customizable JavaScript widget that allows you to integrate a chatbot interface into your website, providing an engaging and interactive experience for your users. This README will guide you through the steps to configure and use the widget effectively.

## Getting Started

### Prerequisites
To use the Snaap AI Chat Widget, you need to obtain an API endpoint from [app.snaap.ai](https://app.snaap.ai). Sign up and generate your endpoint.

### Installation
Add the following JavaScript code to your HTML page to embed the Snaap AI Chat Widget:

```html
<script src="path/to/snaap-ai-chat-widget.js"></script>
<script>
  window.snaapAiChatWidgetConfig = {
    apiEndpoint: 'YOUR_API_ENDPOINT_HERE'
  };
</script>
```
Replace `YOUR_API_ENDPOINT_HERE` with your unique API endpoint from Snaap AI.

## Configuration

You can configure the widget to match the appearance and feel of your website. Use the following options to customize it:

- **apiEndpoint** (required): URL of the API endpoint to send user messages.
- **extraParams** (optional): An object containing any additional parameters you want to include with the payload.
- **headerBackgroundColor**: Background color of the widget header (default: `#EFEFFB`).
- **headerTextColor**: Text color of the widget header (default: `#000000`).
- **chatBackgroundColor**: Background color of the chat area (default: `#ffffff`).
- **userMessageColor**: Background color of user messages (default: `#8961FF`).
- **botMessageColor**: Background color of bot messages (default: `#EFEFF1`).
- **fontFamily**: Font family used in the widget (default: `'Lexend Deca, Arial, sans-serif'`).
- **fontSize**: Font size for messages (default: `16px`).
- **borderRadius**: Border radius for the widget container (default: `12px`).
- **width**: Width of the widget (default: `350px`).
- **height**: Height of the widget (default: `500px`).

Here's an example configuration:

```js
window.snaapAiChatWidgetConfig = {
  apiEndpoint: 'YOUR_API_ENDPOINT_HERE',
  headerBackgroundColor: '#333333',
  headerTextColor: '#ffffff',
  chatBackgroundColor: '#f0f0f0',
  userMessageColor: '#4CAF50',
  botMessageColor: '#ffffff',
  width: '400px',
  height: '600px'
};
```

## Usage

Once the widget is embedded on your page, it will display a chat interface with the following features:

- **Sending Messages**: Users can type messages into the input field and click the "send" button or press `Enter` to send them.
- **Receiving Responses**: The widget will display bot responses by calling your configured API endpoint.
- **Message History**: The chat maintains message history using `localStorage`. This means users will see previous messages when they reopen the widget.
- **Typing Indicator**: The bot displays a typing indicator while it processes the user message.

### Resetting Chat History
To clear the chat history programmatically, you can call the following function:

```js
window.snaapAiChatWidget.resetChatHistory();
```
This function removes the saved chat history and resets the widget.

## Error Handling
- If a message cannot be processed, an error message will be shown in the chat interface.
- If the `apiEndpoint` is not configured, an error will be logged to the console.

## Styling
The widget uses the "Lexend Deca" font from Google Fonts by default. You can change the font using the `fontFamily` option in the configuration object.

### Custom Styles
If you want to apply further custom styles, you can use your own CSS by targeting the widget's elements:

- **#snaap-ai-chat-widget-container**: The main widget container.
- **#snaap-ai-chat-widget-header**: The header section containing the widget title.
- **.snaap-ai-chat-message**: The message container for both user and bot messages.
- **.snaap-ai-user-message**: Style for user messages.
- **.snaap-ai-bot-message**: Style for bot messages.

## Example
Here's a complete example of how to embed and configure the widget:

```html
<div id="snaap-ai-chat-widget-container"></div>
<script src="/path/to/snaap-ai-chat-widget.js"></script>
<script>
  window.snaapAiChatWidgetConfig = {
    apiEndpoint: 'https://api.snaap.ai/your_endpoint',
    headerBackgroundColor: '#0066cc',
    headerTextColor: '#ffffff',
    chatBackgroundColor: '#f8f8f8',
    userMessageColor: '#007bff',
    botMessageColor: '#e9ecef',
    borderRadius: '10px',
    width: '400px',
    height: '600px'
  };
</script>
```

## License
The Snaap AI Chat Widget is distributed under the MIT License. See `LICENSE` for more information.
