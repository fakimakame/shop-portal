import { render } from '@testing-library/react';

import AddCategory from './add-category';

describe('AddCategory', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddCategory />);
    expect(baseElement).toBeTruthy();
  });
});
