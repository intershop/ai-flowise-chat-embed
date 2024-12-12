//import Chatbot from 'https://cdn.jsdelivr.net/gh/intershop/ai-flowise-chat-embed@website/docs-intershop/dist/web.js';
import Chatbot from 'https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js';
const welcome = {
  en: "Hi! Need help with Intershop documentation? I'm the AI assistant specializing in the latest versions of ICM, IOM, CEC, IAC, SMC, and OMA. Feel free to ask me your questions.",
  fr: "Bonjour ! Besoin d'aide avec la documentation Intershop ? Je suis l'assistant IA spécialisé dans les dernières versions d'ICM, IOM, CEC, IAC, SMC et OMA. N'hésitez pas à me poser vos questions.",
  de: 'Hallo! Brauchen Sie Hilfe mit der Intershop-Dokumentation? Ich bin der KI-Assistent, der auf die neuesten Versionen von ICM, IOM, CEC, IAC, SMC und OMA spezialisiert ist. Stellen Sie mir gerne Ihre Fragen.',
};
var welcomeMessage = welcome.en;
Chatbot.init({
  chatflowid: '8fba968e-f8ed-4401-8a9f-57eaa5f45535',
  apiHost: 'https://ish-flowise-app.azurewebsites.net',
  chatflowConfig: {
    vars: {
      currentUrl: window.location.href,
      lang: (() => {
        function getLangFromUrl(url) {
          const validLangCodes = ['en', 'de', 'fr'];
          const match = url.match(/\/([a-z]{2})(\/|$)/); // Slightly simplified regex

          return match ? (validLangCodes.includes(match[1]) ? match[1] : null) : null;
        }
        const url = window.location.href;
        var extracted_lang = getLangFromUrl(url) || 'de';
        console.log(extracted_lang);
        welcomeMessage = welcome[extracted_lang] || welcome.en; // Default to English if the language key is missing.
      })(),
      service: (() => {
        // Access the current URL from the vars
        // const currentUrl = 'https://docs.intershop.com/iap/olh/cec/en/';

        // Function to extract the service identifier
        function getServiceFromUrl(url) {
          // Match the pattern after the domain or path
          const regex = /(?:docs\.intershop\.com|file:\/\/\/D:\/documentation-online-help-(icm|iap|iom)\/src)/;
          const regex2 = /(?:docs\.intershop\.com|file:\/\/\/D:\/(documentation-online-help-icm|documentation-online-help-iap)\/src)\/(\w+)/;
          const match = url.match(regex);
          console.log(match);
          // Return the matched group if found; otherwise, default to 'icm'
          return match ? match[1] : 'icm';
        }

        const url = window.location.href;
        // Execute the function to extract the service
        return getServiceFromUrl('https://docs.intershop.com/icm/latest/olh/icm/de/');
      })(),
    },
  },
  observersConfig: {},
  theme: {
    button: {
      backgroundColor: '#008e87',
      right: 20,
      bottom: 20,
      size: 48, // small | medium | large | number
      dragAndDrop: true,
      iconColor: 'white',
      autoWindowOpen: {
        autoOpen: true, //parameter to control automatic window opening
        openDelay: 2, // Optional parameter for delay time in seconds
        autoOpenOnMobile: false, //parameter to control automatic window opening in mobile
      },
    },

    customCSS: ``,
    chatWindow: {
      showTitle: true,
      showAgentMessages: true,
      title: 'Intershop Documentation Copilot',
      //titleAvatarSrc: " https://amisamyra99.github.io/chatbot-flowise-js-hosting/images/bot24.png",

      welcomeMessage: welcomeMessage,

      errorMessage: 'It seems that we are encountering a problem.',
      backgroundColor: '#ffffff',
      //set a pixel value
      height: 700,
      width: 600,
      fontSize: 16,
      clearChatOnReload: false,
      sourceDocsTitle: 'Sources:',
      botMessage: {
        backgroundColor: '#f7f8ff',
        textColor: '#303235',
        // showAvatar: true,
        //avatarSrc: 'https://amisamyra99.github.io/chatbot-flowise-js-hosting/images/bot24.png',
      },
      userMessage: {
        backgroundColor: '#008e87',
        textColor: '#ffffff',
        //showAvatar: true,
        //avatarSrc: 'https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png',
      },
      textInput: {
        placeholder: 'Type your question',
        backgroundColor: '#ffffff',
        textColor: '#303235',
        sendButtonColor: '#008e87',
        maxChars: 50,
        maxCharsWarningMessage: 'You exceeded the characters limit. Please input less than 50 characters.',
        autoFocus: true,
        sendMessageSound: false,
        receiveMessageSound: false,
      },
      feedback: {
        color: '#303235',
        backgroundColor: '#008e87',
        buttonColor: '#008e87',
      },
      footer: {
        textColor: '#303235',
        text: 'Powered by',
        company: 'Intershop',
        companyLink: 'https://docs.intershop.com/index.php',
      },
    },
    disclaimer: {
      title: 'Disclaimer',
      message:
        'By using this chatbot, you agree to the <a target="_blank" style="color: #008e87;" href="https://www.intershop.com/en/privacy-policy" >Terms & Condition</a>',
      textColor: 'black',
      buttonColor: '#008e87',
      buttonText: 'Start Chatting',
      buttonTextColor: 'white',
      blurredBackgroundColor: 'rgba(0, 0, 0, 0.4)', //The color of the blurred background that overlays the chat interface
      backgroundColor: 'white',
    },
  },
});
