import { render } from '@testing-library/react';

import ViewStation from './view-station';

describe('ViewStation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ViewStation />);
    expect(baseElement).toBeTruthy();
  });
});
