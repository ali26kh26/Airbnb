"use client";
import { safeUser } from "@/app/types";
import Container from "../shared/Container";
import Categories from "./Categories";
import Logo from "./Logo";
import Search from "./search";
import UserMenu from "./UserMenu";

interface Props {
  currentUser?: safeUser | null;
}
const Navbar: React.FC<Props> = ({ currentUser }) => {
  return (
    <nav className="fixed w-full bg-white shadow-sm z-50">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </nav>
  );
};

export default Navbar;
