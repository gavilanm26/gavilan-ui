"use client";

import React, { useState, useEffect } from "react";

export interface OrthogonalCarouselProps {
  /**
   * Array de componentes visuales (tarjetas, layouts o elementos JSX) que rotarán en la rueda.
   */
  items: React.ReactNode[];

  /**
   * Velocidad del ciclo de animación. Valores menores producen un giro más lento y majestuoso.
   * Por defecto: 0.000042
   */
  speed?: number;

  /**
   * Color de fondo de los difuminados superior/inferior para mezclarse perfectamente con tu sitio.
   * Formato: Hexadecimal, RGB o color válido de CSS.
   * Por defecto: "#f3f0ea"
   */
  backgroundColor?: string;

  /**
   * Opacidad o fuerza del brillo radial blanco central. Valores entre 0 y 1.
   * Por defecto: 0.42
   */
  glowOpacity?: number;

  /**
   * Clases CSS opcionales para integrar con el layout del consumidor.
   * La estructura crítica del carrusel no depende de estas clases.
   */
  className?: string;

  /**
   * Estilos inline opcionales para ajustar el contenedor sin requerir Tailwind u otro CSS externo.
   */
  style?: React.CSSProperties;
}

export function OrthogonalCarousel({
  items,
  speed = 0.000042,
  backgroundColor = "#f3f0ea",
  glowOpacity = 0.42,
  className = "",
  style,
}: OrthogonalCarouselProps) {
  const [rotation, setRotation] = useState(0);
  const total = items.length;

  useEffect(() => {
    console.log("✨ [@gavilanm/ui] OrthogonalCarousel montado con éxito! Total de items:", total);
  }, [total]);

  // Usamos requestAnimationFrame nativo de HTML5 para garantizar un giro majestuoso
  // 100% inmune a bugs de inicialización de Framer Motion o desajustes en React 19
  useEffect(() => {
    let frameId: number;
    let lastTime = 0;
    let currentRot = 0;

    const tick = (time: number) => {
      // time viene en milisegundos desde el origen de navegación
      setRotation(time * speed);
      lastTime = time;
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    // Fallback de contingencia con setInterval en caso de que el navegador suspenda el frame en caliente
    const intervalId = setInterval(() => {
      if (lastTime === 0) {
        currentRot += 16.67 * speed;
        setRotation(currentRot);
      }
    }, 16.67);

    return () => {
      cancelAnimationFrame(frameId);
      clearInterval(intervalId);
    };
  }, [speed]);

  return (
    <div
      className={className}
      style={{
        pointerEvents: "none",
        position: "fixed",
        right: "-120px",
        top: "-150px",
        zIndex: 10,
        height: "1120px",
        width: "1220px",
        isolation: "isolate",
        transform: "translateZ(0px)",
        willChange: "transform",
        ...style,
      }}
    >
      {/* Máscaras de gradiente dinámico para fundido suave con el color de fondo */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          zIndex: 12,
          height: "120px",
          background: `linear-gradient(to bottom, ${backgroundColor} 0%, ${backgroundColor} 85%, transparent 100%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 12,
          height: "130px",
          background: `linear-gradient(to top, ${backgroundColor} 0%, ${backgroundColor} 82%, transparent 100%)`,
        }}
      />

      {/* Brillo radial central orgánico */}
      <div
        style={{
          position: "absolute",
          left: "61%",
          top: "52%",
          height: "820px",
          width: "820px",
          transform: "translate(-50%, -50%)",
          borderRadius: "9999px",
          pointerEvents: "none",
          background: `radial-gradient(circle, rgba(255,255,255,${glowOpacity}), rgba(255,255,255,0) 70%)`,
        }}
      />

      {items.map((item, index) => {
        // Progreso cíclico secuencial (0 a 1) para que salgan una detrás de otra
        const p = (rotation + index / total) % 1;

        // Geometría del Cuadrado (Recorrido físico ortogonal de alta fidelidad)
        const X_MIN = 520; // Posicionado a la derecha de la pantalla
        const X_MAX = 1500; // Recorrido extendido para salir completamente de la pantalla
        const Y_MIN = 100; // Nace arriba
        const Y_MAX = 840; // Baja profundamente en el eje Y

        let x = X_MIN;
        let y = Y_MIN;
        let opacity = 0;
        let scale = 0.65;
        let rotate = 0;

        // Intervalo o retardo de espera arriba para que emerja de forma compacta y continua
        const P_DELAY = 0.05;

        // TRAMO 1: Caída Recta Vertical Elegante con Retraso/Intervalo (0% a 50% del ciclo)
        if (p < 0.5) {
          if (p < P_DELAY) {
            x = X_MIN;
            y = Y_MIN;
            opacity = 0;
            scale = 0.65;
            rotate = -3.0;
          } else {
            const t = (p - P_DELAY) / (0.5 - P_DELAY);
            x = X_MIN;
            y = Y_MIN + t * (Y_MAX - Y_MIN);

            // Revelado rápido (primer 10% del trayecto real) para que se asome limpiamente
            if (t < 0.1) {
              opacity = t / 0.1;
            } else {
              opacity = 1.0;
            }

            scale = 0.65 + t * 0.35; // Crece de 0.65 a 1.0 en su descenso real
            rotate = -3.0 + t * 4.5; // Inclinación sutil sobre su eje
          }
        }
        // TRAMO 2: Fuga Recta Horizontal Sólida a la Derecha (50% a 85% del ciclo)
        else if (p < 0.85) {
          const t = (p - 0.5) / 0.35;
          x = X_MIN + t * (X_MAX - X_MIN);
          y = Y_MAX;

          opacity = 1.0; // Se mantiene sólida y visible hasta salir de la pantalla
          scale = 1.0; // Mantiene su escala protagónica completa
          rotate = 1.5 + t * 3.0; // Continuación sutil de inclinación
        }
        // TRAMOS 3 y 4: Retorno y Subida Trasera (85% a 100% del ciclo) - COMPLETAMENTE INVISIBLES
        else {
          opacity = 0;
          scale = 0.65;
          rotate = 0;

          // Viaja de regreso invisible linealmente al inicio para cerrar el bucle
          const t = (p - 0.85) / 0.15;
          x = X_MAX - t * (X_MAX - X_MIN);
          y = Y_MAX - t * (Y_MAX - Y_MIN);
        }

        // Z-Index: Disminuye a medida que avanza en el ciclo visible (rango de 10 a 2).
        // Esto garantiza que la tarjeta que sale/nace arriba (menor p) quede físicamente POR ENCIMA (adelante) de la que va adelante (mayor p).
        const zIndex = Math.round(10 - p * 8);

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              transform: `translate3d(${x}px, ${y}px, 0px) scale(${scale}) rotate(${rotate}deg)`,
              opacity,
              zIndex,
              transformOrigin: "center center",
              willChange: "transform",
            }}
          >
            <div style={{ transform: "translate(-50%, -50%)" }}>{item}</div>
          </div>
        );
      })}
    </div>
  );
}
