const WhatsAppButton = () => {
  return (
    <a
      className="whatsappButton"
      href="https://wa.me/917972661390"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <span className="whatsappIcon" aria-hidden="true">
        💬
      </span>
    </a>
  );
};

export default WhatsAppButton;
