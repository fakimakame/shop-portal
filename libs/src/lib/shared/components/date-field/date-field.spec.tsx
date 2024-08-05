import { render } from '@testing-library/react';

import DateField from './date-field';

describe('DateField', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DateField />);
    expect(baseElement).toBeTruthy();
  });
});
