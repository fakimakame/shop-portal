import { render } from '@testing-library/react';

import AddStore from './add-store';

describe('AddStore', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddStore />);
    expect(baseElement).toBeTruthy();
  });
});
