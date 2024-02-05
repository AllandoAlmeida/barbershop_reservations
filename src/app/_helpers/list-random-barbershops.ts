export const ListRandomBarbershops = (array: any) => {
  const ListShuffledBarbershops = [...array];
  for (let i = ListShuffledBarbershops.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ListShuffledBarbershops[i], ListShuffledBarbershops[j]] = [
      ListShuffledBarbershops[j],
      ListShuffledBarbershops[i],
    ];
  }
  return ListShuffledBarbershops;
};
