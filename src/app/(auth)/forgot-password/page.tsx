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

const ForgotPassword = () => {
  return (
    <section>
      <div className="bg-white/50 -z-50 absolute inset-0" />
      <Header transparentBg={false} />
      <AppContainer className="pb-20">
        <Spacer />
        <div className="max-w-3xl mx-auto">
          <ForgotPasswordForm />
        </div>
        <Spacer large />
      </AppContainer>
    </section>
  );
};

export default ForgotPassword;

function ForgotPasswordForm() {
  return (
    <Card className="mx-auto max-w-md shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Mot de passe oublié</CardTitle>
        <CardDescription>
          Veuillez renseigner les informations du formulaire ci-dessous pour vérifier et modifier votre mot de passe.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Adresse e-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="Saisissez votre adresse e-mail"
              required
            />
          </div>
          <Button type="submit" className="w-full rounded-full">
            Valider
          </Button>
          <TypographyP className="text-sm my-1">
            Je me souviens de mon mot de passe,&nbsp;
            <Link
              href="/sign-in"
              className="ml-auto inline-block text-sm underline text-primary"
            >
              Me connecter
            </Link>
          </TypographyP>
        </div>
      </CardContent>
    </Card>
  );
}
