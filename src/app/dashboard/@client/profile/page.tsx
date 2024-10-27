"use client";
import PasswordInfos from "@src/components/dashboard/client/profile/password-infos";
import PersonalInfos from "@src/components/dashboard/client/profile/personal-infos";
import { UserProfile } from "@src/components/dashboard/client/profile/user-profile";
import { TitleSection } from "@src/components/dashboard/title-section";
import { useAuthContext } from "@src/components/providers/auth.provider";

export default function Page() {
  const { auth } = useAuthContext();
  const user = auth.user;
  return (
    <div className="scroll-m-20 tracking-tight space-y-6">
      <TitleSection title="Mon profil" />
      <UserProfile />
      <PersonalInfos />
      <PasswordInfos />
    </div>
  );
}
