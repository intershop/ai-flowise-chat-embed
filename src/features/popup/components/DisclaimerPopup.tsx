import { Show, splitProps, createSignal } from 'solid-js';

export type DisclaimerPopupProps = {
  isOpen?: boolean;
  isDeclined?: boolean;
  onAccept?: () => void;
  onDecline?: () => void;
  title?: string;
  message?: string;
  buttonText?: string;
  blurredBackgroundColor?: string;
  backgroundColor?: string;
  buttonColor?: string;
  textColor?: string;
  buttonTextColor?: string;
  declineButtonText?: string;
  closeButtonText?: string;
};

export const DisclaimerPopup = (props: DisclaimerPopupProps) => {
  const [popupProps] = splitProps(props, [
    'onAccept',
    'onDecline',
    'isOpen',
    'isDeclined',
    'title',
    'message',
    'textColor',
    'buttonColor',
    'buttonText',
    'buttonTextColor',
    'blurredBackgroundColor',
    'backgroundColor',
    'declineButtonText',
    'closeButtonText',
  ]);

  const [isHoveredAccept, setIsHoveredAccept] = createSignal(false);
  const [isHoveredDecline, setIsHoveredDecline] = createSignal(false);
  const [isHoveredClose, setIsHoveredClose] = createSignal(false);
  const [isDeclined, setIsDeclined] = createSignal(false);

  const handleAccept = () => {
    popupProps.onAccept?.();
  };

  const handleDecline = () => {
    setIsDeclined(true);
  };

  const handleClose = () => {
    props.onDecline?.();
    setIsDeclined(false);
  };

  return (
    <Show when={popupProps.isOpen}>
      <div class="fixed inset-0 rounded-lg flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50">
        <div class="bg-white p-4 shadow-lg max-w-md w-full text-center font-sans">
          <Show
            when={!isDeclined()}
            fallback={
              <>
                <h2 class="text-2xl font-semibold mb-4 flex" style={{ 'font-family': 'Source Serif Pro', 'text-align': 'left' }}>
                  Okay, we understand.
                </h2>
                <p class="mb-4" style={{ 'font-size': '0.75rem', color: '#333333', 'text-align': 'left' }}>
                  When you are ready to continue, feel free to come back to the chat and click "I agree". Thank you!
                </p>
                <button
                  style={{
                    'background-color': isHoveredClose() ? '#ec0a49' : '#C6183D',
                    'border-radius': '2.25em',
                    'font-weight': '400',
                    'font-size': '75%',
                    'line-height': '1',
                    padding: '0.75em 1em',
                    color: 'white',
                  }}
                  onMouseEnter={() => setIsHoveredClose(true)}
                  onMouseLeave={() => setIsHoveredClose(false)}
                  onClick={handleClose}
                >
                  {popupProps.closeButtonText ?? 'Close'}
                </button>
              </>
            }
          >
            <h2 class="text-2xl font-semibold mb-4 flex" style={{ 'font-family': 'Source Serif Pro', 'text-align': 'left' }}>
              {popupProps.title ?? 'Disclaimer'}
            </h2>
            <p
              class="mb-4"
              style={{ 'font-size': '0.75rem', color: '#333333', 'text-align': 'left' }}
              innerHTML={popupProps.message ?? 'By using this chatbot, you acknowledge and accept these terms.'}
            />
            <div class="flex justify-center space-x-4">
              <button
                style={{
                  'background-color': isHoveredAccept() ? '#ec0a49' : '#C6183D',
                  'border-radius': '2.25em',
                  'font-weight': '400',
                  'font-size': '75%',
                  'line-height': '1',
                  padding: '0.75em 1em',
                  color: 'white',
                }}
                onMouseEnter={() => setIsHoveredAccept(true)}
                onMouseLeave={() => setIsHoveredAccept(false)}
                onClick={handleAccept}
              >
                {popupProps.buttonText ?? 'I Agree'}
              </button>
              <button
                style={{
                  'background-color': 'white',
                  border: isHoveredDecline() ? '1px solid #C6183D' : '1px solid #c6183d1a',
                  'border-radius': '2.25em',
                  'font-weight': '400',
                  'font-size': '75%',
                  'line-height': '1',
                  padding: '0.75em 1.0em',
                  color: '#c6183d',
                  transition: 'color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out',
                  cursor: 'pointer',
                  'text-align': 'center',
                  'user-select': 'none',
                }}
                onMouseEnter={() => setIsHoveredDecline(true)}
                onMouseLeave={() => setIsHoveredDecline(false)}
                onClick={handleDecline}
              >
                {popupProps.declineButtonText ?? 'Decline'}
              </button>
            </div>
          </Show>
        </div>
      </div>
    </Show>
  );
};
