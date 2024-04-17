import { render } from '@testing-library/react';

import ViewUser from './view-user';

describe('ViewUser', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ViewUser />);
    expect(baseElement).toBeTruthy();
  });
});
