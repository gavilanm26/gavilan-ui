import React from 'react';
import { render, screen } from '@testing-library/react';
import { OrthogonalCarousel } from './OrthogonalCarousel';
import { describe, it, expect } from 'vitest';

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

  it('uses visible self-contained default container styles', () => {
    const { container } = render(<OrthogonalCarousel items={dummyItems} />);
    const containerDiv = container.firstChild as HTMLElement;

    expect(containerDiv.style.position).toBe('absolute');
    expect(containerDiv.style.right).toBe('-120px');
    expect(containerDiv.style.top).toBe('-150px');
    expect(containerDiv.style.height).toBe('1120px');
    expect(containerDiv.style.width).toBe('1220px');
    expect(containerDiv.style.pointerEvents).toBe('none');
    expect(containerDiv.className).not.toContain('hidden');
    expect(containerDiv.className).not.toContain('overflow-hidden');
  });

  it('allows inline container style overrides without external CSS configuration', () => {
    const { container } = render(
      <OrthogonalCarousel items={dummyItems} style={{ right: '-40px', top: '-80px' }} />
    );
    const containerDiv = container.firstChild as HTMLElement;

    expect(containerDiv.style.right).toBe('-40px');
    expect(containerDiv.style.top).toBe('-80px');
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
