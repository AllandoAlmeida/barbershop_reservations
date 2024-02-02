"use client";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  UserIcon,
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";

const header = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useSession();

  const handleLogoOut = () => signOut();
  const handleLogIn = () => signIn("google");
  return (
    <Card>
      <CardContent className="py-5 px-8 justify-between items-center flex flex-row">
        <Image
          src="/logo.png"
          alt={"Logo FSW Barber"}
          height={22}
          width={120}
        />
        <Sheet>
          {/* Botão para abrir o menu */}
          <SheetTrigger asChild>
            <Button variant={"outline"} size={"icon"} className="h-8 w-8">
              <MenuIcon size={16} />
            </Button>
          </SheetTrigger>
          {/* conteudo do menu */}
          <SheetContent className="p-0">
            <SheetHeader className="text-left border-b border-solid border-secondary p-5">
              <SheetTitle>
                <h1 className="text-2xl font-bold">Menu</h1>
              </SheetTitle>
            </SheetHeader>
            {data?.user ? (
              <div className="flex justify-between items-center gap-3 px-5 py-6">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={data.user?.image ?? ""} />
                  </Avatar>
                  <h2>{data.user.name}</h2>
                </div>
                <Button
                  variant={"outline"}
                  size={"icon"}
                  className="h-8 w-8"
                  onClick={handleLogoOut}
                >
                  <LogOutIcon size={16} />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col px-5 py-6 gap-3">
                <div className="flex items-center gap-2">
                  <UserIcon size={24} />
                  <h2>Olá, faça seu login</h2>
                </div>
                <Button
                  variant={"secondary"}
                  className="w-full justify-start"
                  onClick={handleLogIn}
                >
                  <LogInIcon className="mr-2" size={18} />
                  Fazer Login
                </Button>
              </div>
            )}
            <div className="flex flex-col gap-3 px-5">
              <Button
                variant={"secondary"}
                className="justify-start"
                onClick={handleLogIn}
                asChild
              >
                <Link href={"/"}>
                  <HomeIcon className="mr-2" size={18} />
                  Início
                </Link>
              </Button>

              {data?.user && (
                <Button variant={"secondary"} className="justify-start" asChild>
                  <Link href="/bookings" >
                    <CalendarIcon className="mr-2" size={18} />
                    Agendamentos
                  </Link>
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default header;
