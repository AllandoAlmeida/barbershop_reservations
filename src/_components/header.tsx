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

import Link from "next/link";
import SidMenu from "./sid-menu";

const header = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useSession();

  const handleLogoOut = () => signOut();
  const handleLogIn = () => signIn("google");
  return (
    <Card>
      <CardContent className="py-5 px-8 justify-between items-center flex flex-row">
        <Link href={"/"}>
        <Image
          src="/logo.png"
          alt={"Logo FSW Barber"}
          height={22}
          width={120}
        />
        </Link>
        <Sheet>
          {/* Botão para abrir o menu */}
          <SheetTrigger asChild>
            <Button variant={"outline"} size={"icon"} className="h-8 w-8">
              <MenuIcon size={16} />
            </Button>
          </SheetTrigger>
          {/* conteudo do menu */}
          <SheetContent className="p-0">
            <SidMenu/>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default header;
