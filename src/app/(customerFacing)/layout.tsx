import { Nav, NavLink } from "@/components/Nav"
import { auth } from "../../../auth"
import { Button } from "@/components/ui/button"
import Link from "next/link"; // Add Link import

export const dynamic = "force-dynamic"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/products">Products</NavLink>
        <NavLink href="/orders">My Orders</NavLink>
        <NavLink href="/sign-in">Authenticate</NavLink>
      </Nav>
      <div className="container my-6">{children}</div>
    </>
  )
}