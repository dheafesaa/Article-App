import { forwardRef } from "react";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";

import { navButtonSx } from "@/theme/button.customize";

type NavButtonProps = Omit<ButtonProps, "sx"> & {
  to: string;
};

const NavButton = forwardRef<HTMLButtonElement, NavButtonProps>(
  ({ to, variant = "text", ...props }, ref) => {
    return (
      <Button
        ref={ref}
        component={NavLink}
        to={to}
        variant={variant}
        sx={navButtonSx}
        {...props}
      />
    );
  }
);

NavButton.displayName = "NavButton";

export default NavButton;
