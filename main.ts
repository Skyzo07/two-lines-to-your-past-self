import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "Tell your mother the truth in the hospital corridor before the doctor comes back.\n" +
  "You said \"I'm fine\" instead, and she died believing the lie you told to spare her.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Guard: the gate requires 1–280 chars of UTF-8 text and exactly two lines.
// Fail loudly instead of writing an invalid entry.
if (TEXT.length < 1 || TEXT.length > 280) {
  throw new Error(`entry text must be 1-280 chars, got ${TEXT.length}`);
}
const lines = TEXT.split("\n");
if (lines.length !== 2 || lines.some((l) => l.trim().length === 0)) {
  throw new Error(`entry text must be exactly two non-empty lines, got ${lines.length}`);
}
if (!/^[\x20-\x7E\n]*$/.test(TEXT)) {
  throw new Error("entry text must be plain ASCII text");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");
