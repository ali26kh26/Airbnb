"use client";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import useRegisterModal from "../hooks/useRegisterModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import Modal from "./Modal";
import Heading from "../shared/Heading";
import Input from "../shared/inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../shared/Button";
import useLoginModal from "../hooks/useLoginMdal";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isloading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("signed up");
        registerModal.onClose();
      })
      .catch((err) => {
        toast.error("something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const switchModal = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-3">
      <Heading title="Welcome to Airbnb" subtitle="Create account" />
      <Input
        id="email"
        label="Email"
        register={register}
        disabled={isloading}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="name"
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
    <div className="flex flex-col gap-3 mt-2">
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
      <div className="text-neutral-500 text-center mt-1 font-light">
        <div className="flex flex-row items-center gap-2 justify-center">
          <div>Already have an account?</div>
          <div
            onClick={switchModal}
            className="text-neutral-800 cursor-pointer hover:underline font-semibold"
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isloading}
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      isOpen={registerModal.isOpen}
      title="Register"
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
