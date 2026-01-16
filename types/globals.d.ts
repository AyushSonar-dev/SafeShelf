declare global {
  interface SignUpFromData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  interface SignInFromData {
    email: string;
    password: string;
  }
  type FormInputProps = {
    name: string;
    label: string;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
    value?: string;
    register: any;
    errors?: any;
    validation?: any;
  };
  type FooterPropTypes = {
    text: string;
    Linktext: string;
    href: string;
  };
  type WelcomeEmailData = {
    email: string;
    name: string;
    intro: string;
  };
  type WarrantyExpiryEmailData = {
    email: string;
    name: string;
    productName: string;
    expiryDate: string;
    expiryContent: string;
  };
}

export {};
