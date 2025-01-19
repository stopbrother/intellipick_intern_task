import { useEffect, useState } from "react";
import { useUserProfileQuery } from "../../query/useAuthQuery";
import { useProfileMutation } from "../../query/useAuthMutation";

const UpdateProfile = () => {
  const { data: user } = useUserProfileQuery();
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);

  useEffect(() => {
    if (user) {
      setNickname(user.nickname);
      setAvatar(user.avatar ? new File([], user.avatar) : null);
    }
  }, [user]);

  const { mutate: updateProfile } = useProfileMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nickname.trim()) alert("닉네임을 입력해주세요.");

    updateProfile({ nickname, ...(avatar && { avatar }) });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>프로필 수정</h2>

      <label>닉네임</label>
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />

      <label>프로필 이미지 변경</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setAvatar(e.target.files?.[0] || null)}
      />

      <button>프로필 수정</button>
    </form>
  );
};

export default UpdateProfile;
