import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  linked?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: { img: "w-8 h-8", title: "text-sm", sub: "text-[10px]" },
  md: {
    img: "w-10 h-10 lg:w-12 lg:h-12",
    title: "text-base lg:text-lg",
    sub: "text-xs lg:text-sm",
  },
  lg: { img: "w-14 h-14", title: "text-xl", sub: "text-sm" },
};

export default function Logo({
  linked = true,
  size = "md",
  className = "",
}: LogoProps) {
  const s = sizes[size];

  const inner = (
    <span className={`flex items-center gap-2 flex-shrink-0 ${className}`}>
      <span
        className={`relative ${s.img} rounded-full overflow-hidden flex-shrink-0`}
      >
        <Image
          src="/assests/amin-logo.png"
          alt="Amin Organic Mart logo"
          fill
          className="object-cover"
          priority
        />
      </span>
      <span className="flex flex-col leading-tight">
        <span
          className={`font-bold text-primary-dark tracking-tight ${s.title}`}
        >
          Amin
        </span>
        <span
          className={`text-primary font-medium tracking-wide -mt-0.5 ${s.sub}`}
        >
          Organic Mart
        </span>
      </span>
    </span>
  );

  if (!linked) return inner;

  return (
    <Link href="/" aria-label="Amin Organic Mart – go to homepage">
      {inner}
    </Link>
  );
}
