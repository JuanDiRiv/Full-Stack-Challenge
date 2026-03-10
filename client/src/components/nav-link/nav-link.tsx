import Link from "next/link";

type NavLinkProps = {
    href: string;
    label: string;
    isActive: boolean;
};

export const NavLink = ({ href, label, isActive }: NavLinkProps) => {
    return (
        <Link
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`rounded-md px-3 py-2 text-sm font-medium transition ${isActive
                ? "bg-slate-900 text-white"
                : "text-slate-700 hover:bg-slate-100"
                }`}
        >
            {label}
        </Link>
    );
};
