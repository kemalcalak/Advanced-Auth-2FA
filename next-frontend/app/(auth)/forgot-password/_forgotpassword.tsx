"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Mail, Key, Loader, ArrowRight } from "lucide-react";
import Link from "next/link";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { forgotPasswordMutationFn, verifyResetCodeMutationFn } from "@/lib/api";

export default function ForgotPassword() {
  const [step, setStep] = useState<'email' | 'method' | 'code'>('email');
  const router = useRouter();
  const params = useSearchParams();
  const emailParam = params.get("email");

  const emailFormSchema = z.object({
    email: z.string().trim().email({
      message: "Lütfen geçerli bir email adresi girin",
    }),
  });

  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: emailParam || "",
    },
  });

  const { mutate: emailMutate, isPending: isEmailPending } = useMutation({
    mutationFn: forgotPasswordMutationFn,
  });

  const onEmailSubmit = (values: z.infer<typeof emailFormSchema>) => {
    // Email doğrulaması başarılı, URL'i güncelle ve method seçimine geç
    router.replace(`/forgot-password?email=${values.email}`);
    setStep('method');
  };

  const handleEmailReset = () => {
    const email = emailForm.getValues().email;
    emailMutate({ email }, {
      onSuccess: () => {
        toast({
          title: "Başarılı",
          description: "Şifre sıfırlama talimatları email adresinize gönderildi",
        });
        router.push(`/reset-password?email=${email}`);
      },
      onError: (error) => {
        toast({
          title: "Hata",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  const verifyFormSchema = z.object({
    code1: z.string().length(1),
    code2: z.string().length(1),
    code3: z.string().length(1),
    code4: z.string().length(1),
    code5: z.string().length(1),
    code6: z.string().length(1),
  });

  const verifyForm = useForm<z.infer<typeof verifyFormSchema>>({
    resolver: zodResolver(verifyFormSchema),
    defaultValues: {
      code1: "",
      code2: "",
      code3: "",
      code4: "",
      code5: "",
      code6: "",
    },
  });

  const { mutate: verifyMutate, isPending: isVerifyPending } = useMutation({
    mutationFn: verifyResetCodeMutationFn,
  });

  const onVerifySubmit = (values: z.infer<typeof verifyFormSchema>) => {
    const email = emailForm.getValues().email;
    const code = Object.values(values).join("");
    
    verifyMutate(
      { email, code },
      {
        onSuccess: (response) => {
          if (response.valid) {
            const exp = Date.now() + 3600000; // 1 saat
            router.push(
              `/reset-password?code=${code}&email=${email}&exp=${exp}`
            );
          } else {
            toast({
              title: "Hata",
              description: response.message || "Doğrulama başarısız",
              variant: "destructive",
            });
          }
        },
        onError: (error) => {
          toast({
            title: "Hata",
            description: error.message || "Geçersiz aktivasyon kodu",
            variant: "destructive",
          });
        },
      }
    );
  };

  if (step === 'email') {
    return (
      <main className="w-full min-h-[590px] h-full max-w-full flex items-center justify-center">
        <div className="w-full h-full p-5 rounded-md">
          <Logo />
          <h1 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold mb-1.5 mt-8">
            Forgot Password
          </h1>
          <p className="mb-6 text-[15px] dark:text-[#f1f7feb5] font-normal">
            Enter your email address and we'll send you password reset instructions.
          </p>

          <Form {...emailForm}>
            <form onSubmit={emailForm.handleSubmit(onEmailSubmit)}>
              <div className="mb-6">
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-[#f1f7feb5] text-sm">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col gap-4">
                <Button
                  type="submit"
                  className="w-full text-[15px] h-[40px] text-white font-semibold"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full text-[15px] h-[40px]"
                  onClick={() => router.push('/')}
                >
                  Back to Login
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
    );
  }

  if (step === 'method') {
    return (
      <main className="w-full min-h-[590px] h-full max-w-full flex items-center justify-center">
        <div className="w-full h-full p-5 rounded-md">
          <Logo />
          <h1 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold mb-1.5 mt-8">
            Password Reset Method
          </h1>
          <p className="mb-6 text-[15px] dark:text-[#f1f7feb5] font-normal">
            How would you like to reset your password?
          </p>

          <div className="flex flex-col gap-4">
            <Button
              onClick={handleEmailReset}
              disabled={isEmailPending}
              className="w-full text-[15px] h-[40px]"
            >
              {isEmailPending ? (
                <Loader className="animate-spin mr-2" />
              ) : (
                <Mail className="mr-2 h-4 w-4" />
              )}
              Reset via Email
            </Button>

            <Button
              onClick={() => setStep('code')}
              className="w-full text-[15px] h-[40px]"
            >
              <Key className="mr-2 h-4 w-4" />
              Reset with Activation Code
            </Button>

            <Button
              variant="outline"
              onClick={() => setStep('email')}
              className="w-full text-[15px] h-[40px]"
            >
              Go Back
            </Button>
          </div>
        </div>
      </main>
    );
  }

  if (step === 'code') {
    return (
      <main className="w-full min-h-[590px] h-full max-w-full flex items-center justify-center">
        <div className="w-full h-full p-5 rounded-md">
          <Logo />
          <h1 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold mb-1.5 mt-8">
            Reset with Activation Code
          </h1>
          <p className="mb-6 text-[15px] dark:text-[#f1f7feb5] font-normal">
            Enter the 6-digit activation code sent to you
          </p>

          <Form {...verifyForm}>
            <form className="flex flex-col gap-4" onSubmit={verifyForm.handleSubmit(onVerifySubmit)}>
              <div className="flex justify-between gap-2">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <FormField
                    key={num}
                    control={verifyForm.control}
                    name={`code${num}` as "code1" | "code2" | "code3" | "code4" | "code5" | "code6"}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            maxLength={1}
                            className="w-12 h-12 text-center text-lg"
                            onKeyDown={(e) => {
                              if (e.key === 'Backspace' && !field.value && num > 1) {
                                verifyForm.setFocus(`code${num - 1}` as "code1" | "code2" | "code3" | "code4" | "code5" | "code6");
                              }
                            }}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value.length <= 1) {
                                field.onChange(value);
                                if (value && num < 6) {
                                  verifyForm.setFocus(`code${num + 1}` as "code1" | "code2" | "code3" | "code4" | "code5" | "code6");
                                }
                              }
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              <Button
                type="submit"
                disabled={isVerifyPending}
                className="w-full text-[15px] h-[40px] text-white font-semibold mt-4"
              >
                {isVerifyPending ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify Code'
                )}
              </Button>
            </form>
          </Form>

          <div className="flex flex-row gap-2 mt-4">
            <div className="flex-1">
              <Button
                variant="outline"
                className="w-full text-[15px] h-[40px]"
                onClick={() => setStep('method')}
              >
                Go Back
              </Button>
            </div>
            <div className="flex-1">
              <Button
                variant="outline"
                className="w-full text-[15px] h-[40px]"
                onClick={() => router.push('/')}
              >
                Back to Login
              </Button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return null;
}
