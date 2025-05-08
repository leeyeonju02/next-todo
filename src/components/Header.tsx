import { Cinzel } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"] });

export default function Header() {
  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
  });

  const formattedDate = today.replace(
    /(\d{4})\.(\d{2})\.(\d{2})\s(\S+)/,
    "$1.$2.$3 $4"
  );

  return (
    <header
      className={`p-4 text-xl flex justify-center items-center ${cinzel.className}`}
    >
      <div className="text-center">{formattedDate}</div>
    </header>
  );
}
