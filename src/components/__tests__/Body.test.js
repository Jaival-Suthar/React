import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Body from "../Body";
import * as useOnlineStatusHook from "../../../utils/useOnlineStatus";
import { MemoryRouter } from "react-router-dom";

const MOCK_RESTAURANTS = [
  { id: "1", name: "The Good Bowl", avgRating: 4.4, promoted: true },
  { id: "2", name: "Pick Meal", avgRating: 4.4, promoted: false },
  { id: "3", name: "Anjoy Late Night Meals", avgRating: 4.3, promoted: true }
];

// Mock fetch to return mock data
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          data: {
            cards: [
              {}, {}, {},  // skip to simulate structure
              ...MOCK_RESTAURANTS.map(r => ({ card: { card: { info: r } } }))
            ]
          }
        }),
    })
  );
  jest.spyOn(useOnlineStatusHook, "default").mockReturnValue(true);
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("Body Component", () => {
  test("renders shimmer UI initially (no cards, shimmer shown)", () => {
    const { container } = render(
      <MemoryRouter>
        <Body />
      </MemoryRouter>
    );
    expect(container.querySelector(".shimmer-container")).toBeInTheDocument();
  });

  test("renders restaurant cards after fetch", async () => {
    render(
      <MemoryRouter>
        <Body />
      </MemoryRouter>
    );
    await waitFor(() => expect(screen.getByText("The Good Bowl")).toBeInTheDocument());
    expect(screen.getByText("Pick Meal")).toBeInTheDocument();
    expect(screen.getByText("Anjoy Late Night Meals")).toBeInTheDocument();
  });

  test("search filters restaurants, only correct card visible", async () => {
    render(
      <MemoryRouter>
        <Body />
      </MemoryRouter>
    );
    await waitFor(() => expect(screen.getByText("The Good Bowl")).toBeInTheDocument());

    const input = screen.getByPlaceholderText("Search restaurants...");
    fireEvent.change(input, { target: { value: "Pick" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      expect(screen.getByText("Pick Meal")).toBeInTheDocument();
      expect(screen.queryByText("The Good Bowl")).not.toBeInTheDocument();
      expect(screen.queryByText("Anjoy Late Night Meals")).not.toBeInTheDocument();
    });
  });

  test("top-rated filter button shows only top rated", async () => {
    render(
      <MemoryRouter>
        <Body />
      </MemoryRouter>
    );
    await waitFor(() => expect(screen.getByText("The Good Bowl")).toBeInTheDocument());

    const button = screen.getByText("Top Rated Restaurants");
    fireEvent.click(button);

    await waitFor(() => {
      // Only Good Bowl and Pick Meal, both 4.4, but your logic: avgRating > 4.5
      // So test should expect 0 or nothing, unless you insert a 4.6+ rating mock row
      expect(screen.queryByText("The Good Bowl")).not.toBeInTheDocument();
      expect(screen.queryByText("Pick Meal")).not.toBeInTheDocument();
      expect(screen.queryByText("Anjoy Late Night Meals")).not.toBeInTheDocument();
      // or check for "No restaurants found." depending on your UI
    });
  });

  test("shows offline message when offline", () => {
    jest.spyOn(useOnlineStatusHook, "default").mockReturnValue(false);
    render(
      <MemoryRouter>
        <Body />
      </MemoryRouter>
    );
    expect(screen.getByText(/looks like you're offline/i)).toBeInTheDocument();
  });
});
