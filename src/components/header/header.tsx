import Image from "next/image";
import LayoutContainer from "@/components/theme/LayoutContainer";

function Header() {
    return (
        <LayoutContainer>
            <div className="flex items-center justify-between py-4">
                <Image src="/travis.jpg" alt="Travis Craft" width="100" height="100" className="rounded-[50%]" />
                <a href='#about' className="text-2xl font-bold m-2">About</a>
                <a href='#technologies' className="text-2xl font-bold m-2">Technologies</a>
            </div>
        </LayoutContainer>
    )
}

export default Header;
