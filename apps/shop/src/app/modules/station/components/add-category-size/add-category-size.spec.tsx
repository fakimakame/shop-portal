import { render } from '@testing-library/react';

import AddCategorySize from './add-category-size';

describe('AddCategorySize', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddCategorySize />);
    expect(baseElement).toBeTruthy();
  });
});
