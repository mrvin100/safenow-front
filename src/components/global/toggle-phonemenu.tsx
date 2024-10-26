"use client";
import { cn } from "@/lib/utils";
import { MenuIcon, XIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export interface Navlink {
  label: string;
  href: string;
}
interface MenuProps {
  navLinks: Navlink[];
}
export const TogglePhoneMenu: React.FC<MenuProps> = ({ navLinks }) => {
  const [show, setShow] = React.useState<boolean>(false);
  const toggleShow = () => setShow((s) => !s);
  return (
    <>
      <Button
        onClick={toggleShow}
        size={"icon"}
        variant={"outline"}
        className={cn(
          "md:hidden bg-muted text-muted-foreground",
          "hover:bg-transparent hover:text-primary"
        )}
      >
        <MenuIcon className="size-6" />
      </Button>
      {show && (
        <div className="md:hidden z-50 absolute top-0 left-0 right-0 shadow-lg bg-card">
          <div className="flex justify-between items-center px-5 py-3">
            <Link href={"/"}>
              <Image
                src={"/icons/sn-logo.png"}
                priority
                unoptimized
                height={100}
                width={100}
                className="size-10 aspect-square flex-none"
                alt="Safenow logo"
              />
            </Link>
            <Button
              onClick={toggleShow}
              size={"icon"}
              variant={"outline"}
              className={cn(
                "md:hidden bg-muted text-muted-foreground",
                "hover:bg-transparent hover:text-primary"
              )}
            >
              <XIcon className="size-6" />
            </Button>
          </div>
          <nav className="flex flex-col gap-3">
            {navLinks && navLinks.length > 0 ? (
              navLinks.map((navLink) => (
                <Button
                  key={navLink.label}
                  asChild
                  variant={"ghost"}
                  onClick={() => setShow(false)}
                >
                  <Link href={navLink.href}>{navLink.label}</Link>
                </Button>
              ))
            ) : (
              <div>empty links</div>
            )}
          </nav>
        </div>
      )}
    </>
  );
};
