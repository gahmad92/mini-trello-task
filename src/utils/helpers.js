// 1. Format seconds into HH:MM:SS
export const formatTime = (totalSeconds) => {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  return [hrs, mins, secs]
    .map(v => v < 10 ? "0" + v : v)
    .filter((v, i) => v !== "00" || i > 0) // Keep minutes and seconds always
    .join(":");
};

// 2. Generate a random color for avatars or tags
export const getRandomColor = () => {
  const colors = ['bg-blue-500', 'bg-purple-500', 'bg-emerald-500', 'bg-rose-500', 'bg-amber-500'];
  return colors[Math.floor(Math.random() * colors.length)];
};

// 3. Calculate percentage (useful for checklists)
export const calculateProgress = (total, completed) => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};