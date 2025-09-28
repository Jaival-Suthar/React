// 100% code coverage for User component
import { render, screen, waitFor } from "@testing-library/react";
import User from "../User";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          name: "Jaival Suthar",
          location: "Surat",
          avatar_url: "https://avatars.githubusercontent.com/u/123456?v=4",
          bio: "Software Engineer",
        }),
    })
  );
});

describe("User Component", () => {
  test("renders default user info initially", () => {
    render(<User />);
    expect(screen.getByText(/Name: Dummy/i)).toBeInTheDocument();
    expect(screen.getByText(/Location: Default/i)).toBeInTheDocument();
    expect(screen.getByText(/Bio: N\/A/i)).toBeInTheDocument();
  });

  test("fetches and renders updated user info", async () => {
    render(<User />);
    await waitFor(() => {
      expect(screen.getByText(/Name: Jaival Suthar/i)).toBeInTheDocument();
      expect(screen.getByText(/Location: Surat/i)).toBeInTheDocument();
      expect(screen.getByText(/Bio: Software Engineer/i)).toBeInTheDocument();
      const avatar = screen.getByRole("img");
      expect(avatar).toHaveAttribute("src", "https://avatars.githubusercontent.com/u/123456?v=4");
    });
  });
});
