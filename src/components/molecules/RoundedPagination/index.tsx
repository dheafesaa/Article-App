import { Pagination, Box } from "@mui/material";

interface RoundedPaginationProps {
  page: number;
  count: number;
  onChange: (page: number) => void;
}

const RoundedPagination = ({
  page,
  count,
  onChange,
}: RoundedPaginationProps) => {
  return (
    <Box display="flex" justifyContent="center">
      <Pagination
        page={page}
        count={count}
        onChange={(_, value) => onChange(value)}
        variant="outlined"
        shape="rounded"
      />
    </Box>
  );
};

export default RoundedPagination;
