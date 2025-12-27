export const formatDate = (date: string | Date | null | undefined): string => {
  if (!date) return "-";

  const d = typeof date === "string" ? new Date(date) : date;

  if (Number.isNaN(d.getTime())) return "-";

  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};
