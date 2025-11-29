import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import RootLayout from './layout'

describe("LayoutTests", () => {
    const mockChildNode = <div>Mock Content</div>;

    it('should display a child node', () => {
      render(<RootLayout>{mockChildNode}</RootLayout>);
      expect(screen.getByText('Mock Content')).toBeInTheDocument();
    });
});
