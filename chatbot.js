import Chatbot from 'https://cdn.jsdelivr.net/gh/intershop/ai-flowise-chat-embed@website/partner-ai-dev-day/dist/web.js';
const welcome = {
  en: "Welcome to our onboarding process! To get you set up with the right resources and support, I'll need to collect a few details. This will only take a moment.  Please provide your information in the following format:  - Full Name: [Your full name] - Email Address: [Your professional email] - Company Name: [The name of your company] - Your Position: [e.g., Project Manager, Developer, CEO]",
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

const disclaimerTitle = {
  en: 'Disclaimer',
  fr: 'Avertissement',
  de: 'Haftungsausschluss',
};

const disclaimerButton = {
  en: 'Start Chatting',
  fr: 'Commencer la discussion',
  de: 'Chatten starten',
};

const textInput = {
  en: 'Type your question',
  fr: 'Tapez votre question',
  de: 'Geben Sie Ihre Frage ein',
};

const sources = {
  en: 'Sources:',
  fr: 'Sources:',
  de: 'Quellen:',
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
const disclaimerTitleText = disclaimerTitle[extracted_lang] || disclaimerTitle.en;
const disclaimerButtonText = disclaimerButton[extracted_lang] || disclaimerButton.en;
const textInputText = textInput[extracted_lang] || textInput.en;
const sourcesText = sources[extracted_lang] || sources.en;

Chatbot.init({
  chatflowid: "e5d78a30-e021-4195-8740-efdfe374f27a",
  apiHost: "https://ish-flowise-enterprise.cloud.intershop.com",
  chatflowConfig: {
   
  },
  observersConfig: {},
  theme: {
    button: {
      backgroundColor: '#c5083d',
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
      title: 'Assistant',
      //titleAvatarSrc: " https://amisamyra99.github.io/chatbot-flowise-js-hosting/images/bot24.png",

      welcomeMessage: welcomeMessage,

      errorMessage: errorMessage,
      backgroundColor: '#ffffff',
      //set a pixel value
      //height: 1000,
      //width: 600,
      fontSize: 16,
      clearChatOnReload: false,
      sourceDocsTitle: sourcesText,
      botMessage: {
        backgroundColor: '#f7f8ff',
        textColor: '#303235',
        // showAvatar: true,
        //avatarSrc: 'https://amisamyra99.github.io/chatbot-flowise-js-hosting/images/bot24.png',
      },
      userMessage: {
        backgroundColor: '#c5083d',
        textColor: '#ffffff',
        //showAvatar: true,
        //avatarSrc: 'https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png',
      },
      textInput: {
        placeholder: textInputText,
        backgroundColor: '#ffffff',
        textColor: '#303235',
        sendButtonColor: '#c5083d',
        maxChars: 500,
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
     tooltip: {
        showTooltip: true,
        tooltipMessage: 'Hi There 👋!',
        tooltipBackgroundColor: 'whilte',
        tooltipTextColor: '#c5083d',
        tooltipFontSize: 16,
      },
    disclaimer: {
      title: disclaimerTitleText,
      message: disclaimerMessage,
      textColor: 'black',
      buttonColor: '#c5083d',
      buttonText: disclaimerButtonText,
      buttonTextColor: 'white',
      blurredBackgroundColor: 'rgba(0, 0, 0, 0.4)', //The color of the blurred background that overlays the chat interface
      backgroundColor: 'white',
    },
  },
});