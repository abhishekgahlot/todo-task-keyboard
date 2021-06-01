export const moveDown = (currentIndex, todosLength) => {
  const nextIdx = currentIndex + 1;
  if (nextIdx < todosLength) {
    return nextIdx;
  }
  return currentIndex;
};

export const moveUp = currentIndex => {
  const nextIdx = currentIndex - 1;
  if (nextIdx >= -1) {
    return nextIdx;
  }
  return currentIndex;
};
