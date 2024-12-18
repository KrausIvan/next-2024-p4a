import { auth } from "@/libs/auth";

const LoggedUser = async () => {
  const session = await auth();

  return session?.user ? (
      <p>Přihlášený uživatel: {session.user.email}</p>
  ) : (
      <p>Nepřihlášený uživatel</p>
  );
};

export default LoggedUser;