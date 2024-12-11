import { signIn, auth } from "@/libs/auth";

const SignInButton = async () => {
  const session = await auth();

  if (!session) {
    return (
      <form action={async () => {
        "use server"
         await signIn("github")
        }}
      >
        <button type="submit">Signin with GitHub</button>
      </form>
    );
  }

  return <p>Přihlášen jako: {session.user!.email}</p>;
};

export default SignInButton;