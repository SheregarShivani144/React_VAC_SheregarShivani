import { useState } from "react";

const tokens = {
  bg: "#0A0A0F",
  surface: "#111118",
  surfaceHover: "#18181f",
  border: "rgba(255,255,255,0.08)",
  accent: "#7C6DFA",
  accentLight: "#A99CF7",
  accentGlow: "rgba(124,109,250,0.15)",
  text: "#EDECF5",
  textMuted: "#888899",
  textFaint: "#444455",
  green: "#34D399",
  coral: "#F87171",
  fontBody: "sans-serif",
};

function Button({
  children,
  onClick,
  variant = "primary",
}) {
  const styles = {
    primary: {
      background: tokens.accent,
      color: "#fff",
      border: "none",
    },
    ghost: {
      background: "transparent",
      color: tokens.textMuted,
      border: `1px solid ${tokens.border}`,
    },
  };

  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 18px",
        borderRadius: 10,
        cursor: "pointer",
        fontWeight: 600,
        ...styles[variant],
      }}
    >
      {children}
    </button>
  );
}

function Modal({
  isOpen,
  onClose,
  title,
  children,
}) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 500,
          background: tokens.surface,
          border: `1px solid ${tokens.border}`,
          borderRadius: 20,
          padding: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <h2>{title}</h2>

          <Button
            variant="ghost"
            onClick={onClose}
          >
            ✕
          </Button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [contactModal, setContactModal] =
    useState(false);

  const [submitted, setSubmitted] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.message
    ) {
      return;
    }

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);

      setContactModal(false);

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    }, 2000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: tokens.bg,
        color: tokens.text,
        fontFamily: tokens.fontBody,
        padding: "4rem 2rem",
      }}
    >
      <h1
        style={{
          fontSize: 48,
          marginBottom: 20,
        }}
      >
        Alex Carter
      </h1>

      <p
        style={{
          color: tokens.textMuted,
          marginBottom: 30,
        }}
      >
        React Portfolio Demo
      </p>

      <Button
        onClick={() => setContactModal(true)}
      >
        Open Contact Modal
      </Button>

      <Modal
        isOpen={contactModal}
        onClose={() => setContactModal(false)}
        title="Get in touch"
      >
        {submitted ? (
          <div
            style={{
              textAlign: "center",
              padding: "2rem 0",
            }}
          >
            <div
              style={{
                fontSize: 40,
                marginBottom: 12,
              }}
            >
              ✓
            </div>

            <p
              style={{
                color: tokens.green,
                fontWeight: 500,
              }}
            >
              Message sent!
            </p>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: 14 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Name
              </label>

              <input
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                placeholder="Alex Carter"
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: 10,
                  border: `1px solid ${tokens.border}`,
                  background:
                    tokens.surfaceHover,
                  color: tokens.text,
                }}
              />
            </div>

            <div style={{ marginBottom: 14 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Email
              </label>

              <input
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                placeholder="alex@example.com"
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: 10,
                  border: `1px solid ${tokens.border}`,
                  background:
                    tokens.surfaceHover,
                  color: tokens.text,
                }}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Message
              </label>

              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    message: e.target.value,
                  })
                }
                placeholder="Tell me about your project..."
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: 10,
                  border: `1px solid ${tokens.border}`,
                  background:
                    tokens.surfaceHover,
                  color: tokens.text,
                  resize: "vertical",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 10,
              }}
            >
              <Button
                variant="ghost"
                onClick={() =>
                  setContactModal(false)
                }
              >
                Cancel
              </Button>

              <Button onClick={handleSubmit}>
                Send Message
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}