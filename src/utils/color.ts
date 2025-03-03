export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const getRandomPastelColor = (): string => {
  const randomChannel = () =>
    Math.floor(Math.random() * 128 + 127)
      .toString(16)
      .padStart(2, "0");
  const red = randomChannel();
  const green = randomChannel();
  const blue = randomChannel();
  return `#${red}${green}${blue}`;
};
