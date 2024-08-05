import { render } from '@testing-library/react';

import ShiftAssigment from './shift-assigment';

describe('ShiftAssigment', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ShiftAssigment />);
    expect(baseElement).toBeTruthy();
  });
});
