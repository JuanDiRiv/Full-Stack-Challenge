"use client";

import { usePathname } from "next/navigation";
import { NavLink } from "@/components/nav-link/nav-link";

const navItems = [
    { href: "/", label: "Home" },
    { href: "/users", label: "Users" },
    { href: "/posts", label: "Posts" },
];

const isNavItemActive = (pathname: string, href: string): boolean => {
    if (href === "/") {
        return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
};

export const MainNav = () => {
    const pathname = usePathname();

    return (
        <nav aria-label="Main navigation">
            <ul className="flex flex-wrap items-center gap-2">
                {navItems.map((item) => (
                    <li key={item.href}>
                        <NavLink
                            href={item.href}
                            label={item.label}
                            isActive={isNavItemActive(pathname, item.href)}
                        />
                    </li>
                ))}
            </ul>
        </nav>
    );
};
