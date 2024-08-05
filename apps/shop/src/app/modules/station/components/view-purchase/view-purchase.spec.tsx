import { render } from '@testing-library/react';

import ViewPurchase from './view-purchase';

describe('ViewPurchase', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ViewPurchase />);
    expect(baseElement).toBeTruthy();
  });
});
