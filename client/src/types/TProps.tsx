import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import { type TPosts } from "./TPosts";
import type React from "react";

export type TPropsButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: string;
  className?: string;
};

export type TPropsPost = {
  post: TPosts;
  onClick: () => void;
};

export type TModal = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface TPropsInput extends InputHTMLAttributes<HTMLInputElement> {
  classProps?: string;
}

export type TPropsSpan = {
  children?: string;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
};

export type TPropProtectorRoute = {
  children: ReactNode;
  redirectTo?: string;
};
