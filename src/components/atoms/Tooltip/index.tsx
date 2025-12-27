import { styled } from "@mui/material/styles";
import MuiTooltip, {
  tooltipClasses,
  type TooltipProps,
} from "@mui/material/Tooltip";

const Tooltip = styled(({ className, ...props }: TooltipProps) => (
  <MuiTooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 12,
    borderRadius: 4,
    padding: "6px 8px",
  },
}));

export default Tooltip;
