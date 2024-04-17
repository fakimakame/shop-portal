import { render } from '@testing-library/react';

import AddProduct from './add-product';

describe('AddProduct', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddProduct />);
    expect(baseElement).toBeTruthy();
  });
});
