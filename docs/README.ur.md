# Agent Bay

<p align="center">
  <strong>دیگر زبانوں میں پڑھیں</strong><br>
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

<p dir="rtl">

<strong>کوڈنگ ایجنٹس کے لیے پلگ‑ان صلاحیت ماڈیول</strong> — Git سے skills اور rules شامل، اپ گریڈ اور پھیلائیں؛ Cursor، Claude Code، Codex، GitHub Copilot وغیرہ میں۔

</p>

---

<p dir="rtl">

## مقاصد

Agent Bay ایک اوپن سورس ٹول (منصوبہ بندی میں) ہے جو ٹیموں اور افراد کے لیے <strong>بکھری ہوئی ایجنٹ کنفیگ، کمزور ورژن کنٹرول اور مشین بدلنے پر سیٹ اپ کھو جانا</strong> جیسے مسائل حل کرتا ہے۔

ہم <strong>Agent Skills</strong> (کھلا فارمیٹ <a href="https://agentskills.io"><code>SKILL.md</code></a>) اور <strong>کوڈنگ ایجنٹ rules</strong> (جیسے <code>.cursor/rules</code>، <code>AGENTS.md</code>) کو <strong>پلگ‑ان ماڈیول</strong> سمجھتے ہیں:

1. <strong>عمودی اپ گریڈ</strong> — Git سے صلاحیت کے پیک کھینچیں یا اپ ڈیٹ کریں تاکہ ایجنٹس جلد نئے workflow، معیارات اور ڈومین knowledge حاصل کریں۔
2. <strong>افقی پھیلاؤ</strong> — ایک ہی ماڈیول ہر پروڈکٹ کے native راستوں (Cursor، Claude Code، Codex، Copilot، …) پر map کریں، dotfiles ہاتھ سے کاپی کیے بغیر۔
3. <strong>آڈٹ کے قابل تعاون</strong> — Git سچائی کا ماخذ؛ انسٹال copies منظم artifacts، incremental sync اور صفائی کے ساتھ۔
4. <strong>Skills بمقابلہ Rules</strong> — demand پر <strong>Skills</strong> اور ہمیشہ یا path‑scoped <strong>Rules</strong> الگ tracks پر، صنعت کے skill رجحان کے ساتھ <code>alwaysApply</code> / globs جہاں درکار۔

Agent Bay <strong>ویب crawler نہیں</strong> اور عوامی skill registries (جیسے <a href="https://skills.sh">skills.sh</a> / <code>npx skills</code>) <strong>کی جگہ نہیں</strong> لیتا۔ یہ <strong>آپ کے Git repos</strong> کو <strong>ماڈیول انسٹال اور کثیر channel deploy</strong> کے authority کے طور پر دیکھتا ہے۔

</p>

---

<p dir="rtl">

## استعارہ: bay

ربوٹ پر <strong>توسیعی slot (bay)</strong> کی طرح: ہر bay میں ایک صلاحیت ماڈیول (skill pack، rule fragment، یا catalog bundle)۔ بدلنا، شامل کرنا، اپ گریڈ — <strong>تیز</strong> اور <strong>دہرانے کے قابل</strong> ہونا چاہیے۔

</p>

---

<p dir="rtl">

## حالت

<strong>ابتدائی مرحلہ</strong> — یہ repo مقاصد، conventions اور implementation متعین کرتی ہے؛ API اور CLI ابھی stable نہیں۔

ماڈیول formats اور sync semantics پر Issue / PR خوش آمدید۔

</p>

---

<p dir="rtl">

## لنکس

- <a href="https://agentskills.io">Agent Skills specification</a>
- <a href="https://github.com/anthropics/skills">Anthropic example skills</a>

</p>

---

<p dir="rtl">

## لائسنس

<a href="../LICENSE">MIT</a>

</p>
