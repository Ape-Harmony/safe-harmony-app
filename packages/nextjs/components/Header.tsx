import React, { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { Button, Box } from "@chakra-ui/react";

import { FaucetButton } from "~~/components/scaffold-eth";
import { Bars3Icon, BugAntIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useOutsideClick } from "~~/hooks/scaffold-eth";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link
      href={href}
      passHref
      className={`${
        isActive ? "bg-secondary shadow-md" : ""
      } hover:bg-secondary hover:shadow-md focus:bg-secondary py-2 px-3 text-sm rounded-full gap-2`}
    >
      {children}
    </Link>
  );
};

/**
 * Site header
 */
export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  const handleProfileClick = () => {
    router.push("/profile");
  };
  function handleHomeClick() {
    router.push("/");
  }

  const navLinks = (
    <>
      <li>
        <NavLink href="/debug">
          <BugAntIcon className="h-4 w-4" />
          Debug Contracts
        </NavLink>
      </li>
      <li>
        <Button onClick={handleHomeClick} colorScheme="facebook" variant="outline">
          Home
        </Button>
      </li>
    </>
  );

  return (
    <div className="sticky lg:static top-0 navbar bg-nav min-h-0 flex-shrink-0 justify-between z-20 shadow-md lg:shadow-none shadow-secondary">
      <div className="navbar-start w-auto lg:w-1/2">
        <div className="lg:hidden dropdown" ref={burgerMenuRef}>
          <button
            className={`ml-1 btn btn-ghost ${isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"}`}
            onClick={() => {
              setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
            }}
          >
            <Bars3Icon className="h-1/2" />
          </button>
          {isDrawerOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              {navLinks}
            </ul>
          )}
        </div>
      </div>
      <div className="navbar-end flex-grow mr-4">
        <Box pr={4}>
          <div className="hidden lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2">{navLinks}</div>
        </Box>
        <Button onClick={handleProfileClick} colorScheme="facebook" variant="outline">
          Profile
        </Button>
        <FaucetButton />
      </div>
    </div>
  );
}
