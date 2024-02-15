import { render } from '@testing-library/react';

import MaterialTable from './material-table';

describe('MaterialTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MaterialTable />);
    expect(baseElement).toBeTruthy();
  });
});
