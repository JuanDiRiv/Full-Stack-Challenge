import { render, screen, waitFor } from "@testing-library/react";
import { CreatePostForm } from "@/components/posts/create-post-form/create-post-form";
import { createPost, getSavedUsers } from "@/lib/api";

jest.mock("@/lib/api", () => ({
    getSavedUsers: jest.fn(),
    createPost: jest.fn(),
}));

describe("CreatePostForm", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("shows warning and disables submit when there are no saved users", async () => {
        const mockedGetSavedUsers = jest.mocked(getSavedUsers);
        const mockedCreatePost = jest.mocked(createPost);

        mockedGetSavedUsers.mockResolvedValue({
            success: true,
            message: "Saved users loaded",
            data: [],
        });

        render(<CreatePostForm onCreated={jest.fn()} />);

        await waitFor(() => {
            expect(
                screen.getByText(
                    "No saved users available. Please save a user from the Users section first.",
                ),
            ).toBeInTheDocument();
        });

        const submitButton = screen.getByRole("button", { name: "Create post" });
        expect(submitButton).toBeDisabled();
        expect(mockedCreatePost).not.toHaveBeenCalled();
    });
});
