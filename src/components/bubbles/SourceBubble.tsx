type Props = {
  pageContent: string;
  metadata: object;
  onSourceClick?: () => void;
};

export const SourceBubble = (props: Props) => (
  <div
    data-modal-target="defaultModal"
    data-modal-toggle="defaultModal"
    class="flex justify-start mb-2 items-start animate-fade-in host-container hover:brightness-90 active:brightness-75"
    onClick={() => props.onSourceClick?.()}
  >
    <span
      class="px-2 py-1 ml-1 whitespace-pre-wrap max-w-full max-w-[350px] chatbot-host-bubble w-full text-ellipsis overflow-hidden"
      data-testid="host-bubble"
      style={{
        'font-size': '0.8rem',
        'border-radius': '15px',
        cursor: 'pointer',
      }}
    >
      {props.pageContent}
    </span>
  </div>
);
