import { render } from '@testing-library/react';

import OpenShift from './open-shift';

describe('OpenShift', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OpenShift />);
    expect(baseElement).toBeTruthy();
  });
});
