import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                (
                    active
                        ? "bg-primary-50 text-primary-700 hover:text-primary-800"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                ) +
                " inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 " +
                className
            }
        >
            {children}
        </Link>
    );
}
