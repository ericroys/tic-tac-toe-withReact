import { createElement } from "react";
import { IconBaseProps, IconType } from "react-icons";

export type IconProps = {
    className?: string
    icon: IconType;
    size?: number;
}

export default function StyledIcon ( {icon, className, size}:IconProps ) {
  const p:IconBaseProps = {}
  p.className = (className)? className : undefined;
  p.size = size ? size : undefined;
    return createElement(icon, p);
}