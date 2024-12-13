import Chatbot from 'https://cdn.jsdelivr.net/gh/intershop/ai-flowise-chat-embed@website/docs-intershop/dist/web.js';
const welcome = {
  en: "Hello! Need help with Intershop software? I'm your AI assistant, here to answer end-user questions. Ask me anything and I'll do my best to help you. Let's get started!",
  fr: "Bonjour, Besoin d'aide avec le logiciel Intershop ? Je suis votre assistant IA, ici pour répondre aux questions des utilisateurs finaux. Posez-moi vos questions et je ferai de mon mieux pour vous aider. Commençons!",
  de: 'Hallo! Brauchen Sie Hilfe mit Intershop-Software? Ich bin Ihr KI-Assistent und beantworte gerne Ihre Fragen als Endnutzer. Fragen Sie mich etwas, und ich werde mein Bestes tun, um Ihnen zu helfen. Fangen wir an!',
};
const disclaimer = {
  en: "By starting the chat, you consent to our privacy policy and engage in a dialogue with our AI-supported copilot. Please refer to our <a target='_blank' style='color: #008e87;' href='https://www.intershop.com/en/privacy-policy' >privacy policy</a> for more information.",
  fr: "Lorsque vous démarrez la discussion, vous consentez à notre politique de confidentialité et engagez un dialogue avec notre copilote assisté par IA. Pour plus d'informations, veuillez consulter notre <a target='_blank' style='color: #008e87;' href='https://www.intershop.com/en/privacy-policy' >politique de confidentialité</a>.",
  de: "Indem Sie den Chat starten, stimmen Sie unserer Datenschutzrichtlinie zu und treten in einen Dialog mit unserem KI-gestützten Co-Piloten ein. Bitte beachten Sie unsere <a target='_blank' style='color: #008e87;' href='https://www.intershop.com/en/privacy-policy' >Datenschutzbestimmungen</a> für weitere Informationen.",
};
const problemMessage = {
  en: 'It seems that we are encountering a problem.',
  fr: 'Il semble que nous rencontrions un problème.',
  de: 'Es scheint, dass wir auf ein Problem stoßen.',
};

const charLimitMessage = {
  en: 'You exceeded the characters limit. Please input less than 50 characters.',
  fr: 'Vous avez dépassé la limite de caractères. Veuillez saisir moins de 50 caractères.',
  de: 'Sie haben das Zeichenlimit überschritten. Bitte geben Sie weniger als 50 Zeichen ein.',
};

const privacyPolicy = {
  en: 'privacy policy',
  fr: 'politique de confidentialité',
  de: 'Datenschutzbestimmungen',
};

const ishLinks = {
  en: 'https://www.intershop.com/en/privacy-policy',
  fr: 'https://www.intershop.com/fr/protection-des-donnees',
  de: 'https://www.intershop.com/de/datenschutz',
};

function getLangFromUrl(url) {
  const validLangCodes = ['en', 'de', 'fr'];
  const match = url.match(/\/([a-z]{2})(\/|$)/); // Slightly simplified regex

  return match ? (validLangCodes.includes(match[1]) ? match[1] : null) : null;
}
const url = window.location.href;
var extracted_lang = getLangFromUrl(url) || 'en';
console.log(extracted_lang);
const welcomeMessage = welcome[extracted_lang] || welcome.en; // Default to English if the language key is missing.
const disclaimerMessage = disclaimer[extracted_lang] || disclaimer.en;
const errorMessage = problemMessage[extracted_lang] || problemMessage.en;
const charLimit = charLimitMessage[extracted_lang] || charLimitMessage.en;
const privacyPolicyText = privacyPolicy[extracted_lang] || privacyPolicy.en;
const ishLink = ishLinks[extracted_lang] || ishLinks.en;

Chatbot.init({
  chatflowid: '8fba968e-f8ed-4401-8a9f-57eaa5f45535',
  apiHost: 'https://ish-flowise-app.azurewebsites.net',
  chatflowConfig: {
    vars: {
      currentUrl: window.location.href,
      lang: extracted_lang,
      service: (() => {
        // Access the current URL from the vars
        // const currentUrl = 'https://docs.intershop.com/iap/olh/cec/en/';

        // Function to extract the service identifier
        function getServiceFromUrl(url) {
          // Match the pattern after the domain or path
          const regex = /(?:docs\.intershop\.com|file:\/\/\/D:\/documentation-online-help-(icm|iap|iom)\/src)/;
          // const regex = /(?:docs\.intershop\.com|file:\/\/\/D:\/(documentation-online-help-icm|documentation-online-help-iap)\/src)\/(\w+)/;
          const match = url.match(regex);
          console.log(match);
          // Return the matched group if found; otherwise, default to 'icm'
          return match ? match[1] : 'icm';
        }

        const url = window.location.href;
        // Execute the function to extract the service
        return getServiceFromUrl(url);
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

      errorMessage: errorMessage,
      backgroundColor: '#ffffff',
      //set a pixel value
      //height: 1000,
      //width: 600,
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
        maxCharsWarningMessage: charLimit,
        autoFocus: true,
        sendMessageSound: false,
        receiveMessageSound: false,
      },
      feedback: {
        color: '#303235',
        backgroundColor: '#ffffff',
        buttonColor: '#ffffff',
      },
      footer: {
        textColor: '#303235',
        text: '',
        company: privacyPolicyText,
        companyLink: ishLink,
      },
    },
    disclaimer: {
      title: 'Disclaimer',
      message: disclaimerMessage,
      textColor: 'black',
      buttonColor: '#008e87',
      buttonText: 'Start Chatting',
      buttonTextColor: 'white',
      blurredBackgroundColor: 'rgba(0, 0, 0, 0.4)', //The color of the blurred background that overlays the chat interface
      backgroundColor: 'white',
    },
  },
});
