import Image from "next/image";

export default function DeveloperButton() {
  return (
    <div className="flex items-center rounded-full border border-border bg-background p-1 shadow shadow-black/5">
      <div className="flex -space-x-1.5">
        <Image
          className="rounded-full ring-1 ring-background"
          src="/avatar-80-03.jpg"
          width={20}
          height={20}
          alt="Avatar 01"
        />
        <Image
          className="rounded-full ring-1 ring-background"
          src="/avatar-80-04.jpg"
          width={20}
          height={20}
          alt="Avatar 02"
        />
        <Image
          className="rounded-full ring-1 ring-background"
          src="/avatar-80-05.jpg"
          width={20}
          height={20}
          alt="Avatar 03"
        />
        <Image
          className="rounded-full ring-1 ring-background"
          src="/avatar-80-06.jpg"
          width={20}
          height={20}
          alt="Avatar 04"
        />
      </div>
      <p className="px-2 text-xs text-muted-foreground">
        Trusted by <strong className="font-medium text-foreground">60K+</strong>{" "}
        developers.
      </p>
    </div>
  );
}
