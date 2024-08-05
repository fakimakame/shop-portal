import { render } from '@testing-library/react';

import AddPurchase from './add-purchase';

describe('AddPurchase', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddPurchase />);
    expect(baseElement).toBeTruthy();
  });
});
