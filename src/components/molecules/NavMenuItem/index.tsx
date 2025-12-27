import { NavLink } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import type { MenuItemProps } from "@mui/material/MenuItem";

interface NavMenuItemProps extends MenuItemProps {
  to: string;
  end?: boolean;
}

const NavMenuItem = ({ to, end, children, ...props }: NavMenuItemProps) => {
  return (
    <MenuItem
      component={NavLink}
      to={to}
      end={end}
      {...props}
      sx={{
        "&.active": {
          fontWeight: 700,
        },
        ...props.sx,
      }}
    >
      {children}
    </MenuItem>
  );
};

export default NavMenuItem;
