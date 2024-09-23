"use client"
import Link from "next/link";
import Wrapper from "./wrapper";
import AvatarComp from "./avatar";
import { useState } from "react";

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="sticky top-0 h-[80px] z-50">
            <nav className="bg-white border-gray-200 dark:bg-gray-500">
                <Wrapper>
                    <div className="flex justify-between w-full items-center">
                        <Link href={'/'} className="flex items-center space-x-3 rtl:space-x-reverse">
                            <img src="https://www.svgrepo.com/show/439153/event-loop.svg" className="h-8" alt="Blog Logo" />
                            <span className="self-center text-2xl font-extrabold whitespace-nowrap dark:text-white">Eventism</span>
                        </Link>

                        {/* Hamburger icon for mobile screens */}
                        <button 
                            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            onClick={toggleMenu}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>

                       
                        <div className="hidden md:flex items-center space-x-8">
                           
                            
                            <Link href="/contact" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                                Contact
                            </Link>
                            <AvatarComp />
                        </div>
                    </div>

                   
                    {isMenuOpen && (
                        <div className="md:hidden">
                            <div className="space-y-2 p-4 bg-gray-100 dark:bg-gray-600">
                                <Link href="/about" className="block text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                                    About
                                </Link>
                                <Link href="/events" className="block text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                                    Events
                                </Link>
                                <Link href="/contact" className="block text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                                    Contact
                                </Link>
                                <AvatarComp />
                            </div>
                        </div>
                    )}
                </Wrapper>
            </nav>
        </div>
    );
};
