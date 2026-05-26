import React from 'react';
import { render, screen } from '@testing-library/react';
import { OrthogonalCarousel } from './OrthogonalCarousel';
import { describe, it, expect, vi } from 'vitest';

// Simulamos Framer Motion y useAnimationFrame para que los tests no dependan del ciclo de renderizado del navegador
vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal<typeof import('framer-motion')>();
  return {
    ...actual,
    useAnimationFrame: (callback: (time: number) => void) => {
      React.useEffect(() => {
        callback(1000);
      }, [callback]);
    },
    // Mock básico del componente motion.div para renderizar divs regulares en el entorno de pruebas
    motion: {
      div: React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => (
        <div ref={ref} {...props} />
      )),
    }
  };
});

describe('OrthogonalCarousel Component', () => {
  const dummyItems = [
    <div key="1" data-testid="carousel-item-1">Card 1</div>,
    <div key="2" data-testid="carousel-item-2">Card 2</div>,
    <div key="3" data-testid="carousel-item-3">Card 3</div>
  ];

  it('renders without crashing', () => {
    const { container } = render(<OrthogonalCarousel items={dummyItems} />);
    expect(container).toBeDefined();
  });

  it('renders the correct amount of items passed as props', () => {
    render(<OrthogonalCarousel items={dummyItems} />);
    
    // Verificamos que los tres elementos simulados existan en el documento
    expect(screen.getByTestId('carousel-item-1')).toBeDefined();
    expect(screen.getByTestId('carousel-item-2')).toBeDefined();
    expect(screen.getByTestId('carousel-item-3')).toBeDefined();
  });

  it('applies the dynamic background color styles inline for gradient masking', () => {
    const customBg = '#ff0000';
    const { container } = render(
      <OrthogonalCarousel items={dummyItems} backgroundColor={customBg} />
    );

    // Buscamos los divs que manejan las máscaras de gradiente (los dos primeros divs dentro del contenedor principal)
    const containerDiv = container.firstChild as HTMLElement;
    const firstMask = containerDiv.children[0] as HTMLElement;
    const secondMask = containerDiv.children[1] as HTMLElement;

    expect(firstMask.style.background).toContain('#ff0000');
    expect(secondMask.style.background).toContain('#ff0000');
  });
});
