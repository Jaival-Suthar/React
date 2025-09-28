// Tested
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import Contact from "../Contact";
import "@testing-library/jest-dom";

jest.useFakeTimers();

describe("Contact Component", () => {
  beforeEach(() => {
    window.alert = jest.fn();
  });

  it("renders all required fields and submit button", () => {
    render(<Contact />);

    expect(screen.getByRole("heading", { name: /contact us/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your full name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter 10-digit mobile number/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your complete address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/tell us more about your inquiry/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument();
  });

  it("shows validation errors for invalid inputs (basic)", async () => {
    render(<Contact />);

    fireEvent.change(screen.getByPlaceholderText(/enter your full name/i), { target: { value: "1" } });
    fireEvent.change(screen.getByPlaceholderText(/enter your email address/i), { target: { value: "bad@" } });
    fireEvent.change(screen.getByPlaceholderText(/enter 10-digit mobile number/i), { target: { value: "123" } });
    fireEvent.change(screen.getByPlaceholderText(/enter your complete address/i), { target: { value: "short" } });

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/name should contain only letters/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    expect(screen.getByText(/enter a valid 10-digit indian mobile number/i)).toBeInTheDocument();
    expect(screen.getByText(/address should be at least 10 characters/i)).toBeInTheDocument();
  });

  // ---------- NEW EDGE-CASE TESTS ----------

  it("shows 'required' errors when inputs contain only whitespace", async () => {
    render(<Contact />);

    fireEvent.change(screen.getByPlaceholderText(/enter your full name/i), { target: { value: "   " } });
    fireEvent.change(screen.getByPlaceholderText(/enter your email address/i), { target: { value: "   " } });
    fireEvent.change(screen.getByPlaceholderText(/enter 10-digit mobile number/i), { target: { value: "   " } });
    fireEvent.change(screen.getByPlaceholderText(/enter your complete address/i), { target: { value: "   " } });

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/mobile number is required/i)).toBeInTheDocument();
    expect(screen.getByText(/address is required/i)).toBeInTheDocument();
  });

  it("rejects too-short, too-long and hyphenated names", async () => {
    render(<Contact />);

    // Provide valid values for other required fields so only name validation triggers
    fireEvent.change(screen.getByPlaceholderText(/enter your email address/i), {
      target: { value: "valid@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter 10-digit mobile number/i), {
      target: { value: "7894561230" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your complete address/i), {
      target: { value: "1234567890" }, // exactly 10 chars to satisfy address check
    });

    const nameInput = screen.getByPlaceholderText(/enter your full name/i);

    // too-short
    fireEvent.change(nameInput, { target: { value: "A" } });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    expect(await screen.findByText(/name should contain only letters and spaces/i)).toBeInTheDocument();

    // too-long (31 chars)
    fireEvent.change(nameInput, { target: { value: "A".repeat(31) } });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    expect(await screen.findByText(/name should contain only letters and spaces/i)).toBeInTheDocument();

    // hyphenated name (not allowed by regex)
    fireEvent.change(nameInput, { target: { value: "Mary-Jane" } });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    expect(await screen.findByText(/name should contain only letters and spaces/i)).toBeInTheDocument();
  });

  it("rejects several invalid email formats", async () => {
    render(<Contact />);

    // fill other required fields validly
    fireEvent.change(screen.getByPlaceholderText(/enter your full name/i), {
      target: { value: "Valid Name" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter 10-digit mobile number/i), {
      target: { value: "7894561230" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your complete address/i), {
      target: { value: "1234567890" },
    });

    const emailInput = screen.getByPlaceholderText(/enter your email address/i);

    const invalidEmails = ["user@domain", "user@@domain.com", "user@domain.c"];

    for (const bad of invalidEmails) {
      fireEvent.change(emailInput, { target: { value: bad } });
      fireEvent.click(screen.getByRole("button", { name: /send message/i }));
      expect(await screen.findByText(/please enter a valid email address/i)).toBeInTheDocument();
    }
  });

  it("rejects invalid mobile formats (wrong starting digit, letters)", async () => {
    render(<Contact />);

    // fill other required fields validly
    fireEvent.change(screen.getByPlaceholderText(/enter your full name/i), {
      target: { value: "Valid Name" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your email address/i), {
      target: { value: "valid@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your complete address/i), {
      target: { value: "1234567890" },
    });

    const mobileInput = screen.getByPlaceholderText(/enter 10-digit mobile number/i);

    // starts with 5 (invalid in regex)
    fireEvent.change(mobileInput, { target: { value: "5123456789" } });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    expect(await screen.findByText(/enter a valid 10-digit indian mobile number/i)).toBeInTheDocument();

    // contains letters
    fireEvent.change(mobileInput, { target: { value: "78a4567890" } });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    expect(await screen.findByText(/enter a valid 10-digit indian mobile number/i)).toBeInTheDocument();
  });

  it("rejects address shorter than 10 chars", async () => {
    render(<Contact />);

    // valid other fields
    fireEvent.change(screen.getByPlaceholderText(/enter your full name/i), {
      target: { value: "Valid Name" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your email address/i), {
      target: { value: "valid@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter 10-digit mobile number/i), {
      target: { value: "7894561230" },
    });

    // 9-char address
    fireEvent.change(screen.getByPlaceholderText(/enter your complete address/i), {
      target: { value: "123456789" },
    });

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    expect(await screen.findByText(/address should be at least 10 characters long/i)).toBeInTheDocument();
  });

  it("submits successfully for valid inputs (keeps async timing)", async () => {
    render(<Contact />);

    fireEvent.change(screen.getByPlaceholderText(/enter your full name/i), {
      target: { value: "Jaival Suthar" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your email address/i), {
      target: { value: "jaival@food.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter 10-digit mobile number/i), {
      target: { value: "7894561230" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your complete address/i), {
      target: { value: "Main Street, Surat" },
    });
    fireEvent.change(screen.getByPlaceholderText(/tell us more about your inquiry/i), {
      target: { value: "Order feedback" },
    });

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    // advance timers to let the fake async timeout run
    await act(async () => {
      jest.advanceTimersByTime(1600);
    });

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(expect.stringContaining("✅ Form submitted successfully"));
    });

    expect(screen.getByPlaceholderText(/enter your full name/i)).toHaveValue("");
  });
});
