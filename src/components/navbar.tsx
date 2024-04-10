
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";



export const Navbar = () => {
    return (
        <nav
            id="header-menu"
            className="sticky flex items-center justify-evenly top-0 z-30 h-[72px] bg-gray-100/50 dark:bg-gray-900/25 backdrop-blur backdrop-filter"
        >
            <ul className="flex items-center gap-4">
                <li>
                    <Link className="" href={'/'}>
                        Home
                    </Link>

                </li>
            </ul>

            <ThemeToggle/>
        </nav>
    );
}
