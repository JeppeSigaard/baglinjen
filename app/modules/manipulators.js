export function scroll(to, duration, elem) {
  if (elem.scrollTop == to) return;
  const diff = to - elem.scrollTop;
  const scrollStep = Math.PI / (duration / 10);
  let count = 0;
  let currPos;
  const start = elem.scrollTop;
  let scrollInterval = setInterval(function() {
    const top = elem.scrollTop;
    if (top !== to) {
      count = count + 1;
      currPos = start + diff * (0.5 - 0.5 * Math.cos(count * scrollStep));
      elem.scrollTop = currPos;
    } else {
      clearInterval(scrollInterval);
    }
  }, 10);

  setTimeout(() => {
    clearInterval(scrollInterval);
  }, duration + 10);
}
