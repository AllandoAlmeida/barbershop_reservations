"use client";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

import Link from "next/link";
import SideMenu from "./side-menu";

const Header = () => {
  return (
    <header className="">
      <Card>
        <CardContent className="mx-auto max-w-[900px] p-5 justify-between items-center flex flex-row">
          <Link href="/">
            <Image src="/logo.svg" alt="FSW Barber" height={18} width={120} />
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
              <SideMenu />
            </SheetContent>
          </Sheet>
        </CardContent>
      </Card>
    </header>
  );
};

export default Header;
