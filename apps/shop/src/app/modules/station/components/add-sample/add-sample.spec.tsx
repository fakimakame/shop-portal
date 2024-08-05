import { render } from '@testing-library/react';

import AddSample from './add-sample';

describe('AddSample', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddSample />);
    expect(baseElement).toBeTruthy();
  });
});
