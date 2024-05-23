import { Nav, NavLink } from "@/components/Nav"
import { auth } from "../../../auth"
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav>
        <div className="flex justify-between items-center">
          <div>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/products">Products</NavLink>
            <NavLink href="/orders">My Orders</NavLink>
          </div>
          <div>
            <Link href="/sign-in">
              <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Authenticate</Button>
            </Link>
          </div>
        </div>
      </Nav>
      <div className="container my-6">{children}</div>
    </>
  );
}