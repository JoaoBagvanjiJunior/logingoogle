"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { GithubLogo, GoogleLogo, WindowsLogo } from "@phosphor-icons/react"
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const handleLoginClick = async (provider: "google" | "github" | "microsoft-entra-id") =>{
    await signIn(provider)
  }

  const handleLogoutClick = async () =>{
    await signOut()
  }

  const {status, data}= useSession();

  return (
    <div className="h-screen w-screen flex items-center justify-center">

      <div className="flex flex-col gap-3 items-center">
        <h1 className="text-xl">Ola, Seja Bem-Vindo!</h1>

        {status === "authenticated" && data?.user &&(
          <div className="flex flex-col">
            <div className="flex items-center gap-2 py-4">
              <Avatar>
                <AvatarFallback>
                  {data.user.name?.[0].toLocaleUpperCase()}
                </AvatarFallback>
                {data.user.image && <AvatarImage src={data.user.image}/>}
              </Avatar>

              <div className="flex flex-col">
                <p className="font-medium">{data.user.name}</p>
              </div>
            </div>

            <Separator/>
          </div>
        )}
        <div className="mt-4 flex flex-col gap-2">
          {status === "unauthenticated" &&(
            <>
              <Button className="w-full justify-start gap-2" onClick={()=>handleLoginClick("google")}>
                <GoogleLogo size={16}/>
                Login com Google
              </Button>

              <Button
              className="w-full justify-start gap-2"
              onClick={()=>handleLoginClick("github")}
              >
              <GithubLogo size={16} />
              Login com GitHub
              </Button>

              <Button
              className="w-full justify-start gap-2"
              onClick={()=>handleLoginClick("microsoft-entra-id")}
              >
              <WindowsLogo size={20} />
              Login com Microsoft
              </Button>
            </>
          )}

          {status === "authenticated" &&(
            <Button className="w-full justify-start gap-2" onClick={handleLogoutClick}>
              <LogOutIcon size={16}/>
              LogOut
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
