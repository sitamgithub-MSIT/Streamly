import { Podcast } from "lucide-react";

interface ILogo {
  className?: string;
  onlyLogo?: boolean;
}

const Logo = ({ className, onlyLogo }: ILogo) => {
  return (
    <div
      className={`flex items-center gap-2 text-3xl text-white font-bold ${
        className ? className : ""
      }`}
    >
      <Podcast className="size-7 text-primary" />
      {!onlyLogo && (
        <h1>
          Stream<span className="text-primary">ly</span>
        </h1>
      )}
    </div>
  );
};

export default Logo;
