import LoggedUser from "@/components/server/LoggedUser";
import SignOutButton from "@/components/server/SignOutButton";
import LoggedUserClient from "@/components/client/LoggedUser";
import SignInButtonClient from "@/components/client/SignInButton";
import SignOutButtonClient from "@/components/client/SignOutButton";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div><Link href="/sign/in">Sign In</Link></div>
      <LoggedUser />
      <LoggedUserClient />
      <SignOutButton />
      <div>
        Client:
        <SignInButtonClient />
        <SignOutButtonClient />
      </div>
    </div>
  );
}
