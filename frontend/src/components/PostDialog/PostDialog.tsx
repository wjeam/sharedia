import { Box, Dialog, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";

const PostDialog: FC<any> = ({ open, toggleOpen, media }) => {
  const [image, setImage] = useState<HTMLImageElement | undefined>(undefined);

  const handleOnClose = (_: any, reason: string) => {
    if (reason === "backdropClick") {
      toggleOpen(false, undefined);
    }
  };

  useEffect(() => {
    if (!!!media) return;
    const image = new Image();
    image.src = `https://localhost:4131/post/media/${media.id}`;
    setImage(image);
  }, [media]);

  return (
    <Dialog open={open} onClose={handleOnClose} maxWidth={false}>
      {media && image && (
        <img
          src={image?.src}
          style={{
            width: image.width * 0.7,
            height: image.height * 0.7,
          }}
        />
      )}
    </Dialog>
  );
};

export default PostDialog;
