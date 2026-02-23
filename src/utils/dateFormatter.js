// Utility function to format dates
export const formattedDate = (date) => {
  if (!date) return "";
  
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
