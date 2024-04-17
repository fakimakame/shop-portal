import { render } from '@testing-library/react';

import ViewProduct from './view-product';

describe('ViewProduct', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ViewProduct />);
    expect(baseElement).toBeTruthy();
  });
});
