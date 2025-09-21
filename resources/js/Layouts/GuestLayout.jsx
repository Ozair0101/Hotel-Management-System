import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-background pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                    <ApplicationLogo className="h-16 w-16 fill-current text-primary-600" />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-6 shadow-card sm:max-w-md sm:rounded-xl border border-gray-100">
                {children}
            </div>
        </div>
    );
}
