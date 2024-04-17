import { render } from '@testing-library/react';

import InputCheckBox from './input-check-box';

describe('InputCheckBox', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InputCheckBox />);
    expect(baseElement).toBeTruthy();
  });
});
