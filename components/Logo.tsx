import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  height?: number;
  href?: string | null;
  priority?: boolean;
}

const LOGO_RATIO = 1024 / 405;

export default function Logo({
  className = "",
  height = 48,
  href = "/",
  priority = false,
}: LogoProps) {
  const width = Math.round(height * LOGO_RATIO);

  const image = (
    <Image
      src="/logo-fastjob.jpg"
      alt="FAST JOB"
      width={width}
      height={height}
      priority={priority}
      className={`block h-auto w-auto object-contain ${className}`}
      style={{ height, width: "auto", maxWidth: width }}
    />
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex shrink-0 items-center leading-none">
        {image}
      </Link>
    );
  }

  return <span className="inline-flex shrink-0 items-center">{image}</span>;
}
