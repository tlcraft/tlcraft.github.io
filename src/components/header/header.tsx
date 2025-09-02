import Image from "next/image";

function Header() {
    return (
        <div className="inline-flex items-center justify-between">
            <Image src="/travis.jpg" alt="Travis Craft" className="w-[20%] rounded-[50%]" />
            <a href='#about' className="text-2xl font-bold m-2">About</a>
            <a href='#technologies' className="text-2xl font-bold m-2">Technologies</a>
        </div>
    )
}

export default Header;
