import { render } from '@testing-library/react';

import SharedDialog from './shared-dialog';

describe('SharedDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedDialog />);
    expect(baseElement).toBeTruthy();
  });
});
