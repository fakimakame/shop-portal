import { render } from '@testing-library/react';

import InputFile from './input-file';

describe('InputFile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InputFile name={''} />);
    expect(baseElement).toBeTruthy();
  });
});
