import Image from "next/image";

interface IImageBadgeProps {
  imageSrc: string;
  text: string;
}

const ImageBadge = ({ imageSrc, text }: IImageBadgeProps) => {
  return (
    <div className="max-w-30">
      <Image
        className="mx-auto"
        src={imageSrc}
        width={32}
        height={38}
        alt="Badge"
      />
      <p className="text-center text-xs text-neutral-600 mt-2">{text}</p>
    </div>
  );
};

export default ImageBadge;
