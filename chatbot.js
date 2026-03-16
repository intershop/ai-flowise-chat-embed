import Chatbot from 'https://cdn.jsdelivr.net/gh/intershop/ai-flowise-chat-embed@website/intershop/dist/web.js';
Chatbot.init({
  chatflowid: '574ef77d-cedb-4242-a96f-387e2dd06013',
  apiHost: 'https://ish-flowise-enterprise.cloud.intershop.com',
  chatflowConfig: {
    // topK: 2
  },
  theme: {
    customCSS: `div.tooltip {
            bottom: 62px !important;
            right: 68px !important;
            z-index: 10000;
            }`,
    button: {
      backgroundColor: '#fff',
      right: 20,
      bottom: 20,
      size: 48, // small | medium | large | number
      dragAndDrop: true,
      iconColor: '#c5083d',
      //customIconSrc: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg',
      //autoWindowOpen: {
      //autoOpen: true, //parameter to control automatic window opening
      //openDelay: 2, // Optional parameter for delay time in seconds
      //autoOpenOnMobile: false, //parameter to control automatic window opening in mobile
      //},
    },
    tooltip: {
      showTooltip: true,
      tooltipMessage: 'Hi! 👋',
      tooltipBackgroundColor: '#c5083d',
      tooltipTextColor: 'white',
      tooltipFontSize: '16px',
    },
    chatWindow: {
      showTitle: true,
      //showAgentMessages: true,
      title: 'Intershop Copilot',
      //titleAvatarSrc: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg',
      welcomeMessage:
        'Hi there! I’m your Intershop Copilot – here to help with all your questions about our e-commerce solutions. How can I assist you today?', //'Your conversations with the Intershop Copilot chatbot may be processed to improve our services and enhance your experience. Please note that while the data from your interactions may be analyzed, it will not be associated with any identifiable individuals. All data is handled in compliance with applicable privacy regulations to ensure the protection of your personal information.',
      errorMessage: 'sry something went wrong...',
      backgroundColor: '#f5f5f5',
      height: 700,
      width: 400,
      fontSize: '16px',
      starterPrompts: [
        'How can Intershop help grow my \nonline business?',
        'What features does Intershop offer \nfor B2B companies?',
        'Can you share success stories \nfrom Intershop customers?',
        'Want to learn more about \nIntershop Fall 2025 Release?',
        'I’d like to schedule an online demo.',
      ], // It overrides the starter prompts set by the chat flow passed
      starterPromptFontSize: '16px',
      clearChatOnReload: false, // If set to true, the chat will be cleared when the page reloads.
      botMessage: {
        backgroundColor: '#fff',
        textColor: '#303235',
        //showAvatar: true,
        //avatarSrc: 'https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/parroticon.png',
      },
      userMessage: {
        backgroundColor: '#c6183d',
        textColor: '#fff',
        //showAvatar: true,
        //avatarSrc: 'https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png',
      },
      textInput: {
        placeholder: 'Type your question here...',
        backgroundColor: '#ffffff',
        textColor: '#303235',
        sendButtonColor: '#c5083d',
        maxChars: 300,
        maxCharsWarningMessage: 'You exceeded the characters limit. Please input less than 300 characters.',
        autoFocus: true, // If not used, autofocus is disabled on mobile and enabled on desktop. true enables it on both, false disables it on both.
        //sendMessageSound: true,
        // sendSoundLocation: "send_message.mp3", // If this is not used, the default sound effect will be played if sendSoundMessage is true.
        //receiveMessageSound: true,
        // receiveSoundLocation: "receive_message.mp3", // If this is not used, the default sound effect will be played if receiveSoundMessage is true.
      },
      feedback: {
        color: '#c6183d',
      },
      footer: {
        textColor: '#303235',
        text: 'View our',
        company: 'privacy policy',
        companyLink: 'https://www.intershop.com/en/privacy-policy',
      },
    },
    disclaimer: {
      title: 'Disclaimer',
      message:
        'I consent to my chatbot entries and voluntarily provided contact data (e.g. name, email address) being processed by Intershop for the purpose of processing my request and providing advice. This consent can be withdrawn at any time via email to info@intershop.de.<br> For details, please refer to the <a target="_blank" href="https://www.intershop.com/en/privacy-policy" style="font-weight: bold; color: black;" class="link">privacy policy</a>.',
      buttonText: 'Yes, I agree. Start chatting',
    },
  },
});
