import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useState } from "react";
import { makeApiRequest } from "@/utils/apiUtils";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ApiResponse } from "@/models/typeDefinitions";

type signUpProps = {
  handleSignUp: (val: boolean) => void;
};

const SignUp: React.FC<signUpProps> = ({ handleSignUp }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const FormSchema = z.object({
    fullName: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);

    // Specify the response type as ApiResponse
    const response: ApiResponse = await makeApiRequest(
      "/user/register",
      "POST",
      data
    );
    console.log(response);

    if (response?.ok) {
      const token = response.value?.data?.token;
      if (token) {
        localStorage.setItem("jwt_token", token);
      }

      toast({
        title: "success",
        description: response.value?.message,
      });
      navigate("/places");
    } else {
      toast({
        variant: "destructive",
        title: "Fail",
        description: response.value?.message,
      });
    }

    setIsSubmitting(false);
  }

  return (
    <>
      <h1 className="text-center text-lg font-semibold text-white tracking-wider underline">
        Registration
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-1 flex flex-col"
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="fullName"
                  className="text-white tracking-wider"
                >
                  Full name
                </FormLabel>
                <FormControl>
                  <Input
                    id="fullName"
                    placeholder="full name"
                    {...field}
                    className="w-full text-white "
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
                <FormLabel
                  htmlFor="email"
                  className="text-white tracking-wider"
                >
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    placeholder="email"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="password"
                  className="text-white tracking-wider"
                >
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    id="password"
                    placeholder="password"
                    {...field}
                    type="password"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="!my-6 self-center px-12 bg-background-start border border-2 border-white rounded-full hover:bg-white hover:text-[#4dd1d6] tracking-wider"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </form>
      </Form>
      <hr />

      <p className="text-sm text-left">
        Already have an account?{" "}
        <button
          className="text-base font-semibold"
          onClick={() => {
            handleSignUp(false);
          }}
        >
          Log in
        </button>
      </p>
    </>
  );
};

export default SignUp;
