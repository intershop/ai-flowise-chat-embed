import { observersConfigType } from './components/Bot';
import { BubbleTheme } from './features/bubble/types';

/* eslint-disable solid/reactivity */
type BotProps = {
  chatflowid: string;
  apiHost?: string;
  pageTitle?: string;
  onRequest?: (request: RequestInit) => Promise<void>;
  chatflowConfig?: Record<string, unknown>;
  observersConfig?: observersConfigType;
  theme?: BubbleTheme;
  /**
   * Portal target for NodeDetailsDialog. When provided, the dialog renders
   * into this element (outside the shadow DOM) so that `position: fixed` and
   * `z-index` operate in the host page's stacking context.
   *
   * Works with both `init` (bubble) and `initFull` (full-page) embed modes.
   * In bubble mode, falls back to the bubble's own container when not supplied.
   *
   * Accepts either a CSS selector string (resolved via `document.querySelector`)
   * or a plain `HTMLElement` reference.
   */
  dialogContainer?: string | HTMLElement;
};

let elementUsed: Element | undefined;
const defaultPageTitle = 'Flowise Chatbot Widget';

const applyPageTitle = (pageTitle?: string) => {
  if (typeof document === 'undefined' || pageTitle === undefined) return;
  document.title = pageTitle.trim() || defaultPageTitle;
};

export const initFull = (props: BotProps & { id?: string }) => {
  destroy();
  applyPageTitle(props.pageTitle);
  let fullElement = props.id ? document.getElementById(props.id) : document.querySelector('flowise-fullchatbot');
  if (!fullElement) {
    fullElement = document.createElement('flowise-fullchatbot');
    Object.assign(fullElement, props);
    document.body.appendChild(fullElement);
  } else {
    Object.assign(fullElement, props);
  }
  elementUsed = fullElement;
};

export const init = (props: BotProps) => {
  destroy();
  applyPageTitle(props.pageTitle);
  const element = document.createElement('flowise-chatbot');
  Object.assign(element, props);
  document.body.appendChild(element);
  elementUsed = element;
};

export const destroy = () => {
  elementUsed?.remove();
};

export const clearChat = (id?: string) => {
  document.dispatchEvent(new CustomEvent('flowise-clear-chat', id ? { detail: { id } } : undefined));
};

type Chatbot = {
  initFull: typeof initFull;
  init: typeof init;
  destroy: typeof destroy;
  clearChat: typeof clearChat;
};

declare const window:
  | {
      Chatbot: Chatbot | undefined;
    }
  | undefined;

export const parseChatbot = () => ({
  initFull,
  init,
  destroy,
  clearChat,
});

export const injectChatbotInWindow = (bot: Chatbot) => {
  if (typeof window === 'undefined') return;
  window.Chatbot = { ...bot };
};
