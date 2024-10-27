import { AppContainer, Header, Spacer } from "@src/components/global";
import { SignUpForm } from "@src/components/auth/sign-up-form";

const SignUp = () => {
  return (
    <section className=" relative z-0">
      <div className="bg-white/50 -z-50 absolute inset-0" />
      <Header transparentBg={false} />
      <AppContainer className="pb-20">
        <Spacer />
        <div className="max-w-3xl mx-auto">
          <SignUpForm />
        </div>
        <Spacer large />
      </AppContainer>
    </section>
  );
};

export default SignUp;
