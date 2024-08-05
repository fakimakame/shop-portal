import { render } from '@testing-library/react';

import ProductSample from './product-sample';

describe('ProductSample', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProductSample />);
    expect(baseElement).toBeTruthy();
  });
});
