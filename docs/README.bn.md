# Agent Bay

<p align="center">
  <strong>অন্যান্য ভাষায় পড়ুন</strong><br>
  <a href="../README.md">English</a> ·
  <a href="README.zh-CN.md">简体中文</a> ·
  <a href="README.hi.md">हिन्दी</a> ·
  <a href="README.es.md">Español</a> ·
  <a href="README.fr.md">Français</a> ·
  <a href="README.ar.md">العربية</a> ·
  <a href="README.bn.md">বাংলা</a> ·
  <a href="README.pt.md">Português</a> ·
  <a href="README.ru.md">Русский</a> ·
  <a href="README.ur.md">اردو</a>
</p>

# Agent Bay

**কোডিং এজেন্টের জন্য প্লাগ‑ইন ক্ষমতা মডিউল** — Git থেকে স্কিল ও নিয়ম যোগ, আপগ্রেড ও প্রসার; Cursor, Claude Code, Codex, GitHub Copilot ইত্যাদিতে।

---

## লক্ষ্য

Agent Bay একটি ওপেন‑সোর্স টুল (পরিকল্পনায়) যা দল ও ব্যক্তির **ছড়িয়ে থাকা এজেন্ট কনফিগ, দুর্বল ভার্সন নিয়ন্ত্রণ ও মেশিন বদলালে সেটআপ হারানো** সমস্যা মোকাবিলা করে।

আমরা **Agent Skills** (খোলা ফরম্যাট [`SKILL.md`](https://agentskills.io)) এবং **কোডিং‑এজেন্ট নিয়ম** (যেমন `.cursor/rules`, `AGENTS.md`) কে **প্লাগ‑ইন মডিউল** হিসেবে দেখি:

1. **উল্লম্ব আপগ্রেড** — Git থেকে ক্ষমতার প্যাক টেনে আনুন বা আপডেট করুন, এজেন্ট দ্রুত নতুন ওয়ার্কফ্লো, স্ট্যান্ডার্ড ও ডোমেইন জ্ঞান পায়।
2. **অনুভূমিক প্রসার** — একই মডিউল প্রতিটি প্রোডাক্টের নিজস্ব পথে (Cursor, Claude Code, Codex, Copilot, …) ম্যাপ করুন, dotfiles হাতে কপি না করে।
3. **অডিট‑যোগ্য সহযোগিতা** — Git সত্যের উৎস; ইনস্টল কপি পরিচালিত আর্টিফ্যাক্ট, ক্রমিক সিঙ্ক ও পরিষ্কারের সাথে।
4. **স্কিল বনাম নিয়ম** — চাহিদামাফিক **Skills** এবং স্থায়ী বা পথ‑ভিত্তিক **Rules** আলাদা ট্র্যাকে, শিল্পের স্কিল‑কেন্দ্রিক প্রবণতার সাথে `alwaysApply` / globs যেখানে দরকার।

Agent Bay **ওয়েব ক্রলার নয়** এবং পাবলিক skill রেজিস্ট্রি (যেমন [skills.sh](https://skills.sh) / `npx skills`) **প্রতিস্থাপন করে না**। এটি **আপনার Git রিপো**‑কে **মডিউল ইনস্টল ও মাল্টি‑channel ডিপ্লয়**‑এর কর্তৃত্ব হিসেবে ধরে।

---

## রূপক: বে (Bay)

রোবটের **এক্সপ্যানশন বে**‑র মতো: প্রতিটি bay‑তে একটি ক্ষমতা মডিউল (skill প্যাক, rule অংশ, বা catalog বান্ডিল)। বদল, যোগ, আপগ্রেড — **দ্রুত** ও **পুনরাবৃত্ত** হতে হবে।

---

## অবস্থা

**প্রাথমিক পর্যায়** — এই রিপো লক্ষ্য, convention ও বাস্তবায়ন সংজ্ঞায়িত করে; API ও CLI এখনও স্থিতিশীল নয়।

মডিউল ফরম্যাট ও সিঙ্ক semantics নিয়ে Issue / PR স্বাগত।

---

## নথি ও convention

- **ইংরেজি** ডিফল্ট প্রবেশ: [`README.md`](../README.md)। অন্যান্য ভাষা এই ডিরেক্টরিতে `README.<locale>.md` (উপরে ভাষা স্বিচer)।
- **রক্ষণাবেক্ষণ**-মুখী — সোর্স মন্তব্য, `.cursor/rules`, `.cursor/skills` — **সরলীকৃত চীনা** (简体中文)-তে, ব্যবহারকারী locale doc ছাড়া।
- **সংস্করণ** [`package.json`](../package.json)-এ SemVer (`1.0.0` থেকে); Git ট্যাগ `v` উপসর্গ। Release bump `release` skill-এ।

---

## লিংক

- [Agent Skills specification](https://agentskills.io)
- [Anthropic example skills](https://github.com/anthropics/skills)

---

## লাইসেন্স

[MIT](../LICENSE)

<!-- agent-bay-readme-locale:bn via readme-translations-write -->
