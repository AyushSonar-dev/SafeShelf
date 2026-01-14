"use client";
import { Button } from "@/components/ui/button";
import FooterLink from "@/components/ui/forms/FooterLink";
import InputField from "@/components/ui/forms/inputField";
import { useForm, SubmitHandler } from "react-hook-form";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFromData>({
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
    mode: "onBlur",
  });
  const onSubmit = async (data: SignUpFromData) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
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
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Creating Account..." : "Sign Up"}
        </Button>
        <FooterLink text="Already have an account?" Linktext="Sign In" href="/sign-in"/>
      </form>
    </main>
  );
};

export default SignUpPage;
