"use client";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";

import Modal from "./Modal";
import Heading from "../shared/Heading";
import Input from "../shared/inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../shared/Button";

import useLoginModal from "../hooks/useLoginMdal";
import useRegisterModal from "../hooks/useRegisterModal";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isloading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("loged in");
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const switchModal = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-3">
      <Heading title="Welcome back" subtitle="Login to your account" />
      <Input
        id="email"
        label="Email"
        register={register}
        disabled={isloading}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        register={register}
        disabled={isloading}
        errors={errors}
        required
        type="password"
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-3 mt-3">
      <hr />
      <Button
        label="Continue with Google"
        onClick={() => signIn("google")}
        icon={FcGoogle}
        disabled={isloading}
        outline
      />
      <Button
        label="Continue with Github"
        onClick={() => signIn("github")}
        icon={AiFillGithub}
        disabled={isloading}
        outline
      />
      <div className="text-neutral-500 text-center mt-2 font-light">
        <div className="flex flex-row items-center gap-2 justify-center">
          <div>Dont have an account?</div>
          <div
            onClick={switchModal}
            className="text-neutral-800 cursor-pointer hover:underline font-semibold"
          >
            sign up
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isloading}
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      isOpen={loginModal.isOpen}
      title="Log in"
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
