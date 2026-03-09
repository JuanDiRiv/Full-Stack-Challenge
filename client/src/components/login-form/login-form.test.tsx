import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { LoginForm } from "@/components/login-form/login-form";
import { loginRequest } from "@/lib/api";

const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: pushMock,
    }),
}));

jest.mock("@/lib/api", () => ({
    loginRequest: jest.fn(),
}));

describe("LoginForm", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("submits valid credentials and redirects", async () => {
        const mockedLoginRequest = jest.mocked(loginRequest);

        mockedLoginRequest.mockResolvedValue({
            success: true,
            message: "Login success",
        });

        render(<LoginForm />);

        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Password");

        fireEvent.change(emailInput, { target: { value: "eve.holt@reqres.in" } });
        fireEvent.change(passwordInput, { target: { value: "secret123" } });

        expect(emailInput).toHaveValue("eve.holt@reqres.in");
        expect(passwordInput).toHaveValue("secret123");

        fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

        await waitFor(() => {
            expect(mockedLoginRequest).toHaveBeenCalledWith({
                email: "eve.holt@reqres.in",
                password: "secret123",
            });
        });

        expect(pushMock).toHaveBeenCalledWith("/");
    });
});
