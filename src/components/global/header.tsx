import * as React from "react";
import { AppContainer } from "./app-container";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { TogglePhoneMenu } from "./toggle-phonemenu";
import { Navlink } from "./toggle-phonemenu";

export interface HeaderProps {
  transparentBg?: boolean;
}

const navLinks: Navlink[] = [
  { label: "Register", href: "/sign-up" },
  { label: "About US", href: "/about-us" },
  { label: "Contact", href: "/contact" },
  { label: "desastras", href: "/desastras" },
];

export const Header: React.FC<HeaderProps> = ({ transparentBg = true }) => {
  return (
    <header
      className={cn(
        "py-3 lg:py-5 shadow-md",
        "transition-all duration-300",
        transparentBg ? "bg-black/0" : "bg-black"
      )}
    >
      <AppContainer className="flex justify-between items-center">
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
        <nav className="hidden md:flex">
          {navLinks && navLinks.length > 0 ? (
            navLinks.map((navLink) => (
              <Link key={navLink.label} href={navLink.href} className="mr-2">
                {navLink.label}
              </Link>
            ))
          ) : (
            <div>empty links</div>
          )}
        </nav>
        <TogglePhoneMenu navLinks={navLinks} />
      </AppContainer>
    </header>
  );
};
