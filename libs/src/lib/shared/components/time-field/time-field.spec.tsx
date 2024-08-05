import { render } from '@testing-library/react';

import TimeField from './time-field';

describe('TimeField', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TimeField />);
    expect(baseElement).toBeTruthy();
  });
});
