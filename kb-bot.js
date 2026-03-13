import Chatbot from 'https://cdn.jsdelivr.net/gh/intershop/ai-flowise-chat-embed@website/docs-intershop/dist/web.js';
const welcome = {
  en: 'Welcome to the Intershop Navigator!\nYour expert guide to the Intershop Commerce Platform and products. Whether you need help with technical configuration, troubleshooting, or product documentation, I am here to assist. Ask your questions, and let us explore solutions together.',

  de: 'Willkommen beim Intershop Navigator!\nIhr kompetenter Leitfaden zur Intershop Commerce Platform und zu den zugehörigen Produkten. Wenn Sie Unterstützung bei technischen Konfigurationen, bei der Fehlerbehebung oder bei der Produktdokumentation benötigen, unterstütze ich Sie gerne. Stellen Sie Ihre Fragen, und lassen Sie uns gemeinsam Lösungen erarbeiten.',

  fr: 'Bienvenue sur Intershop Navigator !\nVotre guide expert de la plateforme Intershop Commerce et de ses produits. Que vous ayez besoin d’aide pour la configuration technique, le dépannage ou la documentation produit, je suis là pour vous accompagner. Posez vos questions, et explorons ensemble des solutions.',
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
  en: 'Privacy Policy',
  fr: 'Politique de Confidentialité',
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

  // Regex to match language in path (/en/...) or in filename (_en.php, _de.php)
  const match = url.match(/\/([a-z]{2})(\/|$)|_([a-z]{2})\.php/);

  if (match) {
    // Check if language code is in group 1 (path) or group 3 (filename)
    const langCode = match[1] || match[3];
    return validLangCodes.includes(langCode) ? langCode : null;
  }

  return null;
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

// Function to extract the service identifier
function getServiceFromUrl(url) {
  const validServiceNames = ['icm', 'omt', 'smc', 'iac', 'cec', 'oma'];
  // Match the pattern to capture the service identifier before any two-letter language code
  const regex = /\/([a-zA-Z]+)\/(en|fr|de)\//;

  // Execute the regex match
  const match = url.match(regex);

  if (match) {
    var service_name = match[1];
    return validServiceNames.includes(service_name) ? service_name : 'unspecified';
  }

  // Return the matched service identifier if found; otherwise, default to 'icm'
  return 'unspecified';
}

var extracted_service = getServiceFromUrl(url) || 'unspecified';
console.log(extracted_service);

Chatbot.init({
  // chatflowid: '8fba968e-f8ed-4401-8a9f-57eaa5f45535',
  //apiHost: 'https://ish-flowise-app.azurewebsites.net',
  //chatflowid: "2f10770e-11c1-4821-b653-85dfde4a28ce",  // old version
  chatflowid: '06cbe974-87a2-4a91-b74b-e04b4ce4c183', // new version with updated prompt and more sources
  apiHost: 'https://ish-flowise-enterprise.cloud.intershop.com',

  chatflowConfig: {
    vars: {
      currentUrl: window.location.href,
      lang: extracted_lang,
      service: extracted_service,
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
        autoOpen: false, //parameter to control automatic window opening
        openDelay: 2, // Optional parameter for delay time in seconds
        autoOpenOnMobile: false, //parameter to control automatic window opening in mobile
      },
    },

    customCSS: ``,
    chatWindow: {
      showTitle: true,
      showAgentMessages: true,
      title: 'Intershop Navigator',
      //titleAvatarSrc: " https://amisamyra99.github.io/chatbot-flowise-js-hosting/images/bot24.png",

      welcomeMessage: welcomeMessage,

      errorMessage: errorMessage,
      backgroundColor: '#ffffff',
      //set a pixel value
      height: 1500,
      width: 1000,
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
        backgroundColor: '#008e87',
        textColor: '#ffffff',
        //showAvatar: true,
        //avatarSrc: 'https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png',
      },
      textInput: {
        placeholder: textInputText,
        backgroundColor: '#ffffff',
        textColor: '#303235',
        sendButtonColor: '#008e87',
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
    disclaimer: {
      title: disclaimerTitleText,
      message: disclaimerMessage,
      textColor: 'black',
      buttonColor: '#008e87',
      buttonText: disclaimerButtonText,
      buttonTextColor: 'white',
      blurredBackgroundColor: 'rgba(0, 0, 0, 0.4)', //The color of the blurred background that overlays the chat interface
      backgroundColor: 'white',
    },
  },
});
