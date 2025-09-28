// 100% code coverage for RestaurantCard and withPromotedLabel HOC
import { render, screen } from "@testing-library/react";
import RestaurantCard, { withPromotedLabel } from "../RestaurantCard";

const restaurantMock = {
  name: "Testaurant",
  cuisines: ["Italian", "Mexican"],
  avgRating: 4.5,
  costForTwo: "₹500 for two",
  sla: { deliveryTime: 30 },
  areaName: "Downtown",
  cloudinaryImageId: "abcd1234",
};

const promotedMock = {
  ...restaurantMock,
  promoted: true,
};

describe("RestaurantCard Component", () => {
  test("renders all restaurant info correctly", () => {
    render(<RestaurantCard restaurant={restaurantMock} />);
    
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      expect.stringContaining("abcd1234")
    );
    expect(screen.getByRole("img")).toHaveAttribute(
      "alt",
      "Testaurant logo"
    );

    expect(screen.getByText("Testaurant")).toBeInTheDocument();
    expect(screen.getByText("Italian, Mexican")).toBeInTheDocument();
    expect(screen.getByText("4.5 stars")).toBeInTheDocument();
    expect(screen.getByText("₹500 for two")).toBeInTheDocument();
    expect(screen.getByText("30 minutes")).toBeInTheDocument();
    expect(screen.getByText("Downtown")).toBeInTheDocument();
  });

  test("renders placeholder image if cloudinaryImageId missing", () => {
    render(<RestaurantCard restaurant={{ ...restaurantMock, cloudinaryImageId: null }} />);
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "https://via.placeholder.com/150"
    );
  });

  test("renders fallback text when restaurant prop missing", () => {
    const { container } = render(<RestaurantCard />);
    expect(container.textContent).toMatch(/No restaurant data available/i);
  });
});

describe("withPromotedLabel HOC", () => {
  test("wraps component with promoted label", () => {
    const Wrapped = withPromotedLabel(RestaurantCard);
    render(<Wrapped restaurant={promotedMock} />);
    
    expect(screen.getByText(/promoted/i)).toBeInTheDocument();
    expect(screen.getByText("Testaurant")).toBeInTheDocument();
  });

  test("does not render promoted label if not promoted", () => {
    const Wrapped = withPromotedLabel(RestaurantCard);
    render(<Wrapped restaurant={restaurantMock} />);
    
    // Promoted label should be missing for non-promoted
    expect(screen.queryByText(/promoted/i)).not.toBeInTheDocument();
  });
});

test("renders fallback texts for missing optional properties", () => {
  const incompleteRest = {
    name: "Testaurant",
    cuisines: null,
    avgRating: null,
    costForTwo: null,
    sla: null,
    areaName: null,
  };
  
  render(<RestaurantCard restaurant={incompleteRest} />);
  
  expect(screen.getByText("No cuisines available")).toBeInTheDocument();
  expect(screen.getByText("No rating available")).toBeInTheDocument();
  expect(screen.getByText("Price not available")).toBeInTheDocument();
  expect(screen.getByText("Delivery time unknown")).toBeInTheDocument();
  expect(screen.getByText("Location unknown")).toBeInTheDocument();
});

test("renders Unknown Restaurant if name is missing", () => {
  render(<RestaurantCard restaurant={{ cuisines: ["Chinese"], avgRating: 3.9 }} />);
  expect(screen.getByText("Unknown Restaurant")).toBeInTheDocument();
});

test("renders locality if areaName missing", () => {
  render(<RestaurantCard restaurant={{ name: "LocalTest", locality: "ZoneX" }} />);
  expect(screen.getByText("ZoneX")).toBeInTheDocument();
});

test("renders 'Location unknown' if areaName and locality missing", () => {
  render(<RestaurantCard restaurant={{ name: "NoAreaRest" }} />);
  expect(screen.getByText("Location unknown")).toBeInTheDocument();
});
