import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Validator POST.json untuk bounty make.fun
// post-x-promote-make-your-own-bounty-01.
// Membaca POST.json dari direktori bot, memvalidasi isinya, lalu menyalin
// byte-nya apa adanya ke direktori output sebagai POST.json.
// Hanya memakai standard library Node, tanpa network, tanpa jam/wall clock,
// deterministik: dua kali jalan menghasilkan byte output yang sama.

const URL_PATTERN =
  /^https:\/\/(x\.com|twitter\.com)\/[A-Za-z0-9_]+\/status\/[0-9]+$/;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

function main(): void {
  const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const inputPath = join(botDir, "POST.json");
  const outputPath = join(outputDir, "POST.json");

  let raw: Buffer;
  try {
    raw = readFileSync(inputPath);
  } catch {
    fail(`tidak bisa membaca ${inputPath}`);
  }

  let data: unknown;
  try {
    data = JSON.parse(raw.toString("utf8"));
  } catch {
    fail(`${inputPath} bukan JSON yang valid`);
  }

  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    fail("POST.json harus berisi satu objek JSON");
  }
  const record = data as { url?: unknown };
  if (typeof record.url !== "string") {
    fail('field "url" di POST.json harus berupa string');
  }
  if (!URL_PATTERN.test(record.url)) {
    fail(
      `field "url" tidak cocok dengan pola https://x.com/<handle>/status/<id>: ${record.url}`,
    );
  }

  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputPath, raw);

  console.log("OK: POST.json valid");
  console.log(`url: ${record.url}`);
  console.log(`output: ${outputPath}`);
}

main();
