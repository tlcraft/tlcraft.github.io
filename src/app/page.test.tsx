import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from './page'

describe("PageTests", () => {
    it('should display an image in the header', () => {
      render(<Page />);
      expect(screen.getByRole('img', { name: "Travis Craft" })).toBeDefined();
    });

    it('should include a link to the About section in the header', () => {
      render(<Page />);
      expect(screen.getByRole('link', { name: "About" })).toBeDefined();
    });

    it('should include a link to the Technologies section in the header', () => {
      render(<Page />);
      expect(screen.getByRole('link', { name: "Technologies" })).toBeDefined();
    });

    it('should pass', () => {
      render(<Page />);
      expect(false).toBe(true);
    });
});
