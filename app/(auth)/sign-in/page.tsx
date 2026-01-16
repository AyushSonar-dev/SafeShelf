"use client";
import { Button } from "@/components/ui/button";
import FooterLink from "@/components/ui/forms/FooterLink";
import InputField from "@/components/ui/forms/inputField";
import { signInWithEmail } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SignInPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string; password: string; }>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: { email: string; password: string; }) => {
     try {
       const result = await signInWithEmail(data);
       if(result.success){
         router.push("/dashboard");
       } else {
         toast.error(`${result.message || "Please try again later."}`,{
          
           style: { fontWeight: "bold", fontSize: "1rem" }
         });
       }
     } catch (error) {
       console.log(error);
       toast.error("Sign In failed.",{
         description:error instanceof Error ? error.message : "Please try again later."  
       });
     }
  };
  return (
    <main className="flex flex-col w-7.5rem justify-center items-center">
      <div className="text-black text-[5.5rem] font-semibold pb-5">Safeshelf</div>
      <h1 className="font-normal text-[1rem] text-[#7F6C6C] pb-2">
        Sign In to your account
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
        <InputField 
          name="email"
          label="Email"
          placeholder="Enter your email"
          register={register}
          errors={errors.email}
          validation={{ required: 'Email is required', type: 'email' }}
        />
        <InputField 
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          register={register}
          errors={errors.password}
          validation={{ required: 'Password is required', minLength: 8 }}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Signing In..." : "Sign In"}
        </Button>
      </form>
      <FooterLink text="Don't have an account?" Linktext="Sign Up" href="/sign-up"/>
    </main>
  );
};

export default SignInPage;