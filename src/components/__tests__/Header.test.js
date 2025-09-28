// 100% code coverage for Header component
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../Header";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';
jest.mock('../../../utils/useOnlineStatus', () => jest.fn());
import useOnlineStatus from '../../../utils/useOnlineStatus';


it("Should Load Header Component with a Login Button", () => {
    render(
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Header />
        </BrowserRouter>
    );
    const loginButton = screen.getByRole("button", { name: "Login" });
    expect(loginButton).toBeInTheDocument();
});

it("Should Load Header Component with a Cart Item", () => {
    render(
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Header />
        </BrowserRouter>
    );
    const cartButton = screen.getByRole("button" , { name: /cart/i });
    expect(cartButton).toBeInTheDocument();
});

it("Should change Login Button to Logout on Click", () => {
    render(
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Header />
        </BrowserRouter>
    );
    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.click(loginButton);
    const logoutButton = screen.getByRole("button", { name: "Logout" });
    expect(logoutButton).toBeInTheDocument();
});

it("Should render logo image", () => {
  render(
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Header />
    </BrowserRouter>
  );
  const logo = screen.getByAltText("logo");
  expect(logo).toBeInTheDocument();
});

it("Should show correct online/offline status", () => {
  render(
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Header />
    </BrowserRouter>
  );
  // This will find either the "Online" or "Offline" string.
  const status = screen.getByText(/online|offline/i);
  expect(status).toBeInTheDocument();
});

it("Should have all nav items", () => {
  render(
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Header />
    </BrowserRouter>
  );
  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("About Us")).toBeInTheDocument();
  expect(screen.getByText("Contact Us")).toBeInTheDocument();
  expect(screen.getByText("Grocery")).toBeInTheDocument();
});

it("Should show Cart button", () => {
  render(
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Header />
    </BrowserRouter>
  );
  expect(screen.getByLabelText("Cart")).toBeInTheDocument();
});





describe('Header online/offline state', () => {
  it('shows Online when online', () => {
    useOnlineStatus.mockReturnValue(true);
    render(<BrowserRouter><Header /></BrowserRouter>);
    expect(screen.getByText(/online/i)).toBeInTheDocument();
  });

  it('shows Offline when offline', () => {
    useOnlineStatus.mockReturnValue(false);
    render(<BrowserRouter><Header /></BrowserRouter>);
    expect(screen.getByText(/offline/i)).toBeInTheDocument();
  });
});

