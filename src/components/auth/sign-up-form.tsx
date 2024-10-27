"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { TypographyP } from "@/components/ui/typographies";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpAction } from "@src/actions/auth.actions";
import {
  SignUpSchema,
  signUpSchema,
} from "@src/helpers/form-schemas/sign-up-schema";
import { Role } from "@src/helpers/models/user.model";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";

export const SignUpForm = () => {
  const router = useRouter();

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const { execute, isPending } = useServerAction(signUpAction, {
    onSuccess() {
      router.push("/sign-in");
    },
    onError(error) {
      toast.error(error.err.message, {
        duration: 6000,
        important: true,
      });
    },
  });

  const submit = (data: SignUpSchema) => {
    execute(data);
  };

  return (
    <Card className="mx-auto max-w-md shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>
          Please fill out the form below to log in to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="grid gap-4">
            <FormField
              name="role"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="role">Role</FormLabel>
                  <FormControl>
                    <select id="role" {...field} className="w-full border">
                      <option value={Role.ADMIN}>Admin</option>
                      <option value={Role.ARTISAN}>Artisan</option>
                      <option value={Role.CLIENT}>Client</option>
                    </select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="firstName"
              control={form.control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="firstname">First name</FormLabel>
                  <FormControl>
                    <Input
                      id="firstname"
                      type="text"
                      placeholder="Enter your first name."
                      {...field}
                      className={cn({
                        "border-destructive": form.formState.errors.firstName,
                      })}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="lastName"
              control={form.control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="lastname">Last name</FormLabel>
                  <FormControl>
                    <Input
                      id="lastname"
                      type="text"
                      placeholder="Enter your Last name."
                      {...field}
                      className={cn({
                        "border-destructive": form.formState.errors.lastName,
                      })}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email."
                      {...field}
                      className={cn({
                        "border-destructive": form.formState.errors.email,
                      })}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="phone"
              control={form.control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="phone">Phone number</FormLabel>
                  <FormControl>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number."
                      {...field}
                      className={cn({
                        "border-destructive": form.formState.errors.phone,
                      })}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="address"
              control={form.control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Address</FormLabel>
                  <FormControl>
                    <Input
                      id="address"
                      type="text"
                      placeholder="Enter your address."
                      {...field}
                      className={cn({
                        "border-destructive": form.formState.errors.address,
                      })}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type="text"
                      placeholder="Enter your password."
                      {...field}
                      className={cn({
                        "border-destructive": form.formState.errors.password,
                      })}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              disabled={isPending}
              type="submit"
              className="w-full rounded-full"
            >
              {isPending && <Loader className="size-4 mr-2 animate-spin" />}
              <span>Register</span>
            </Button>

            <TypographyP className="text-sm my-1">
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
              type="button"
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
          </form>
        </Form>
        <TypographyP className="text-xs my-4 text-center">
          By continuing, you agree to our &nbsp;
          <Link href="#" className="underline text-primary">
            privacy policy
          </Link>
          &nbsp; and&nbsp;
          <Link href="#" className="underline text-primary">
            terms of use
          </Link>
          .
        </TypographyP>
      </CardContent>
    </Card>
  );
};
