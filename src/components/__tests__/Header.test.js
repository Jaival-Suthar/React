import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../Header";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';

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
