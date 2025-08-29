import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from './page'

describe("PageTests", () => {
    it('should display an image in the header', () => {
      render(<Page />);
      expect(screen.getByRole('img', { name: "Travis Craft" })).toBeDefined();
    });
});
