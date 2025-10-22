import { ModeToggle } from "@/components/themes/mode-toggle";
import LoginButton from "./components/auth/login-button";

export default function Home () {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1>Welcome to Strathspace2</h1>
      <ModeToggle />
      <LoginButton/>
    </main>
  );
}