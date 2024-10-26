"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 caracters.",
  }),
  email: z.string(),
  tel: z.string().min(8, {
    message: "tel must be at least 8 caracters.",
  }),
  entreprise: z.string(),
  employe: z.string(),
  message: z.string(),
});

export default function ContactForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      tel: "",
      entreprise: "",
      employe: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      description: "Your message have been sent",
    });
    // console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Full name" {...field} />
              </FormControl>
              <FormMessage className="text-foreground" />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email address" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tel"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Phone number" {...field} />
                </FormControl>
                <FormMessage className="text-foreground" />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-3 col-start-1">
            <FormField
              control={form.control}
              name="entreprise"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enterprise name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="employe"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Number of employes" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Type something here..."
                  {...field}
                  rows={5}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mx-auto block text-center text-primary-foreground"
        >
          Send Message
        </Button>
      </form>
    </Form>
  );
}
