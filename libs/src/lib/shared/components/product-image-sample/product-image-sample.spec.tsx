import { render } from '@testing-library/react';

import ProductImageSample from './product-image-sample';

describe('ProductImageSample', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProductImageSample />);
    expect(baseElement).toBeTruthy();
  });
});
