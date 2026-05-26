# @gavilanm20/gavilan-ui

Una colección premium e interactiva de componentes y animaciones visuales de alta gama para **React** y **Framer Motion**, diseñados bajo los más altos estándares de UI/UX, micro-movimiento acelerado por hardware y un diseño editorial minimalista sofisticado.

---

## 🚀 Instalación

Instala el paquete en tu proyecto favorito usando tu gestor de paquetes preferido:

```bash
# Con pnpm (recomendado)
pnpm add @gavilanm20/gavilan-ui

# Con npm
npm install @gavilanm20/gavilan-ui

# Con yarn
yarn add @gavilanm20/gavilan-ui
```

### 📦 Dependencias requeridas (Peer Dependencies)

Este paquete asume que ya tienes instalados en tu proyecto `react`, `react-dom` y `framer-motion`:

```bash
pnpm add framer-motion
```

---

## 🎠 Componentes Disponibles

### 1. `OrthogonalCarousel`

Un carrusel cuadrangular acelerado por GPU que desliza tarjetas de forma majestuosa en un flujo vertical/horizontal continuo.

#### 💡 Ejemplo de Uso en Next.js (App Router) o React (Vite)

```tsx
"use client";

import { OrthogonalCarousel } from '@gavilanm20/gavilan-ui';

// Tus tarjetas personalizadas (pueden ser cualquier elemento JSX)
const myCards = [
  <div className="w-[486px] h-[252px] bg-black text-white rounded-[18px] p-9 flex flex-col justify-between">
    <h2>Escribo código invisible que sostiene sistemas a gran escala.</h2>
    <span>// 01</span>
  </div>,
  <div className="w-[486px] h-[252px] bg-[#f7f5f0] text-black rounded-[18px] p-9 flex flex-col justify-between">
    <h2>Diseño e implemento microservicios elásticos sobre AWS.</h2>
    <span>// 02</span>
  </div>,
  <div className="w-[486px] h-[252px] bg-[#fff0ec] text-[#C2410C] rounded-[18px] p-9 flex flex-col justify-between">
    <h2>Clean Architecture & High Performance.</h2>
    <span>// 03</span>
  </div>
];

export default function HeroSection() {
  return (
    <div className="relative min-h-screen w-full bg-[#f3f0ea] overflow-hidden">
      {/* Carrusel ortogonal premium de fondo */}
      <OrthogonalCarousel 
        items={myCards} 
        speed={0.00008} 
        backgroundColor="#f3f0ea"
        glowOpacity={0.42}
      />
      
      {/* Contenido de tu Hero */}
      <div className="relative z-10 p-24">
        <h1>Mi Portafolio</h1>
      </div>
    </div>
  );
}
```

#### ⚙️ Props del Componente

| Prop | Tipo | Por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `items` | `React.ReactNode[]` | **Requerido** | El array de componentes, tarjetas o layouts JSX que girarán de forma ortogonal. |
| `speed` | `number` | `0.00008` | Velocidad del ciclo de animación. Valores menores reducen la velocidad del giro. |
| `backgroundColor` | `string` | `"#f3f0ea"` | Color de fondo de los difuminados superior/inferior para mezclarse fluidamente con el contenedor principal. |
| `glowOpacity` | `number` | `0.42` | Fuerza del brillo radial blanco central. Valores óptimos entre `0` y `1`. |
| `className` | `string` | *(Varios estilos de posicionamiento)* | Clases de Tailwind o CSS convencionales para alterar la ubicación del carrusel en escritorio o responsive. |

---

## 🛠️ Desarrollo Local e inicialización en Git

Si deseas clonar esta librería y agregar nuevos componentes atómicos (`Buttons`, `Cards`, `Inputs`), sigue estos pasos:

1. **Clonar e instalar dependencias**:
   ```bash
   pnpm install
   ```
2. **Ejecutar en modo desarrollo** (compilación en tiempo real ante cambios):
   ```bash
   pnpm dev
   ```
3. **Construir para producción** (genera la carpeta `dist/` optimizada y con declaración de tipos):
   ```bash
   pnpm build
   ```

---

## 📤 Publicación en NPM (Paso a Paso)

Cuando estés listo para subir tu librería a los servidores globales de `npm`:

1. **Iniciar sesión en NPM desde tu terminal** (solo la primera vez):
   ```bash
   npm login
   ```
2. **Compilar y publicar**:
   ```bash
   pnpm build && npm publish
   ```
   *(Si utilizas un nombre de scope como `@tu-usuario/gavilan-ui`, usa `npm publish --access public` la primera vez).*

---

## 📄 Licencia

MIT
