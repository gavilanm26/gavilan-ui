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
   * Clases de CSS adicionales opcionales para personalizar el contenedor.
   */
  className?: string;
}

export function OrthogonalCard({
  kind,
  title,
  badge,
  bgImage,
  className = "",
}: OrthogonalCardProps) {
  // Dimensiones y radio de bordes idénticos a los del inspector de Taste Skill (486px x 252px, rounded-[18px])
  const cardStyles = `w-[486px] h-[252px] rounded-[18px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden font-sans border border-black/[0.03] select-none ${className}`;

  switch (kind) {
    case "dark":
      return (
        <div className={`${cardStyles} bg-[#0b0f12] text-white relative flex flex-col justify-between p-9 text-left`}>
          <div className="absolute top-9 right-9 grid grid-cols-3 gap-1">
            {[...Array(9)].map((_, i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 bg-[#52a350] rounded-[1px]"
              />
            ))}
          </div>
          <h2 className="text-[28px] font-medium leading-[1.25] tracking-tight max-w-[85%] mt-auto mb-auto">
            {title || "We build systems teams actually run, scale, and trust."}
          </h2>
          <div className="w-8 h-8 border-2 border-[#52a350] rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-[#52a350] rounded-full" />
          </div>
        </div>
      );

    case "plants":
      return (
        <div className={`${cardStyles} bg-[#f7f5f0] text-[#1c231f] p-9 text-left`}>
          <div className="grid grid-cols-[1.2fr_1fr] h-full gap-5">
            <h2
              className="text-[36px] font-normal leading-[1.15] tracking-tight text-[#2d3b32] mt-4"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {title || "Plants for slower rooms"}
            </h2>
            <div
              className="w-full h-full rounded-2xl bg-cover bg-center"
              style={{
                backgroundImage: `url('${bgImage || "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80&w=400"}')`,
              }}
            />
          </div>
        </div>
      );

    case "light":
      return (
        <div className={`${cardStyles} bg-[#fdfcfb] text-[#111111] flex flex-col justify-between p-9 text-left`}>
          <h2 className="text-[40px] font-semibold tracking-[-1px] leading-[1.1] mt-2">
            {title || (
              <>
                Less slop,
                <br />
                backends pop
              </>
            )}
          </h2>
          <div className="self-start bg-[#fff0ec] text-[#C2410C] px-4 py-1.5 rounded-full text-[13px] font-semibold flex items-center gap-2 border border-[#ffe1da]">
            <span className="text-[11px]">✓</span> {badge || "Clean Architecture"}
          </div>
        </div>
      );

    case "code":
      return (
        <div className={`${cardStyles} bg-[#141416] text-[#a1a1a6] p-8 flex flex-col justify-between font-mono text-[13px] leading-relaxed text-left`}>
          <div className="space-y-1 opacity-80">
            <p className="text-[#f5f5f7]">
              <span className="text-[#ff7b72]">import</span> &#123; Hexagonal &#125; <span className="text-[#ff7b72]">from</span> <span className="text-[#a5d6ff]">"architecture"</span>;
            </p>
            <p>
              <span className="text-[#ff7b72]">const</span> <span className="text-[#79c0ff]">core</span> = &#123;
            </p>
            <p className="pl-4">
              domain: <span className="text-[#a5d6ff]">"CleanCode"</span>,
            </p>
            <p className="pl-4">
              pattern: <span className="text-[#a5d6ff]">"PortsAndAdapters"</span>
            </p>
            <p>&#125;;</p>
          </div>
          <div className="text-[11px] text-[#52a350] bg-[#52a350]/10 px-2.5 py-1 rounded md self-start">
            {badge || "// high performance"}
          </div>
        </div>
      );

    case "studio":
      return (
        <div className={`${cardStyles} bg-[#000000] text-white relative p-9 flex flex-col justify-between text-left`}>
          <div className="text-[11px] tracking-[0.2em] uppercase opacity-40 font-bold">
            {badge || "Studio Session"}
          </div>
          <h2 className="text-[32px] font-light tracking-tight leading-tight">
            {title || (
              <>
                Crafting resilient{" "}
                <span className="italic font-normal text-zinc-400">systems</span>.
              </>
            )}
          </h2>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          </div>
        </div>
      );

    case "aurora":
    default:
      return (
        <div className={`${cardStyles} bg-[#0d0914] text-white relative p-9 flex flex-col justify-between overflow-hidden text-left`}>
          {/* Fondo difuminado estilo Aurora Borealis */}
          <div className="absolute -inset-10 opacity-40 bg-[radial-gradient(circle_at_top_right,#4f46e5,#06b6d4_50%,transparent)] blur-[40px]" />
          <div className="relative z-10 text-[12px] opacity-60 font-semibold">
            {badge || "System Diagnostics"}
          </div>
          <h2 className="relative z-10 text-[26px] font-medium tracking-tight leading-snug max-w-[90%] my-auto">
            {title || "High-fidelity microservices operational."}
          </h2>
          <div className="relative z-10 text-[11px] text-cyan-400 font-mono">
            STATUS // ACTIVE
          </div>
        </div>
      );
  }
}
