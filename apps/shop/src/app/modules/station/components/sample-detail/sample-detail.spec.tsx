import { render } from '@testing-library/react';

import SampleDetail from './sample-detail';

describe('SampleDetail', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SampleDetail />);
    expect(baseElement).toBeTruthy();
  });
});
