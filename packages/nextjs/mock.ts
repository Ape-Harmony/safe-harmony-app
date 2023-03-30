export const safeMock = Array.apply(null, Array(5)).map((x, i) => ({
  name: `Safe${i}`,
  id: `0x${i}`,
  imgSrc: "",
  description: `Safe${i} desc`,
  isLocked: false,
  owner: "0x123",
  user: "0x456",
}));
