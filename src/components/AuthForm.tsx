import { z } from "zod";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../query/useAuthMutation";
import { logindata, registerData } from "../types/auth.types";

interface AuthFormProps {
  mode: "register" | "login";
}

const FormSchema = {
  register: z.object({
    id: z.string().min(4, "아이디는 4자 이상이어야 합니다."),
    password: z.string().min(6, "비밀번호는 6자 이상이어야 합니다."),
    nickname: z.string().min(2, "닉네임은 2자 이상이어야 합니다."),
  }),
  login: z.object({
    id: z.string().min(4, "아이디는 4자 이상이어야 합니다."),
    password: z.string().min(6, "비밀번호는 6자 이상이어야 합니다."),
  }),
};

const AuthForm = ({ mode }: AuthFormProps) => {
  const schema = FormSchema[mode];

  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues:
      mode === "register"
        ? {
            id: "",
            password: "",
            nickname: "",
          }
        : { id: "", password: "" },
  });

  const { mutate: register } = useRegisterMutation();
  const { mutate: login } = useLoginMutation();

  const onSubmit = (formData: z.infer<typeof schema>) => {
    console.log("formData", formData);
    if (mode === "register") {
      register(formData as registerData);
    } else {
      login(formData as logindata);
    }
  };

  return (
    <main className="max-w-[1200px] mx-auto mt-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col max-w-[640px] mx-auto gap-4"
      >
        <h2 className="font-bold text-xl">
          {mode === "register" ? "회원가입" : "로그인"}
        </h2>

        <label htmlFor="id">아이디</label>
        <input
          type="text"
          id="id"
          {...registerForm("id")}
          className="h-10 rounded-md border border-gray-300 p-2"
        />
        {errors.id && <p>{errors.id.message}</p>}

        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          {...registerForm("password")}
          className="h-10 rounded-md border border-gray-300 p-2"
        />
        {errors.password && <p>{errors.password.message}</p>}

        {mode === "register" && (
          <>
            <label htmlFor="nickname">닉네임</label>
            <input
              type="text"
              id="nickname"
              {...registerForm("nickname")}
              className="h-10 rounded-md border border-gray-300 p-2"
            />
            <p>{(errors as FieldErrors<registerData>).nickname?.message}</p>
          </>
        )}
        <button
          type="submit"
          className="flex justify-center items-center rounded-md h-10 bg-gray-500 hover:bg-opacity-50"
        >
          {mode === "register" ? "회원가입" : "로그인"}
        </button>
      </form>
    </main>
  );
};

export default AuthForm;
