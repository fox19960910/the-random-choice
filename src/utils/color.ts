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

// Hàm tính màu tương phản
export const getContrastYIQ = (hex: string): string => {
  
    // Xóa ký tự '#' nếu có
    hex = hex.replace('#', '');
    
    // Lấy giá trị RGB
    const r = (255 - parseInt(hex.substring(0, 2), 16)).toString(16).padStart(2, '0');
    const g = (255 - parseInt(hex.substring(2, 4), 16)).toString(16).padStart(2, '0');
    const b = (255 - parseInt(hex.substring(4, 6), 16)).toString(16).padStart(2, '0');
    
    // Trả về màu đảo ngược
    return `#${r}${g}${b}`
};
