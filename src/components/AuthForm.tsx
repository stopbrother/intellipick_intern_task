import { z } from "zod";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../query/useAuthMutation";
import { registerData } from "../types/auth.types";

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
      login(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>{mode === "register" ? "회원가입" : "로그인"}</h2>

      <label>아이디</label>
      <input type="text" {...registerForm("id")} />
      {errors.id && <p>{errors.id.message}</p>}

      <label>비밀번호</label>
      <input type="password" {...registerForm("password")} />
      {errors.password && <p>{errors.password.message}</p>}

      {mode === "register" && (
        <>
          <label>닉네임</label>
          <input type="text" {...registerForm("nickname")} />
          <p>{(errors as FieldErrors<registerData>).nickname?.message}</p>
        </>
      )}
      <button type="submit">
        {mode === "register" ? "회원가입" : "로그인"}
      </button>
    </form>
  );
};

export default AuthForm;
