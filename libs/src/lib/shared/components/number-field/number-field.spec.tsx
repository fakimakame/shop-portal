import { render } from '@testing-library/react';

import NumberField from './number-field';

describe('NumberField', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NumberField />);
    expect(baseElement).toBeTruthy();
  });
});
