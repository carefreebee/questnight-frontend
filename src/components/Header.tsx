// import React from "react";
import { Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { useLocation } from "react-router-dom";
// import { AcmeLogo } from "./AcmeLogo.jsx";

export default function Header() {
  const { pathname } = useLocation();
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <p className="font-bold text-inherit">QuestNight</p>
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem isActive={pathname === "/"}>
          <Link color={pathname !== "/" ? "foreground" : undefined} href="/" aria-current="page">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/players"}>
          <Link color={pathname !== "/players" ? "foreground" : undefined} href="/players">
            Players
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/games"}>
          <Link color={pathname !== "/games" ? "foreground" : undefined} href="/games">
            Games
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/events"}>
          <Link color={pathname !== "/events" ? "foreground" : undefined} href="/events">
            Events
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
