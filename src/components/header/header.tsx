"use client";
import Image from "next/image";
import LayoutContainer from "@/components/theme/LayoutContainer";

function Header() {
    const handleImageClick = () => {
        window.location.reload();
    };

    return (
        <header>
            <LayoutContainer>
                <nav className="flex items-center justify-between py-4" aria-label="Primary">
                    <div onClick={handleImageClick} className="cursor-pointer">
                        <Image src="/travis.jpg" alt="Travis Craft" width="100" height="100" className="rounded-[50%]" />
                    </div>
                    <a href='#about' className="text-2xl font-bold m-2">About</a>
                    <a href='#technologies' className="text-2xl font-bold m-2">Technologies</a>
                    <a href='#meetup' className="text-2xl font-bold m-2">Meetup</a>
                </nav>
            </LayoutContainer>
        </header>
    )
}

export default Header;
