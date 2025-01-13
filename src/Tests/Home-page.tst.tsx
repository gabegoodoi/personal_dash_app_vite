import { render } from '@testing-library/react';
import HomePage from '..Home-page';

// This will give us an error
describe("HomePage", () => {
    it("renders without error", () => {
        render(<HomePage />)
    });
});