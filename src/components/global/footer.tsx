import * as React from "react";
import { Spacer } from "./spacer";
import { AppContainer } from "./app-container";
import Image from "next/image";
import Link from "next/link";
import { Navlink } from "./toggle-phonemenu";
import { TypographyH3 } from "@/components/ui/typographies";
import {
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface FooterGroup {
  group: string;
  links: Navlink[];
}

const footerGroups: FooterGroup[] = [
  {
    group: "group-1",
    links: [
      { label: "About us", href: "/about" },
      { label: "Features", href: "/features" },
    ],
  },
  {
    group: "group-2",
    links: [
      { label: "Help Center", href: "/help-center" },
      { label: "Contact us", href: "/contact" },
    ],
  },
  {
    group: "group-3",
    links: [
      { label: "FAQs", href: "/faqs" },
      { label: "Disasters", href: "/disasters" },
    ],
  },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-violet-950 text-white">
      <Spacer small />
      <AppContainer
        className={cn( 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-10')}
      >
        <div>
          <Link href={"/"} className="inline-block">
            <Image
              src={"/icons/sn-logo.png"}
              priority
              unoptimized
              height={100}
              width={100}
              className="size-10 aspect-square flex-none"
              alt="Safenow logo"
            />
            <span className="font-semibold inline-block mt-2">Safe Now</span>
          </Link>
        </div>
        {footerGroups &&
          footerGroups.length > 0 &&
          footerGroups.map((footerGroup) => (
            <ul key={footerGroup.group}>
              {footerGroup.links && footerGroup.links.length > 0 ? (
                footerGroup.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="nav-link text-primary-foreground block md:px-5"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))
              ) : (
                <p>Empty footer link</p>
              )}
            </ul>
          ))}
        <div className="space-y-3">
          <TypographyH3>Follow US</TypographyH3>
          <div className="flex gap-4 items-center">
            <FacebookIcon className="size-8" />
            <YoutubeIcon className="size-8" />
            <LinkedinIcon className="size-8" />
            <TwitterIcon className="size-8" />
          </div>
        </div>
      </AppContainer>
      <Spacer extraSmall />
      <Separator className="my-4 bg-muted-foreground" />
      <Spacer extraSmall />
      <small className="text-center text-muted-foreground w-full block">
        Copyright {new Date().getFullYear()} <b>Safe Now</b> - All rights
        reserved!
      </small>
      <Spacer small />
    </footer>
  );
};
