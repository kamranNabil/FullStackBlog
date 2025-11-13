import { IKImage } from "imagekitio-react";

const Image = ({ src, className, w, h, alt }) => {
  console.log("ImageKit URL:", import.meta.env.VITE_IK_URL_ENDPOINT);
  console.log("Image path:", src);

  // Check if src is a full URL or just a path
  const isFullUrl = src && (src.startsWith("http://") || src.startsWith("https://"));

  if (isFullUrl) {
    // If it's a full URL, use it directly as src
    return (
      <img
        src={src}
        className={className}
        alt={alt}
        width={w}
        height={h}
        loading="lazy"
      />
    );
  }

  // Otherwise use IKImage for paths
  return (
    <IKImage
      urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
      path={src}
      className={className}
      loading="lazy"
      lqip={{ active: true, quality: 20 }}
      alt={alt}
      width={w}
      height={h}
      transformation={[
        {
          width: w,
          height: h,
        }
      ]}
    />
  );
};

export default Image;