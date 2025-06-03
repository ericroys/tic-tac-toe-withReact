import { createElement } from "react";
import { IconBaseProps, IconType } from "react-icons";

export type IconProps = {
    className?: string
    icon: IconType;
}

export default function StyledIcon ( {icon, className}:IconProps ) {
  const p:IconBaseProps = {}
  p.className = (className)? className : undefined;
    return createElement(icon, p);
}