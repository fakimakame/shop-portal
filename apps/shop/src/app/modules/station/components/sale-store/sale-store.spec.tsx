import { render } from '@testing-library/react';

import SaleStore from './sale-store';

describe('SaleStore', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SaleStore />);
    expect(baseElement).toBeTruthy();
  });
});
