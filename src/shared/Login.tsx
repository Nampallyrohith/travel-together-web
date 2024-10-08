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
type loginProps = {
  handleSignUp: (val: boolean) => void;
};

const Login: React.FC<loginProps> = ({ handleSignUp }) => {
  const FormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Handle form submission logic
    console.log("Form submitted:", data);
  }
  return (
    <>
      <h1 className="text-center text-lg font-semibold text-white tracking-wider underline">
        Login
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-1 flex flex-col"
        >
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
          >
            Log in
          </Button>
        </form>
      </Form>

      <hr />

      <p className="text-sm text-left">
        Don't have an account?{" "}
        <button
          className="text-base font-semibold"
          onClick={() => {
            handleSignUp(true);
          }}
        >
          Sign up
        </button>
      </p>
    </>
  );
};

export default Login;
