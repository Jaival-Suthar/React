// Tested
import React from 'react';
import { render, screen } from '@testing-library/react';
import RestaurantCategory from '../RestaurantCategory';

describe('RestaurantCategory', () => {
  const mockData = {
    title: 'Main Course',
    itemCards: [
      {
        card: {
          info: {
            name: 'Paneer Butter Masala',
            imageId: 'some_image_id',
            itemAttribute: { vegClassifier: 'VEG' },
            price: 25000, // in paise
            description: 'Rich creamy curry with paneer',
            ratings: { aggregatedRating: { rating: 4.5 } },
            isBestseller: true,
          },
        },
      },
      {
        card: {
          info: {
            name: 'Chicken Tikka',
            imageId: null,
            itemAttribute: { vegClassifier: 'NON_VEG' },
            defaultPrice: 30000, // in paise
            description: 'Grilled chicken with spices',
            ratings: { aggregatedRating: { rating: 4.2 } },
          },
        },
      },
    ],
  };

  test('renders category title and items correctly', () => {
    render(<RestaurantCategory data={mockData} />);
    expect(screen.getByText('Main Course')).toBeInTheDocument();

    expect(screen.getByText('Paneer Butter Masala')).toBeInTheDocument();
    expect(screen.getByText('🟢 VEG')).toBeInTheDocument();
    expect(screen.getByText('★ Bestseller')).toBeInTheDocument();
    expect(screen.getByText('Rich creamy curry with paneer')).toBeInTheDocument();
    expect(screen.getByText('Price: ₹250')).toBeInTheDocument();
    expect(screen.getByText('Rating: ⭐ 4.5')).toBeInTheDocument();

    expect(screen.getByText('Chicken Tikka')).toBeInTheDocument();
    expect(screen.getByText('🔴 NON-VEG')).toBeInTheDocument();
    expect(screen.getByText('Grilled chicken with spices')).toBeInTheDocument();
    expect(screen.getByText('Price: ₹300')).toBeInTheDocument();
    expect(screen.getByText('Rating: ⭐ 4.2')).toBeInTheDocument();

    // Check image src for first item
    const paneerImg = screen.getByAltText('Paneer Butter Masala');
    expect(paneerImg).toHaveAttribute('src', 'https://media-assets.swiggy.com/swiggy/image/upload/some_image_id');

    // Check placeholder image for second item
    const chickenImg = screen.getByAltText('Chicken Tikka');
    expect(chickenImg).toHaveAttribute('src', 'https://via.placeholder.com/150');
  });

  test('handles missing data gracefully', () => {
    const incompleteData = {
      title: 'Snacks',
      itemCards: [
        {
          card: {
            info: {
              name: 'Samosa',
              itemAttribute: { vegClassifier: 'VEG' },
              price: 10000, // in paise
            },
          },
        },
      ],
    };

    render(<RestaurantCategory data={incompleteData} />);
    expect(screen.getByText('Snacks')).toBeInTheDocument();
    expect(screen.getByText('Samosa')).toBeInTheDocument();
    expect(screen.getByText('🟢 VEG')).toBeInTheDocument();
    expect(screen.getByText('Price: ₹100')).toBeInTheDocument();

    // No rating or description should not crash
    expect(screen.queryByText(/Rating:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/description/)).not.toBeInTheDocument();

    // Placeholder image should load
    const samosaImg = screen.getByAltText('Samosa');
    expect(samosaImg).toHaveAttribute('src', 'https://via.placeholder.com/150');
  });

  test('renders empty state when no itemCards', () => {
    const emptyData = { title: 'Desserts', itemCards: [] };
    render(<RestaurantCategory data={emptyData} />);
    expect(screen.getByText('Desserts')).toBeInTheDocument();
    expect(screen.queryByText(/Price:/)).not.toBeInTheDocument(); // No items
  });
});