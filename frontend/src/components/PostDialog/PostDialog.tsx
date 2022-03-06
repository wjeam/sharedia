import { Dialog } from "@mui/material";
import { FC } from "react";

const PostDialog: FC<any> = ({ open }) => {
  return <Dialog open={open}></Dialog>;
};

export default PostDialog;
