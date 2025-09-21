import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-background">
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <aside className="hidden md:flex md:w-72 md:flex-col md:gap-3 border-r border-gray-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
                    <div className="flex h-16 items-center gap-3 px-4 shadow-sm">
                        <Link href="/" className="flex items-center gap-2">
                            <ApplicationLogo className="h-8 w-auto fill-current text-primary-600" />
                            <span className="text-base font-semibold text-gray-800">Dashboard</span>
                        </Link>
                    </div>
                    <nav className="flex-1 space-y-1 px-3 py-4">
                        <NavLink href={route("home")} active={route().current("home")}>
                            <span className="inline-flex items-center gap-3">
                                {/* Home icon */}
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-10.5Z"/></svg>
                                Home
                            </span>
                        </NavLink>

                        {/* Muster group */}
                        <div className="px-1">
                            <div className="text-[11px] uppercase tracking-wider text-gray-500 px-2 mt-4 mb-1">Muster</div>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex w-full">
                                        <button type="button" className="w-full inline-flex items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                            <span className="inline-flex items-center gap-3">
                                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v2H4V6Zm0 5h16v2H4v-2Zm0 5h16v2H4v-2Z"/></svg>
                                                Create
                                            </span>
                                            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08Z" clipRule="evenodd"/></svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>
                                <Dropdown.Content contentClasses="py-1 bg-white">
                                    <Dropdown.Link href={route("addProduct.create")}>Add Products</Dropdown.Link>
                                    <Dropdown.Link href={route("supplier.create")}>Party</Dropdown.Link>
                                    <Dropdown.Link href={route("customer.create")}>Add Customer</Dropdown.Link>
                                    <Dropdown.Link href={route("menu.create")}>Add Menu</Dropdown.Link>
                                    <Dropdown.Link href={route("addService.create")}>Add Serviecs</Dropdown.Link>
                                    <Dropdown.Link href={route("hall.create")}>Add Hall</Dropdown.Link>
                                    <Dropdown.Link href={route("employee.create")}>Add Employee</Dropdown.Link>
                                    <Dropdown.Link href={route("vendor.create")}>Vendor</Dropdown.Link>
                                    <Dropdown.Link href={route("expense.create")}>Expenses</Dropdown.Link>
                                    <Dropdown.Link href={route("sendKitchen.create")}>آشپزخانه</Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* Reports */}
                        <div className="px-1">
                            <div className="text-[11px] uppercase tracking-wider text-gray-500 px-2 mt-4 mb-1">Reports</div>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex w-full">
                                        <button type="button" className="w-full inline-flex items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                            <span className="inline-flex items-center gap-3">
                                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h4v16H4V4Zm6 6h4v10h-4V10Zm6-4h4v14h-4V6Z"/></svg>
                                                Reports
                                            </span>
                                            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08Z" clipRule="evenodd"/></svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>
                                <Dropdown.Content contentClasses="py-1 bg-white">
                                    <Dropdown.Link href={route("stock.index")}>Stock</Dropdown.Link>
                                    <Dropdown.Link href={route("products.report")}>Purchase Report</Dropdown.Link>
                                    <Dropdown.Link href={route("purchaseItemReport.report")}>Purchase Return RP</Dropdown.Link>
                                    <Dropdown.Link href={route("saleProduct.report")}>Sale Reports</Dropdown.Link>
                                    <Dropdown.Link href={route("returnSale.index")}>Sales Return RP</Dropdown.Link>
                                    <Dropdown.Link href={route("bookingCollection.report")}>Booking Collection</Dropdown.Link>
                                    <Dropdown.Link href={route("expense.report")}>Cash Book</Dropdown.Link>
                                    <Dropdown.Link href={route("cash.report")}>Cash</Dropdown.Link>
                                    <Dropdown.Link href={route("Due.booking")}>Due</Dropdown.Link>
                                    <Dropdown.Link href={route("menu.list")}>Menus</Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* Purchase */}
                        <div className="px-1">
                            <div className="text-[11px] uppercase tracking-wider text-gray-500 px-2 mt-4 mb-1">Purchase</div>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex w-full">
                                        <button type="button" className="w-full inline-flex items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                            <span className="inline-flex items-center gap-3">
                                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4h10l1 2h3v2h-2l-2 10H7L5 8H3V6h3l1-2Zm2 6h2v6H9v-6Zm4 0h2v6h-2v-6Z"/></svg>
                                                Purchase
                                            </span>
                                            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08Z" clipRule="evenodd"/></svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>
                                <Dropdown.Content contentClasses="py-1 bg-white">
                                    <Dropdown.Link href={route("products.create")}>Purchase Items</Dropdown.Link>
                                    <Dropdown.Link href={route("return.create")}>Purchase Return</Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* Sales */}
                        <div className="px-1">
                            <div className="text-[11px] uppercase tracking-wider text-gray-500 px-2 mt-4 mb-1">Sales</div>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex w-full">
                                        <button type="button" className="w-full inline-flex items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                            <span className="inline-flex items-center gap-3">
                                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16v2H4V4Zm2 4h12v2H6V8Zm-2 4h16v2H4v-2Zm2 4h12v2H6v-2Z"/></svg>
                                                Sales
                                            </span>
                                            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08Z" clipRule="evenodd"/></svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>
                                <Dropdown.Content contentClasses="py-1 bg-white">
                                    <Dropdown.Link href={route("saleProduct.create")}>Sale</Dropdown.Link>
                                    <Dropdown.Link href={route("returnSale.create")}>Sale Return</Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* Direct links */}
                        <div className="px-1 mt-4 space-y-1">
                            <NavLink href={route("book.create")} active={route().current("book.create")}>
                                <span className="inline-flex items-center gap-3">
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2h9a3 3 0 0 1 3 3v15l-6-3-6 3V5a3 3 0 0 1 3-3Z"/></svg>
                                    Book
                                </span>
                            </NavLink>
                            <NavLink href={route("bookingReport.create")} active={route().current("bookingReport.create")}>
                                <span className="inline-flex items-center gap-3">
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v12H4V6Zm2 2v8h12V8H6Z"/></svg>
                                    Booking
                                </span>
                            </NavLink>
                        </div>
                    </nav>
                    <div className="mt-auto border-t border-gray-100 p-4">
                        <div className="text-xs text-gray-500">Logged in as</div>
                        <div className="text-sm font-medium text-gray-800">{user.name}</div>
                    </div>
                </aside>

                {/* Mobile sidebar toggle & topbar */}
                <div className="flex flex-1 flex-col">
                    <div className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-100 bg-white/90 px-4 backdrop-blur supports-[backdrop-filter]:bg-white/75 md:justify-end">
                        <button
                            onClick={() => setShowingNavigationDropdown((p) => !p)}
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-50 md:hidden"
                            aria-label="Toggle navigation"
                        >
                            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                                {showingNavigationDropdown ? (
                                    <path d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>

                        <div className="hidden md:flex md:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                            >
                                                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-700">{user.name?.[0]}</span>
                                                {user.name}
                                                <svg className="-me-0.5 ms-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414Z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route("profile.edit")}>
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route("logout")} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Drawer */}
                    {showingNavigationDropdown && (
                        <div className="md:hidden">
                            <div className="space-y-1 border-b border-gray-100 bg-white px-2 pb-3 pt-2">
                                <ResponsiveNavLink href={route("home")} active={route().current("home")}>
                                    Home
                                </ResponsiveNavLink>
                                {/* Replicate key sections minimally for mobile for now */}
                                <ResponsiveNavLink href={route("book.create")} active={route().current("book.create")}>
                                    Book
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route("bookingReport.create")} active={route().current("bookingReport.create")}>
                                    Booking
                                </ResponsiveNavLink>
                            </div>
                            <div className="border-b border-gray-100 bg-white pb-1 pt-3">
                                <div className="px-4">
                                    <div className="text-base font-medium text-gray-800">{user.name}</div>
                                    <div className="text-sm font-medium text-gray-500">{user.email}</div>
                                </div>
                                <div className="mt-3 space-y-1 px-2">
                                    <ResponsiveNavLink href={route("profile.edit")}>Profile</ResponsiveNavLink>
                                    <ResponsiveNavLink method="post" href={route("logout")} as="button">Log Out</ResponsiveNavLink>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Page header */}
                    {header && (
                        <header className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-gray-100">
                            <div className="container-responsive py-4">
                                {header}
                            </div>
                        </header>
                    )}

                    {/* Main content */}
                    <main className="container-responsive py-4">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}

