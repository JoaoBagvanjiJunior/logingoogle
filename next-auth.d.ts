import "next-auth";

declare module "next-auth" {
  interface User {
    id: string; // Adiciona o campo id ao tipo User
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | null;
    image?: string | null;
    password?: string | null; // Adiciona o campo password, se necessário
  }

  interface Session {
    user: User; // Define que a sessão contém um user do tipo User
  }
}