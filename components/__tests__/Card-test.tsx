import React from 'react';
import { render } from '@testing-library/react-native';
import { Card } from '@/components/ui/Card';

describe('Card', () => {
  it('renders correctly', () => {
    const { getByText, getByTestId } = render(
      <Card
        id="1"
        title="Title"
        description="Description"
        img="https://pocketbase-front-323.fjx.su/api/files/pbc_2195335957/or85n694qah7d96/maxresdefault_uq2khc0q6n.jpg?token="
      />,
    );
    expect(getByText('Title')).not.toBeNull();
    expect(getByText('Description')).not.toBeNull();
    expect(getByTestId('card-image-1')).not.toBeNull();
  });

  it('truncates description', () => {
    const { getByText } = render(
      <Card
        id="1"
        title="Title"
        description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum eum aliquid molestiae, non architecto inventore iusto cum natus dignissimos est fuga. Sapiente provident praesentium, molestiae ea perferendis soluta deserunt quam."
      />,
    );
    expect(
      getByText(
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum eum aliquid molestiae, non architecto inventore iusto cum natus dignissimos est fuga. Sapiente provident praesentium, molestiae ea per...',
      ),
    ).not.toBeNull();
  });

  it('does not render an image if img prop is not provided', () => {
    const { queryByTestId } = render(
      <Card id="123" title="Test Title" description="Test description" />,
    );

    expect(queryByTestId('card-image-123')).toBeNull();
  });
});
