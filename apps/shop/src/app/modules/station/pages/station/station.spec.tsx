import { render } from '@testing-library/react';

import Station from './station';

describe('Station', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Station />);
    expect(baseElement).toBeTruthy();
  });
});
