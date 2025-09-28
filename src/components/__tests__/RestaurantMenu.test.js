//Tested
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, useParams } from 'react-router-dom';
import RestaurantMenu from '../RestaurantMenu';
import { ProgressSpinner } from 'primereact/progressspinner';

// Mock useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      data: {
        cards: [
          {},
          {},
          { card: { card: { info: { name: 'Khichdi Etc', cuisines: ['Gujarati'], costForTwoMessage: '₹300 for two' } } } },
          {},
          {
            groupedCard: {
              cardGroupMap: {
                REGULAR: {
                  cards: [
                    {
                      card: { card: { '@type': 'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory', title: 'Combo' } },
                    },
                  ],
                },
              },
            },
          },
        ],
      },
    }),
  })
);

// Mock setTimeout
jest.useFakeTimers();

describe('RestaurantMenu', () => {
  beforeEach(() => {
    useParams.mockReturnValue({ resId: '12345' });
    fetch.mockClear();
    jest.clearAllMocks();
  });

  test('renders loading spinner initially', () => {
    render(
      <MemoryRouter>
        <RestaurantMenu />
      </MemoryRouter>
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('fetches and renders restaurant menu successfully', async () => {
    render(
      <MemoryRouter>
        <RestaurantMenu />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    }, { timeout: 3000 });

    jest.advanceTimersByTime(2000); // Simulate 2-second delay
    await waitFor(() => {
      expect(screen.getByText('Khichdi Etc')).toBeInTheDocument();
      expect(screen.getByText('Gujarati - ₹300 for two')).toBeInTheDocument();
      expect(screen.getByText('Menu')).toBeInTheDocument();
      expect(screen.getByText('Combo')).toBeInTheDocument();
    }, { timeout: 3000 });

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('12345'));
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('handles error state', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({ ok: false, status: 500 })
    );

    render(
      <MemoryRouter>
        <RestaurantMenu />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    }, { timeout: 3000 });

    jest.advanceTimersByTime(2000); // Simulate 2-second delay
    await waitFor(() => {
      expect(screen.getByText('Failed to load restaurant menu. Please try again later.')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  test('renders no data state when resInfo is null after loading', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: { cards: [{}] } }),
      })
    );

    render(
      <MemoryRouter>
        <RestaurantMenu />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    }, { timeout: 3000 });

    jest.advanceTimersByTime(2000); // Simulate 2-second delay
    await waitFor(() => {
      expect(screen.getByText('Restaurant information not available')).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});