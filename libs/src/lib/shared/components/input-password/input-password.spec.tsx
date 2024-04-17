import { render } from '@testing-library/react';

import InputPassword from './input-password';

describe('InputPassword', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InputPassword />);
    expect(baseElement).toBeTruthy();
  });
});
