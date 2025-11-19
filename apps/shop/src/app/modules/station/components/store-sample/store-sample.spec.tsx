import { render } from '@testing-library/react';

import StoreSample from './store-sample';

describe('StoreSample', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StoreSample />);
    expect(baseElement).toBeTruthy();
  });
});
