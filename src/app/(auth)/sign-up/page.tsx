import { TypographyP } from "@/components/ui/typographies";
import { AppContainer, Header, Spacer } from "@src/components/global";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

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

function SignUpForm() {
  return (
    <Card className="mx-auto max-w-md shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>
          Please fill out the form below to log in to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Saisissez votre adresse e-mail"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Saisissez votre mot de passe"
              required
            />
          </div>
          <Button type="submit" className="w-full rounded-full">
            S&apos;inscrire
          </Button>
          <TypographyP className="text-sm my-1 text-center">
            Already have an account ? &nbsp; Please, &nbsp;
            <Link
              href="/sign-in"
              className="ml-auto inline-block text-sm underline text-primary"
            >
              Login.
            </Link>
          </TypographyP>
          <Separator className="my-6" />
          <Button
            variant="ghost"
            className="w-full shadow-md rounded-full border"
          >
            <Image
              src={"/icons/flat-color-icons_google.svg"}
              alt="google flat icon"
              height={25}
              width={25}
              className="mr-2"
            />
            Sign in with Google
          </Button>
        </div>
        <TypographyP className="text-xs my-4 text-center">
          By continouis, you accept our 
          <Link href="#" className="underline text-primary">
            privacy policy
          </Link>
           and{" "}
          <Link href="#" className="underline text-primary">
            terms and conditions
          </Link>
          .
        </TypographyP>
      </CardContent>
    </Card>
  );
}
