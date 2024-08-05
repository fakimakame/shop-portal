import { render } from '@testing-library/react';

import SaleSite from './sale-site';

describe('SaleSite', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SaleSite />);
    expect(baseElement).toBeTruthy();
  });
});
