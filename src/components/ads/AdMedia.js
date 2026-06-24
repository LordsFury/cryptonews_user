import Image from "next/image";

const AdMedia = ({
  ad,
  className = "object-cover",
  fill = true,
  sizes = "100vw",
  priority = false,
}) => {
  if (ad.mediaType === "video") {
    return (
      <video
        src={ad.mediaUrl}
        className={fill ? `absolute inset-0 h-full w-full ${className}` : className}
        autoPlay
        muted
        loop
        playsInline
      />
    );
  }

  return (
    <Image
      src={ad.mediaUrl}
      alt={ad.title}
      fill={fill}
      unoptimized
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
};

export default AdMedia;
