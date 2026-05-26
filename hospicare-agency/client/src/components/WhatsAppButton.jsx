const WhatsAppButton = () => {
  return (
    <a
      className="whatsappButton"
      href="https://wa.me/919823045678"
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
