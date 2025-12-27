import Box from "@mui/material/Box";

type ImageItem = {
  id: string;
  src: string;
  alt?: string;
};

type ImageMasonryProps = {
  images: {
    left: ImageItem;
    centerTop: ImageItem;
    centerBottom: ImageItem;
    right: ImageItem;
  };
};

export default function ImageMasonry({ images }: ImageMasonryProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "1fr 1fr 1fr",
        },
        gap: 3,
      }}
    >
      <ImageCard image={images.left} height={{ md: 520 }} />
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: {
            xs: "auto",
            md: "1fr 1fr",
          },
          gap: 3,
        }}
      >
        <ImageCard image={images.centerTop} height={{ md: 250 }} />
        <ImageCard image={images.centerBottom} height={{ md: 250 }} />
      </Box>
      <ImageCard image={images.right} height={{ md: 520 }} />
    </Box>
  );
}

function ImageCard({
  image,
  height,
}: {
  image: ImageItem;
  height?: { md?: number };
}) {
  return (
    <Box
      sx={{
        width: "100%",
        height: {
          xs: 220,
          md: height?.md,
        },
        borderRadius: 1.5,
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src={image.src}
        alt={image.alt ?? ""}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </Box>
  );
}
