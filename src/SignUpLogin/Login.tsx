import { Button, PasswordInput, rem, TextInput } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const Login = () => {
  const icon = <IconAt style={{ width: rem(16), height: rem(16) }} />;
  const iconn = <IconLock style={{ width: rem(16), height: rem(16) }} />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-8">
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded-lg flex flex-col gap-6">
        <div className="text-2xl font-semibold text-gray-800 text-center">
          Create Account
        </div>

        <TextInput
          withAsterisk
          leftSection={icon}
          label="Email"
          placeholder="Your email"
          className="w-full"
        />
        <PasswordInput
          withAsterisk
          leftSection={iconn}
          label="Password"
          placeholder="Password"
          className="w-full"
        />

        <Button autoContrast variant="filled" className="w-full bg-blueRibbon-600 hover:bg-blueRibbon-500">
          Signin
        </Button>

        <div className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blueRibbon-600 hover:underline font-medium"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
