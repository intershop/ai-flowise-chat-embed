import { Show, splitProps, createSignal } from 'solid-js';

export type DisclaimerPopupProps = {
  isOpen?: boolean;
  onAccept?: () => void;
  title?: string;
  message?: string;
  buttonText?: string;
};

export const DisclaimerPopup = (props: DisclaimerPopupProps) => {
  const [popupProps] = splitProps(props, ['onAccept', 'isOpen', 'title', 'message', 'buttonText']);
  const [isHovered, setIsHovered] = createSignal(false);

  const handleAccept = () => {
    props.onAccept?.();
  };

  return (
    <Show when={popupProps.isOpen}>
      <div class="fixed inset-0 rounded-lg flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50">
        <div class="bg-white p-4 shadow-lg max-w-md w-full text-center font-sans">
          <h2 class="text-2xl font-semibold mb-4 flex" style={{ 'font-family': 'Source Serif Pro', 'text-align': 'left' }}>
            {popupProps.title ?? 'Disclaimer'}
          </h2>

          <p
            class="mb-4"
            style={{ 'font-size': '0.75rem', color: '#333333', 'text-align': 'left' }}
            innerHTML={popupProps.message ?? 'By using this chatbot, you acknowledge and accept these terms.'}
          />

          <div class="flex justify-center">
            <button
              style={{
                'background-color': isHovered() ? '#ec0a49' : '#c5083d',
                'border-radius': '2.25rem',
                'font-weight': '400',
                'font-size': '75%',
                'line-height': '1',
                color: 'white',
                'font-family': 'Open Sans ,-apple-system,BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Helvetica Neue ,Arial,sans-serif',
              }}
              class="py-2 px-6 focus:outline-none focus:shadow-outline"
              onClick={handleAccept}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {popupProps.buttonText ?? 'Start Chatting'}
            </button>
          </div>
        </div>
      </div>
    </Show>
  );
};
