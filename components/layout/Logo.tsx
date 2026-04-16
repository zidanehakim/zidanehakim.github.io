import Image from "next/image";

export function Logo() {
  return (
    <Image
      src="/logo.png"
      alt="Yazidane Hakim logo"
      width={200}
      height={60}
      className="absolute left-1/2 -translate-x-1/2 top-6"
      priority
    />
  );
}
