import { render } from '@testing-library/react';

import SaleSampleDetail from './sale-sample-detail';

describe('SaleSampleDetail', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SaleSampleDetail />);
    expect(baseElement).toBeTruthy();
  });
});
