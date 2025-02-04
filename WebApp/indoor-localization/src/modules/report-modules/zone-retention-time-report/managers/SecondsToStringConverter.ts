export function secondsToString(seconds: number): string {
  if (seconds < 0) {
    throw new Error("Seconds must be a non-negative number.");
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  let result = "";
  if (seconds < 60) {
    return seconds + "s";
  }

  if (hours > 0) {
    result += `${hours}h `;
  }
  if (minutes > 0) {
    result += `${minutes}m `;
  }
  return result.trim();
}
