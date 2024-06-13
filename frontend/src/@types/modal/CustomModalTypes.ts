import { ReactNode } from "react";

export interface CustomModalProps {
  show: boolean;
  handleClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}
