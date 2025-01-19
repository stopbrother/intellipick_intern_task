// Imports
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserEvent, { userEvent } from "@testing-library/user-event";

// To Test
import AuthForm from "../components/AuthForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../query/useAuthMutation";

// Tests
jest.mock("../query/useAuthMutation", () => ({
  useRegisterMutation: jest.fn(() => ({
    mutate: jest.fn(),
  })),
  useLoginMutation: jest.fn(() => ({
    mutate: jest.fn(),
  })),
}));

const renderWithQueryClient = (ui: JSX.Element) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("Authform Component", () => {
  it("회원가입 폼 렌더링", () => {
    renderWithQueryClient(<AuthForm mode="register" />);

    expect(
      screen.getByRole("heading", { name: "회원가입" })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("아이디")).toBeInTheDocument();
    expect(screen.getByLabelText("비밀번호")).toBeInTheDocument();
    expect(screen.getByLabelText("닉네임")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "회원가입" })
    ).toBeInTheDocument();
  });

  it("로그인 폼 렌더링", () => {
    renderWithQueryClient(<AuthForm mode="login" />);

    expect(screen.getByRole("heading", { name: "로그인" })).toBeInTheDocument();
    expect(screen.getByLabelText("아이디")).toBeInTheDocument();
    expect(screen.getByLabelText("비밀번호")).toBeInTheDocument();
    expect(screen.queryByLabelText("닉네임")).toBeNull();
    expect(screen.getByRole("button", { name: "로그인" })).toBeInTheDocument();
  });

  it("입력 필드의 값 변경", async () => {
    renderWithQueryClient(<AuthForm mode="register" />);

    const idInput = screen.getByLabelText("아이디") as HTMLInputElement;
    const passwordInput = screen.getByLabelText("비밀번호") as HTMLInputElement;
    const nicknameInput = screen.getByLabelText("닉네임") as HTMLInputElement;

    await userEvent.type(idInput, "testuser");
    await UserEvent.type(passwordInput, "123456");
    await UserEvent.type(nicknameInput, "테스트닉네임");

    expect(idInput.value).toBe("testuser");
    expect(passwordInput.value).toBe("123456");
    expect(nicknameInput.value).toBe("테스트닉네임");
  });

  it("유효성 검사", async () => {
    renderWithQueryClient(<AuthForm mode="register" />);

    fireEvent.click(screen.getByRole("button", { name: "회원가입" }));

    expect(
      await screen.findByText("아이디는 4자 이상이어야 합니다.")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("비밀번호는 6자 이상이어야 합니다.")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("닉네임은 2자 이상이어야 합니다.")
    ).toBeInTheDocument();
  });

  it("회원가입 버튼 클릭시 api 호출", async () => {
    const registerMock = jest.fn();
    (useRegisterMutation as jest.Mock).mockReturnValue({
      mutate: registerMock,
    });

    renderWithQueryClient(<AuthForm mode="register" />);

    await userEvent.type(screen.getByLabelText("아이디"), "testuser");
    await userEvent.type(screen.getByLabelText("비밀번호"), "123456");
    await userEvent.type(screen.getByLabelText("닉네임"), "테스트닉네임");
    fireEvent.click(screen.getByRole("button", { name: "회원가입" }));

    expect(registerMock).toHaveBeenCalledWith({
      id: "testuser",
      password: "123456",
      nickname: "테스트닉네임",
    });
  });

  it("로그인 버튼 클릭시 api 호출", async () => {
    const loginMock = jest.fn();
    (useLoginMutation as jest.Mock).mockReturnValue({ mutate: loginMock });

    renderWithQueryClient(<AuthForm mode="login" />);

    await userEvent.type(screen.getByLabelText("아이디"), "testuser");
    await userEvent.type(screen.getByLabelText("비밀번호"), "123456");
    fireEvent.click(screen.getByRole("button", { name: "로그인" }));

    expect(loginMock).toHaveBeenCalledWith({
      id: "testuser",
      password: "123456",
    });
  });
});
