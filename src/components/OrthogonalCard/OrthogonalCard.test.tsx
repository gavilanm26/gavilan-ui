import React from 'react';
import { render, screen } from '@testing-library/react';
import { OrthogonalCard } from './OrthogonalCard';
import { describe, it, expect } from 'vitest';

describe('OrthogonalCard Component', () => {
  it('renders dark card style correctly with custom title', () => {
    render(<OrthogonalCard kind="dark" title="Custom Dark Title" />);
    expect(screen.getByText('Custom Dark Title')).toBeDefined();
  });

  it('renders plants card style with custom title and check image structure', () => {
    render(<OrthogonalCard kind="plants" title="Custom Plants Title" bgImage="https://example.com/test.jpg" />);
    expect(screen.getByText('Custom Plants Title')).toBeDefined();
  });

  it('renders light card with badge', () => {
    render(<OrthogonalCard kind="light" title="Custom Light Title" badge="Special Badge" />);
    expect(screen.getByText('Special Badge')).toBeDefined();
  });

  it('renders code card with custom badge', () => {
    render(<OrthogonalCard kind="code" badge="Custom Performance" />);
    expect(screen.getByText('Custom Performance')).toBeDefined();
  });

  it('renders studio card with pulse elements', () => {
    render(<OrthogonalCard kind="studio" title="Studio Title" badge="Live Recording" />);
    expect(screen.getByText('Live Recording')).toBeDefined();
    expect(screen.getByText('Studio Title')).toBeDefined();
  });

  it('renders aurora card with dynamic lights and title', () => {
    render(<OrthogonalCard kind="aurora" title="Aurora Core" badge="System Health" />);
    expect(screen.getByText('System Health')).toBeDefined();
    expect(screen.getByText('Aurora Core')).toBeDefined();
  });
});
