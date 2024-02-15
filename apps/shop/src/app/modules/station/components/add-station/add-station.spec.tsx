import { render } from '@testing-library/react';

import AddStation from './add-station';

describe('AddStation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddStation />);
    expect(baseElement).toBeTruthy();
  });
});
