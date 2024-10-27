// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";
// import { TypographyP } from "@/components/ui/typographies";
// import { cn } from "@/lib/utils";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { signInAction } from "@src/actions/auth.actions";
// import {
//   SignInSchema,
//   signInSchema,
// } from "@src/helpers/form-schemas/sign-in-schema";
// import { Loader } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { useServerAction } from "zsa-react";

// export const SignInForm = () => {
//   const router = useRouter();

//   const form = useForm<SignInSchema>({
//     resolver: zodResolver(signInSchema),
//   });

//   const { execute, isPending } = useServerAction(signInAction, {
//     onSuccess() {
      
//       router.push("/dashboard");
//     },
//     onError(error) {
//       toast.error(error.err.message, {
//         duration: 6000,
//         important: true,
//       });
//     },
//   });

//   const submit = (data: SignInSchema) => {
//     execute(data);
//   };

//   return (
//     <Card className="mx-auto max-w-md shadow-xl">
//       <CardHeader className="text-center">
//         <CardTitle className="text-2xl">Log In</CardTitle>
//         <CardDescription>
//           Please fill in the information below to access your account.
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(submit)} className="grid gap-4">
//             <div className="grid gap-2">
//               <FormField
//                 name="email"
//                 control={form.control}
//                 rules={{ required: true }}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel htmlFor="email">Email address</FormLabel>
//                     <FormControl>
//                       <Input
//                         id="email"
//                         type="email"
//                         placeholder="Enter your email."
//                         {...field}
//                         className={cn({
//                           "border-destructive": form.formState.errors.email,
//                         })}
//                       />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//             </div>
//             <div className="grid gap-2">
//               <FormField
//                 name="password"
//                 control={form.control}
//                 rules={{ required: true }}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel htmlFor="password">Password</FormLabel>
//                     <FormControl>
//                       <Input
//                         id="password"
//                         type="password"
//                         placeholder="Enter your password."
//                         {...field}
//                         className={cn({
//                           "border-destructive": form.formState.errors.password,
//                         })}
//                       />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//             </div>
//             <Link
//               href="/forgot-password"
//               className="mr-auto my-2 inline-block text-sm underline"
//             >
//               Forgot your password?
//             </Link>

//             <Button
//               disabled={isPending}
//               type="submit"
//               className="w-full rounded-full"
//             >
//               {isPending && <Loader className="size-4 mr-2 animate-spin" />}
//               <span>Log In</span>
//             </Button>

//             <TypographyP className="text-sm my-1">
//               Don&apos;t have an account? &nbsp;
//               <Link
//                 href="/sign-up"
//                 className="ml-auto inline-block text-sm underline text-primary"
//               >
//                 Create an account
//               </Link>
//             </TypographyP>
//             <Separator className="my-6" />
//             <Button
//               type="button"
//               variant="ghost"
//               className="w-full shadow-md rounded-full border"
//             >
//               <Image
//                 src={"/icons/flat-color-icons_google.svg"}
//                 alt="google flat icon"
//                 height={25}
//                 width={25}
//                 className="mr-2"
//               />
//               Sign in with Google
//             </Button>
//           </form>
//         </Form>
//         <TypographyP className="text-xs my-4 text-center">
//           By continuing, you agree to our &nbsp;
//           <Link href="#" className="underline text-primary">
//             privacy policy
//           </Link>
//           &nbsp; and&nbsp;
//           <Link href="#" className="underline text-primary">
//             terms of use
//           </Link>
//           .
//         </TypographyP>
//       </CardContent>
//     </Card>
//   );
// };



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
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { SignInSchema } from "@src/helpers/form-schemas/sign-in-schema";

export const SignInForm = () => {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const submit = (data:SignInSchema) => {
    // Redirection vers le tableau de bord après soumission
    router.push("/dashboard");
  };

  return (
    <Card className="mx-auto max-w-md shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Log In</CardTitle>
        <CardDescription>
          Please fill in the information below to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="grid gap-4">
            <div className="grid gap-2">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email address</FormLabel>
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
            </div>
            <div className="grid gap-2">
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
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
            </div>
            <Link
              href="/forgot-password"
              className="mr-auto my-2 inline-block text-sm underline"
            >
              Forgot your password?
            </Link>

            <Button type="submit" className="w-full rounded-full">
              <span>Log In</span>
            </Button>

            <TypographyP className="text-sm my-1">
              Don&apos;t have an account? &nbsp;
              <Link
                href="/sign-up"
                className="ml-auto inline-block text-sm underline text-primary"
              >
                Create an account
              </Link>
            </TypographyP>
            <Separator className="my-6" />
            <Button
              type="button"
              variant="ghost"
              className="w-full shadow-md rounded-full border"
            >
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
