export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatDate(date) {
  return new Date(date).toLocaleTimeString("UK-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatTime(time) {
  return (
    String(Math.floor(time / 60)).padStart(2, "0") +
    ":" +
    String(time % 60).padStart(2, "0")
  );
}
