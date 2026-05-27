"use client";

import React from "react";

export interface OrthogonalCardProps {
  /**
   * Estilo premium de la tarjeta inspirado en Taste Skill.
   */
  kind: "dark" | "plants" | "light" | "code" | "studio" | "aurora";

  /**
   * Título principal o texto protagónico de la tarjeta.
   */
  title?: string | React.ReactNode;

  /**
   * Texto de badge o etiqueta de estado (badge superior o inferior según el estilo).
   */
  badge?: string;

  /**
   * URL de la imagen de fondo (requerido para el estilo 'plants' u otros).
   */
  bgImage?: string;

  /**
   * Estilos inline adicionales para personalizar.
   */
  style?: React.CSSProperties;

  /**
   * Clases CSS opcionales para capas de diseño superiores.
   */
  className?: string;
}

export function OrthogonalCard({
  kind,
  title,
  badge,
  bgImage,
  style = {},
  className = "",
}: OrthogonalCardProps) {
  // Estilo estructural crítico base en CSS inline de toda la vida
  // Esto inmuniza a la librería contra bundlers que no compilan Tailwind de node_modules
  const cardBaseStyle: React.CSSProperties = {
    width: "486px",
    height: "252px",
    borderRadius: "18px",
    overflow: "hidden",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "36px",
    boxSizing: "border-box",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    border: "1px solid rgba(0, 0, 0, 0.03)",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.03)",
    userSelect: "none",
    textAlign: "left",
    backgroundSize: "cover",
    backgroundPosition: "center",
    ...style,
  };

  // Función auxiliar para mezclar de forma legible imágenes de fondo con colores y superposiciones oscuras/claras
  const getBackgroundStyle = (defaultColor: string, isLight: boolean): React.CSSProperties => {
    if (bgImage) {
      const overlay = isLight
        ? "linear-gradient(to bottom, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.93) 100%)"
        : "linear-gradient(to bottom, rgba(15, 20, 25, 0.65) 0%, rgba(10, 12, 16, 0.88) 100%)";
      return {
        backgroundImage: `${overlay}, url('${bgImage}')`,
      };
    }
    return {
      backgroundColor: defaultColor,
    };
  };

  switch (kind) {
    case "dark":
      return (
        <div
          className={className}
          style={{
            ...cardBaseStyle,
            ...getBackgroundStyle("#0b0f12", false),
            color: "#ffffff",
          }}
        >
          {/* Grid decorativo verde */}
          <div
            style={{
              position: "absolute",
              top: "36px",
              right: "36px",
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "4px",
              zIndex: 5,
            }}
          >
            {[...Array(9)].map((_, i) => (
              <span
                key={i}
                style={{
                  width: "6px",
                  height: "6px",
                  backgroundColor: "#52a350",
                  borderRadius: "1px",
                }}
              />
            ))}
          </div>

          <h2
            style={{
              fontSize: "28px",
              fontWeight: 500,
              lineHeight: "1.25",
              letterSpacing: "-0.025em",
              maxWidth: "85%",
              marginTop: "auto",
              marginBottom: "auto",
              position: "relative",
              zIndex: 5,
            }}
          >
            {title || (
              <>
                We build{" "}
                <span style={{ textDecoration: "line-through", opacity: 0.3, fontWeight: "normal" }}>systems</span>{" "}
                teams actually run, scale, and trust.
              </>
            )}
          </h2>

          <div
            style={{
              width: "32px",
              height: "32px",
              border: "2px solid #52a350",
              borderRadius: "9999px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              zIndex: 5,
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "#52a350",
                borderRadius: "9999px",
              }}
            />
          </div>
        </div>
      );

    case "plants":
      return (
        <div
          className={className}
          style={{
            ...cardBaseStyle,
            backgroundColor: "#f7f5f0",
            color: "#1c231f",
            padding: "36px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              height: "100%",
              gap: "20px",
            }}
          >
            <h2
              style={{
                fontSize: "36px",
                fontWeight: "normal",
                lineHeight: "1.15",
                letterSpacing: "-0.025em",
                color: "#2d3b32",
                marginTop: "16px",
                fontFamily: "Georgia, serif",
              }}
            >
              {title || "Plants for slower rooms"}
            </h2>
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "16px",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundImage: `url('${bgImage || "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80&w=400"}')`,
              }}
            />
          </div>
        </div>
      );

    case "light":
      return (
        <div
          className={className}
          style={{
            ...cardBaseStyle,
            ...getBackgroundStyle("#fdfcfb", true),
            color: "#111111",
          }}
        >
          <h2
            style={{
              fontSize: "40px",
              fontWeight: 600,
              letterSpacing: "-1px",
              lineHeight: "1.1",
              marginTop: "8px",
              position: "relative",
              zIndex: 5,
            }}
          >
            {title || (
              <>
                Less slop,
                <br />
                backends pop
              </>
            )}
          </h2>
          <div
            style={{
              alignSelf: "flex-start",
              backgroundColor: "#fff0ec",
              color: "#C2410C",
              padding: "6px 16px",
              borderRadius: "9999px",
              fontSize: "13px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              border: "1px solid #ffe1da",
              position: "relative",
              zIndex: 5,
            }}
          >
            <span style={{ fontSize: "11px" }}>✓</span> {badge || "Clean Architecture"}
          </div>
        </div>
      );

    case "code":
      return (
        <div
          className={className}
          style={{
            ...cardBaseStyle,
            ...getBackgroundStyle("#141416", false),
            color: "#a1a1a6",
            fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
            fontSize: "13px",
            padding: "32px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", opacity: 0.85, position: "relative", zIndex: 5 }}>
            <p style={{ color: "#f5f5f7", margin: 0 }}>
              <span style={{ color: "#ff7b72" }}>import</span> &#123; Hexagonal &#125; <span style={{ color: "#ff7b72" }}>from</span> <span style={{ color: "#a5d6ff" }}>"architecture"</span>;
            </p>
            <p style={{ margin: 0 }}>
              <span style={{ color: "#ff7b72" }}>const</span> <span style={{ color: "#79c0ff" }}>core</span> = &#123;
            </p>
            <p style={{ paddingLeft: "16px", margin: 0 }}>
              domain: <span style={{ color: "#a5d6ff" }}>"CleanCode"</span>,
            </p>
            <p style={{ paddingLeft: "16px", margin: 0 }}>
              pattern: <span style={{ color: "#a5d6ff" }}>"PortsAndAdapters"</span>
            </p>
            <p style={{ margin: 0 }}>&#125;;</p>
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "#52a350",
              backgroundColor: "rgba(82, 163, 80, 0.1)",
              padding: "4px 10px",
              borderRadius: "4px",
              alignSelf: "flex-start",
              position: "relative",
              zIndex: 5,
            }}
          >
            {badge || "// high performance"}
          </div>
        </div>
      );

    case "studio":
      return (
        <div
          className={className}
          style={{
            ...cardBaseStyle,
            ...getBackgroundStyle("#000000", false),
            color: "#ffffff",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              opacity: 0.4,
              fontWeight: "bold",
              position: "relative",
              zIndex: 5,
            }}
          >
            {badge || "Studio Session"}
          </div>
          <h2
            style={{
              fontSize: "32px",
              fontWeight: 300,
              letterSpacing: "-0.025em",
              lineHeight: "1.25",
              position: "relative",
              zIndex: 5,
            }}
          >
            {title || (
              <>
                Crafting resilient{" "}
                <span style={{ fontStyle: "italic", fontWeight: "normal", color: "#a1a1a6" }}>systems</span>.
              </>
            )}
          </h2>
          <div style={{ display: "flex", gap: "6px", position: "relative", zIndex: 5 }}>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "9999px",
                backgroundColor: "#ef4444",
                opacity: 0.8,
              }}
            />
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "9999px",
                backgroundColor: "#27272a",
              }}
            />
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "9999px",
                backgroundColor: "#27272a",
              }}
            />
          </div>
        </div>
      );

    case "aurora":
    default:
      return (
        <div
          className={className}
          style={{
            ...cardBaseStyle,
            ...getBackgroundStyle("#0d0914", false),
            color: "#ffffff",
          }}
        >
          {/* Fondo Aurora difuminado (si no hay bgImage, o como capa trasera de color) */}
          {!bgImage && (
            <div
              style={{
                position: "absolute",
                top: "-40px",
                right: "-40px",
                bottom: "-40px",
                left: "-40px",
                opacity: 0.4,
                backgroundImage: "radial-gradient(circle at top right, #4f46e5, #06b6d4 50%, transparent)",
                filter: "blur(40px)",
                pointerEvents: "none",
              }}
            />
          )}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              fontSize: "12px",
              opacity: 0.6,
              fontWeight: 600,
            }}
          >
            {badge || "System Diagnostics"}
          </div>
          <h2
            style={{
              position: "relative",
              zIndex: 10,
              fontSize: "26px",
              fontWeight: 500,
              letterSpacing: "-0.025em",
              lineHeight: "1.3",
              maxWidth: "90%",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            {title || "High-fidelity microservices operational."}
          </h2>
          <div
            style={{
              position: "relative",
              zIndex: 10,
              fontSize: "11px",
              color: "#22d3ee",
              fontFamily: "Consolas, Monaco, monospace",
            }}
          >
            STATUS // ACTIVE
          </div>
        </div>
      );
  }
}
