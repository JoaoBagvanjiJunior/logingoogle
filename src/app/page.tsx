"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { GithubLogo, GoogleLogo, WindowsLogo } from "@phosphor-icons/react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const [email, setEmail] = useState(""); // Estado para o email
  const [password, setPassword] = useState(""); // Estado para a senha
  const { status, data } = useSession();

  const handleLoginClick = async (provider: "google" | "github" | "microsoft-entra-id") => {
    await signIn(provider);
  };

  const handleCredentialsLogin = async () => {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      alert(result.error); // Exibe um alerta em caso de erro
    } else {
      console.log("Login bem-sucedido!");
    }
  };

  const handleLogoutClick = async () => {
    await signOut();
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col gap-3 items-center">
        <h1 className="text-xl">Olá, Seja Bem-Vindo!</h1>

        {status === "authenticated" && data?.user && (
          <div className="flex flex-col">
            <div className="flex items-center gap-2 py-4">
              <Avatar>
                {/* Exibe a imagem do usuário, se existir */}
                {data.user.image && <AvatarImage src={data.user.image} />}
                {/* Fallback: Avatar padrão com a primeira letra do nome ou email */}
                <AvatarFallback>
                  {data.user.name?.[0]?.toUpperCase() || data.user.email?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                {/* Exibe o nome do usuário, se existir */}
                {data.user.name && <p className="font-medium">{data.user.name}</p>}
                {/* Exibe o email do usuário */}
                <p className="text-sm text-gray-500">{data.user.email}</p>
              </div>
            </div>

            <Separator />
          </div>
        )}

        <div className="mt-4 flex flex-col gap-2">
          {status === "unauthenticated" && (
            <>
              {/* Formulário de Login com Credenciais */}
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-2 border rounded text-black"
                />
                <input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-2 border rounded text-black"
                />
                <Button
                  className="w-full justify-start gap-2"
                  onClick={handleCredentialsLogin}
                >
                  <LogInIcon size={16} />
                  Login com Email e Senha
                </Button>
              </div>

              {/* Botões de Login com OAuth */}
              <Button
                className="w-full justify-start gap-2"
                onClick={() => handleLoginClick("google")}
              >
                <GoogleLogo size={16} />
                Login com Google
              </Button>

              <Button
                className="w-full justify-start gap-2"
                onClick={() => handleLoginClick("github")}
              >
                <GithubLogo size={16} />
                Login com GitHub
              </Button>

              <Button
                className="w-full justify-start gap-2"
                onClick={() => handleLoginClick("microsoft-entra-id")}
              >
                <WindowsLogo size={20} />
                Login com Microsoft
              </Button>
            </>
          )}

          {status === "authenticated" && (
            <Button
              className="w-full justify-start gap-2"
              onClick={handleLogoutClick}
            >
              <LogOutIcon size={16} />
              LogOut
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}