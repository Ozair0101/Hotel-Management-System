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
                {/* Sidebar - Hidden on mobile, visible on md and up */}
                <aside className="hidden md:flex md:w-64 lg:w-72 md:flex-col border-r border-gray-200 bg-white shadow-sm">
                    <div className="flex h-16 items-center px-6 border-b border-gray-200">
                        <Link href="/" className="flex items-center gap-3">
                            <ApplicationLogo className="h-8 w-auto fill-current text-primary-600" />
                            <span className="text-xl font-bold text-gray-900">SuperMarket</span>
                        </Link>
                    </div>
                    <nav className="flex-1 overflow-y-auto py-4 px-3">
                        <NavLink 
                            href={route("home")} 
                            active={route().current("home")}
                            className="nav-link nav-link-active:bg-primary-100 nav-link-active:text-primary-700 nav-link-inactive:text-gray-700"
                        >
                            <svg className="nav-link-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-10.5Z"/>
                            </svg>
                            Dashboard
                        </NavLink>

                        {/* Master group */}
                        <div className="mt-6">
                            <div className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                Master Data
                            </div>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex w-full">
                                        <button 
                                            type="button" 
                                            className="nav-link nav-link-inactive w-full justify-between"
                                        >
                                            <span className="inline-flex items-center gap-3">
                                                <svg className="nav-link-icon" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M4 6h16v2H4V6Zm0 5h16v2H4v-2Zm0 5h16v2H4v-2Z"/>
                                                </svg>
                                                Create
                                            </span>
                                            <svg className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08Z" clipRule="evenodd"/>
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>
                                <Dropdown.Content contentClasses="py-1 bg-white border border-gray-200 rounded-lg shadow-lg mt-1">
                                    <Dropdown.Link href={route("addProduct.create")} className="dropdown-item">
                                        Add Products
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route("supplier.create")} className="dropdown-item">
                                        Party
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route("customer.create")} className="dropdown-item">
                                        Add Customer
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route("menu.create")} className="dropdown-item">
                                        Add Menu
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route("addService.create")} className="dropdown-item">
                                        Add Services
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route("hall.create")} className="dropdown-item">
                                        Add Hall
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route("employee.create")} className="dropdown-item">
                                        Add Employee
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route("vendor.create")} className="dropdown-item">
                                        Vendor
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route("expense.create")} className="dropdown-item">
                                        Expenses
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route("sendKitchen.create")} className="dropdown-item">
                                        آشپزخانه
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* Reports */}
                        <div className="mt-6">
                            <div className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                Reports
                            </div>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex w-full">
                                        <button 
                                            type="button" 
                                            className="nav-link nav-link-inactive w-full justify-between"
                                        >
                                            <span className="inline-flex items-center gap-3">
                                                <svg className="nav-link-icon" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M4 4h4v16H4V4Zm6 6h4v10h-4V10Zm6-4h4v14h-4V6Z"/>
                                                </svg>
                                                Reports
                                            </span>
                                            <svg className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08Z" clipRule="evenodd"/>
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>
                                <Dropdown.Content contentClasses="py-1 bg-white border border-gray-200 rounded-lg shadow-lg mt-1">
                                    <Dropdown.Link href={route("stock.index")} className="dropdown-item">
                                        Stock
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route("products.report")} className="dropdown-item">
                                        Purchase Report
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route("purchaseItemReport.report")} className="dropdown-item">
                                        Purchase Return RP
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route("saleProduct.report")} className="dropdown-item">
                                        Sale Reports
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route("returnSale.index")} className="dropdown-item">
                                        Sales Return RP
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route("bookingCollection.report")} className="dropdown-item">
                                        Booking Collection
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route("expense.report")} className="dropdown-item">
                                        Cash Book
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route("cash.report")} className="dropdown-item">
                                        Cash
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route("Due.booking")} className="dropdown-item">
                                        Due
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route("menu.list")} className="dropdown-item">
                                        Menus
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* Purchase */}
                        <div className="mt-6">
                            <div className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                Purchase
                            </div>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex w-full">
                                        <button 
                                            type="button" 
                                            className="nav-link nav-link-inactive w-full justify-between"
                                        >
                                            <span className="inline-flex items-center gap-3">
                                                <svg className="nav-link-icon" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M7 4h10l1 2h3v2h-2l-2 10H7L5 8H3V6h3l1-2Zm2 10h2v6H9v-6Zm4 0h2v6h-2v-6Z"/>
                                                </svg>
                                                Purchase
                                            </span>
                                            <svg className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08Z" clipRule="evenodd"/>
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>
                                <Dropdown.Content contentClasses="py-1 bg-white border border-gray-200 rounded-lg shadow-lg mt-1">
                                    <Dropdown.Link href={route("products.create")} className="dropdown-item">
                                        Purchase Items
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route("return.create")} className="dropdown-item">
                                        Purchase Return
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* Sales */}
                        <div className="mt-6">
                            <div className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                Sales
                            </div>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex w-full">
                                        <button 
                                            type="button" 
                                            className="nav-link nav-link-inactive w-full justify-between"
                                        >
                                            <span className="inline-flex items-center gap-3">
                                                <svg className="nav-link-icon" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M4 4h16v2H4V4Zm2 4h12v2H6V8Zm-2 4h16v2H4v-2Zm2 4h12v2H6v-2Z"/>
                                                </svg>
                                                Sales
                                            </span>
                                            <svg className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08Z" clipRule="evenodd"/>
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>
                                <Dropdown.Content contentClasses="py-1 bg-white border border-gray-200 rounded-lg shadow-lg mt-1">
                                    <Dropdown.Link href={route("saleProduct.create")} className="dropdown-item">
                                        Sale
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route("returnSale.create")} className="dropdown-item">
                                        Sale Return
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* Direct links */}
                        <div className="mt-6 space-y-1">
                            <div className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                Quick Access
                            </div>
                            <NavLink 
                                href={route("book.create")} 
                                active={route().current("book.create")}
                                className="nav-link nav-link-active:bg-primary-100 nav-link-active:text-primary-700 nav-link-inactive:text-gray-700"
                            >
                                <svg className="nav-link-icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6 2h9a3 3 0 0 1 3 3v15l-6-3-6 3V5a3 3 0 0 1 3-3Z"/>
                                </svg>
                                Book
                            </NavLink>
                            <NavLink 
                                href={route("bookingReport.create")} 
                                active={route().current("bookingReport.create")}
                                className="nav-link nav-link-active:bg-primary-100 nav-link-active:text-primary-700 nav-link-inactive:text-gray-700"
                            >
                                <svg className="nav-link-icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M4 6h16v12H4V6Zm2 2v8h12V8H6Z"/>
                                </svg>
                                Booking
                            </NavLink>
                        </div>
                    </nav>
                    <div className="mt-auto border-t border-gray-200 p-4 bg-gray-50">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                                <span className="text-primary-700 font-semibold">{user.name?.[0]}</span>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-900 truncate">{user.name}</div>
                                <div className="text-xs text-gray-500">Administrator</div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main content area */}
                <div className="flex flex-1 flex-col w-full">
                    {/* Top navigation bar - visible on all screen sizes */}
                    <div className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm">
                        <div className="flex items-center">
                            {/* Mobile menu button */}
                            <button
                                onClick={() => setShowingNavigationDropdown((p) => !p)}
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"
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
                            
                            {/* Logo for mobile */}
                            <div className="md:hidden ml-2">
                                <ApplicationLogo className="h-8 w-auto fill-current text-primary-600" />
                            </div>
                        </div>

                        {/* User dropdown - hidden on mobile, visible on md and up */}
                        <div className="hidden md:flex md:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                                            >
                                                <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                                                    <span className="text-primary-700 font-semibold text-sm">{user.name?.[0]}</span>
                                                </div>
                                                <span className="hidden lg:inline">{user.name}</span>
                                                <svg className="-me-0.5 ms-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414Z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route("profile.edit")} className="dropdown-item">
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route("logout")} method="post" as="button" className="dropdown-item">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                        
                        {/* Mobile user menu - visible only on mobile */}
                        <div className="md:hidden flex items-center">
                            <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                                <span className="text-primary-700 font-semibold text-sm">{user.name?.[0]}</span>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Drawer - only visible on mobile when toggled */}
                    {showingNavigationDropdown && (
                        <div className="md:hidden">
                            <div className="space-y-1 border-b border-gray-200 bg-white px-2 pb-3 pt-2 shadow-sm">
                                <ResponsiveNavLink 
                                    href={route("home")} 
                                    active={route().current("home")}
                                >
                                    Dashboard
                                </ResponsiveNavLink>
                                <ResponsiveNavLink 
                                    href={route("book.create")} 
                                    active={route().current("book.create")}
                                >
                                    Book
                                </ResponsiveNavLink>
                                <ResponsiveNavLink 
                                    href={route("bookingReport.create")} 
                                    active={route().current("bookingReport.create")}
                                >
                                    Booking
                                </ResponsiveNavLink>
                                
                                {/* Mobile menu sections */}
                                <div className="pt-4 pb-2 border-t border-gray-200">
                                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
                                        Master Data
                                    </div>
                                    <ResponsiveNavLink href={route("addProduct.create")}>
                                        Add Products
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink href={route("supplier.create")}>
                                        Party
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink href={route("customer.create")}>
                                        Add Customer
                                    </ResponsiveNavLink>
                                </div>
                                
                                <div className="pt-4 pb-2 border-t border-gray-200">
                                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
                                        Reports
                                    </div>
                                    <ResponsiveNavLink href={route("stock.index")}>
                                        Stock
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink href={route("products.report")}>
                                        Purchase Report
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink href={route("saleProduct.report")}>
                                        Sale Reports
                                    </ResponsiveNavLink>
                                </div>
                                
                                <div className="pt-4 pb-2 border-t border-gray-200">
                                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
                                        Purchase
                                    </div>
                                    <ResponsiveNavLink href={route("products.create")}>
                                        Purchase Items
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink href={route("return.create")}>
                                        Purchase Return
                                    </ResponsiveNavLink>
                                </div>
                                
                                <div className="pt-4 pb-2 border-t border-gray-200">
                                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
                                        Sales
                                    </div>
                                    <ResponsiveNavLink href={route("saleProduct.create")}>
                                        Sale
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink href={route("returnSale.create")}>
                                        Sale Return
                                    </ResponsiveNavLink>
                                </div>
                            </div>
                            <div className="border-b border-gray-200 bg-white pb-1 pt-3">
                                <div className="px-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                                            <span className="text-primary-700 font-semibold">{user.name?.[0]}</span>
                                        </div>
                                        <div>
                                            <div className="text-base font-medium text-gray-800">{user.name}</div>
                                            <div className="text-sm font-medium text-gray-500">Administrator</div>
                                        </div>
                                    </div>
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
                        <header className="bg-white border-b border-gray-200">
                            <div className="container-responsive py-4">
                                {header}
                            </div>
                        </header>
                    )}

                    {/* Main content */}
                    <main className="flex-1 container-responsive py-6">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}