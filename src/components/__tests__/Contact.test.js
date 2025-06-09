import { render,screen } from "@testing-library/react";
import Contact from "../Contact";
import "@testing-library/jest-dom";

describe("Contact Component", () => {
it("Should Load Contact Component", () => {

    render(<Contact />);
    const heading = screen.getByRole("heading");
    expect (heading).toBeInTheDocument();
    // const tb = screen.getAllByRole("textbox");
    // expect(tb.length).toBe(3); // name, email, phone
});

it("Should Load Button inside Contact Component", () => {
    render(<Contact />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
});

it("Should Load Input Name inside Contact Component", () => {
    render(<Contact />);
    const inputName = screen.getByPlaceholderText("name");
    expect(inputName).toBeInTheDocument();
});

it("Should load 2 Input Boxes inside Contact Component", () => {
    render(<Contact />);
    const inputBoxes = screen.getAllByRole("textbox");
    expect(inputBoxes.length).toBe(2); // name and message
});
});