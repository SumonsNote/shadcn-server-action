"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { sendEmail } from "@/app/actions/email";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  fullName: z.string().min(3, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
});

const SubscriptionForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values) {
    console.log(values);
    try {
      await sendEmail(values);
      toast.success(`${values.fullName} successfully subscribed.`);
    } catch (error) {
      toast.error(error.message);
    }
  }

  const { isSubmitting, isValid } = form.formState;

  return (
    <Form {...form}>
      <form
        className="space-y-4 my-4 flex flex-col items-center"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  className="w-[350px]"
                  placeholder="Enter Name"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  className="w-[350px]"
                  placeholder="Enter Email"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={!isValid || isSubmitting} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default SubscriptionForm;
