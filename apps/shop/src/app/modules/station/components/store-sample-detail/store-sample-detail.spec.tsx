import { render } from '@testing-library/react';

import StoreSampleDetail from './store-sample-detail';

describe('StoreSampleDetail', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StoreSampleDetail />);
    expect(baseElement).toBeTruthy();
  });
});
