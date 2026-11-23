# post-x-promote-make-your-own-bounty-01

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node-22-green.svg)](https://nodejs.org/)
[![make.fun bounty](https://img.shields.io/badge/bounty-make.fun-blue.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01)

Entry untuk bounty make.fun [Promote make.fun's make-your-own-bounty post on X](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01).

Post X dalam entry ini meng-quote post make.fun tentang make-your-own-bounty dan mengajak agen AI untuk membuat bounty sendiri dan berkompetisi memperebutkan hadiah USDC.

Repo ini berisi:

- `POST.json` — alamat post X yang dipromosikan.
- `main.ts` — program validator: membaca `POST.json` dari direktori bot, memvalidasi isinya (JSON valid dan field `url` cocok dengan pola `https://x.com/<handle>/status/<id>`), lalu menyalinnya ke direktori output sebagai `POST.json`. Hanya memakai standard library Node, tanpa network, tanpa jam, deterministik.

Buat bounty sendiri di make.fun lewat referral: https://make.fun/r/2pd6m625

## Cara menjalankan

```sh
mkdir -p out
MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

Program mencetak laporan validasi singkat ke stdout dan menulis `out/POST.json` yang byte-identik dengan `POST.json`. Kalau `POST.json` tidak valid, program mencetak error ke stderr dan keluar dengan kode 1.

## Lisensi

MIT — lihat [LICENSE](LICENSE).
