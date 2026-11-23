// Dad Joke Showdown — make.fun bounty
// One dad joke, a single sentence of at most 200 characters.
// Writes the joke to /output/entry.txt (no trailing newline).

import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const JOKE =
  "I asked the mirror why I look so tired, and it said it was just reflecting on my choices.";

const OUTPUT_PATH = process.env.ENTRY_OUTPUT || "/output/entry.txt";

// The turn: a mirror that "reflects" is doing its literal job — until the
// last two words reveal it has been thinking over the speaker's life
// choices. The joke lands on the double meaning of "reflecting": the glass
// bounces back a tired face, and the dad in the joke hears a verdict.
function validateLine(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`Line must be 1-200 characters, got ${line.length}.`);
  }

  if (line.includes("\n")) {
    throw new Error("Line must be a single line.");
  }

  if (/[\u0000-\u001F\u007F]/.test(line)) {
    throw new Error("Line must not contain control characters.");
  }

  if (line.trim().length === 0) {
    throw new Error("Line must not be only whitespace.");
  }
}

validateLine(JOKE);

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, JOKE, "utf8");
chmodSync(OUTPUT_PATH, 0o644);

console.log(`Wrote ${JOKE.length} characters to ${OUTPUT_PATH}`);
