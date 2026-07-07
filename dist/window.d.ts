import { observersConfigType } from './components/Bot';
import { BubbleTheme } from './features/bubble/types';
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
export declare const initFull: (props: BotProps & {
    id?: string;
}) => void;
export declare const init: (props: BotProps) => void;
export declare const destroy: () => void;
export declare const clearChat: (id?: string) => void;
type Chatbot = {
    initFull: typeof initFull;
    init: typeof init;
    destroy: typeof destroy;
    clearChat: typeof clearChat;
};
export declare const parseChatbot: () => {
    initFull: (props: BotProps & {
        id?: string;
    }) => void;
    init: (props: BotProps) => void;
    destroy: () => void;
    clearChat: (id?: string) => void;
};
export declare const injectChatbotInWindow: (bot: Chatbot) => void;
export {};
//# sourceMappingURL=window.d.ts.map