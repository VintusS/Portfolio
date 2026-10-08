import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const environment = path.join(root, ".mockup-venv");
const python = path.join(environment, process.platform === "win32" ? "Scripts/python.exe" : "bin/python");

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { cwd: root, stdio: "inherit", ...options });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status || 1);
}

if (!existsSync(python)) run(process.env.MOCKUP_PYTHON || "python3", ["-m", "venv", environment]);
const installed = spawnSync(python, ["-c", "import mockups, PIL, numpy"], { stdio: "ignore" });
if (installed.status !== 0) {
  run(python, ["-m", "pip", "install", "--no-cache-dir", "-r", "scripts/mockup-requirements.txt"]);
}
run(python, ["scripts/generate-mockups.py", ...process.argv.slice(2)]);
