function isSingleEmoji(emoji) {
  const baseEmoji = emoji.replace(/[\u{1F3FB}-\u{1F3FF}\u{FE0F}]/gu, "");
  return !baseEmoji.includes("\u200D") && Array.from(baseEmoji).length === 1;
}

export function generateSingleEmoji() {
  let emoji;
  do {
    emoji = randomUnicodeEmoji.random({ count: 1 })[0];
  } while (!isSingleEmoji(emoji));
  return emoji;
}
