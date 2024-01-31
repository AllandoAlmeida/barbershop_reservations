import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const header = () => {
  return (
    <Card>
      <CardContent className="py-5 px-8 justify-between items-center flex flex-row">
        <Image
          src="/logo.png"
          alt={"Logo FSW Barber"}
          height={22}
          width={120}
        />
        <Button variant={"outline"} size={"icon"} className="h-8 w-8">
          <MenuIcon size={18}/>
        </Button>
      </CardContent>
    </Card>
  );
};

export default header;
