"use client";
import { Button } from "@/components/ui/button";
import FooterLink from "@/components/ui/forms/FooterLink";
import InputField from "@/components/ui/forms/inputField";
import { signUpWithEmail } from "@/lib/actions/auth.actions";
import { router } from "better-auth/api";
import { Sign } from "crypto";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const SignUpPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFromData>({
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
    mode: "onBlur",
  });

  const password = watch("password");
  const onSubmit = async (data: SignUpFromData) => {
    try {
      const result = await signUpWithEmail(data);
      if(result.success){
        router.push("/dashboard");
      } else {
        toast.error(`${result.message || "Please try again later."}`,{
          
          style: { fontWeight: "bold", fontSize: "1rem" }
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Sign up failed.",{
        description:error instanceof Error ? error.message : "Please try again later."  
      });
    }
  };
  return (
    <main className="flex flex-col w-7.5rem justify-center items-center">
      <div className="text-black text-[5.5rem] font-semibold pb-5">Safeshelf</div>
      <h1 className="font-normal text-[1rem] text-[#7F6C6C] pb-2">
        Create your account
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full" >
        <InputField 
       
        name="username"
        label="Full Name"
        placeholder="Enter your full name"
        register={register}
        errors={errors.username}
        validation={{ required: 'Full name is required',minLength:2  }}
        />
        <InputField 
       
        name="email"
        label="Email"
        placeholder="Enter your email"
        register={register}
        errors={errors.email}
        validation={{ required: 'Email is required',type:'email'  }}
        />
        <InputField 
       
        name="password"
        label="Password"
        placeholder="Enter your password"
        type="password"
        register={register}
        errors={errors.password}
        validation={{ required: 'Password is required',minLength:8  }}
        />
        <InputField 
       
        name="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm your password"
        type="password"
        register={register}
        errors={errors.confirmPassword}
        validation={{ 
          required: 'Please confirm your password',
          validate: (value:String) => value === password || 'Passwords do not match'
        }}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Creating Account..." : "Sign Up"}
        </Button>
        <FooterLink text="Already have an account?" Linktext="Sign In" href="/sign-in"/>
      </form>
    </main>
  );
};

export default SignUpPage;
