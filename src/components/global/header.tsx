import * as React from "react";
import { AppContainer } from "./app-container";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { TogglePhoneMenu } from "./toggle-phonemenu";
import { Navlink } from "./toggle-phonemenu";
import { Button } from "@/components/ui/button";

export interface HeaderProps {
  transparentBg?: boolean;
}

const navLinks: Navlink[] = [
  { label: "Disasters", href: "/disasters" },
  { label: "Resources ", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export const Header: React.FC<HeaderProps> = ({ transparentBg = true }) => {
  return (
    <header
      className={cn(
        "py-3 lg:py-5 shadow-md",
        "transition-all duration-300",
        transparentBg ? "bg-black/0 text-foreground" : "bg-violet-950 text-card"
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
              <Link
                key={navLink.label}
                href={navLink.href}
                className="nav-link md:px-5"
              >
                {navLink.label}
              </Link>
            ))
          ) : (
            <div>empty links</div>
          )}
        </nav>
        <Button asChild className="order-first md:order-none">
          <Link href={"/sign-up"}>Register</Link>
        </Button>
        <TogglePhoneMenu navLinks={navLinks} />
      </AppContainer>
    </header>
  );
};
