import { Navbar } from "@/components/navbar";
import React from "react";
import SearchBlog from "./search/page";

export default function Template({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <div>
            <Navbar />
            
            {children}
        </div>
    )
}