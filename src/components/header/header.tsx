import Image from "next/image";

function Header() {
    return (
        <div className="flex items-center justify-between">
            <Image src="/travis.jpg" alt="Travis Craft" width="100" height="100" className="rounded-[50%]" />
            <a href='#about' className="text-2xl font-bold m-2">About</a>
            <a href='#technologies' className="text-2xl font-bold m-2">Technologies</a>
        </div>
    )
}

export default Header;
