# Agent Bay

<p align="center">
  <strong>अन्य भाषाएँ</strong><br>
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

**कोडिंग एजेंटों के लिए प्लग‑इन क्षमता मॉड्यूल** — Git से स्किल और नियम जोड़ें, अपग्रेड करें और विस्तारित करें; Cursor, Claude Code, Codex, GitHub Copilot आदि में।

---

## लक्ष्य

Agent Bay एक ओपन‑सोर्स टूल (योजना में) है जो टीमों और व्यक्तियों के लिए **बिखरी हुई एजेंट कॉन्फ़िगरेशन, कमज़ोर वर्ज़न नियंत्रण और मशीन बदलने पर सेटअप खो जाना** जैसी समस्याएँ हल करता है।

हम **Agent Skills** (खुला प्रारूप [`SKILL.md`](https://agentskills.io)) और **कोडिंग‑एजेंट नियम** (जैसे `.cursor/rules`, `AGENTS.md`) को **प्लग‑इन मॉड्यूल** मानते हैं:

1. **ऊर्ध्व अपग्रेड** — Git से क्षमता पैक खींचें या अपडेट करें, ताकि एजेंट को नए वर्कफ़्लो, मानक और डोमेन ज्ञान जल्दी मिले।
2. **क्षैतिज विस्तार** — एक ही मॉड्यूल को हर उत्पाद के मूल पथों (Cursor, Claude Code, Codex, Copilot, …) पर मैप करें, dotfiles हाथ से कॉपी किए बिना।
3. **ऑडिट योग्य सहयोग** — Git स्रोत‑सत्य है; डिस्क पर इंस्टॉल प्रतियाँ प्रबंधित आर्टिफैक्ट हैं, क्रमिक सिंक और सफ़ाई के साथ।
4. **स्किल बनाम नियम** — माँग पर **Skills** और हमेशा‑चालू या पथ‑स्कोप **Rules** अलग‑अलग ट्रैक पर, उद्योग के स्किल‑केंद्रित रुझान के साथ `alwaysApply` / globs जहाँ चाहिए वहीं।

Agent Bay **वेब क्रॉलर नहीं** है और सार्वजनिक skill रजistries (जैसे [skills.sh](https://skills.sh) / `npx skills`) **की जगह नहीं** लेता। यह **आपके Git रिपो** को **मॉड्यूल इंस्टॉल और मल्टी‑चैनल डिप्लॉय** के लिए प्राधिकरण मानता है।

---

## रूपक: बे (Bay)

रोबोट पर **विस्तार स्लॉट (bay)** की तरह: हर bay में एक क्षमता मॉड्यूल (skill पैक, rule टुकड़ा, या catalog बंडल)। बदलना, जोड़ना, अपग्रेड — **तेज़** और **दोहराने योग्य** होना चाहिए।

---

## स्थिति

**प्रारंभिक चरण** — यह रिपॉजिटरी लक्ष्य, समझौते और कार्यान्वयन परिभाषित करती है; API और CLI अभी स्थिर नहीं।

मॉड्यूल प्रारूप और सिंक semantics पर Issue / PR स्वागत है।

---

## दस्तावेज़ और सम्मेलन

- **अंग्रेज़ी** डिफ़ॉल्ट प्रवेश: [`README.md`](../README.md)। अन्य भाषाएँ इस निर्देशिका में `README.<locale>.md` (शीर्ष पर भाषा स्विचer)।
- **रख-रखाव** कलाकृतियाँ — स्रोत टिप्पणियाँ, `.cursor/rules`, `.cursor/skills` — **सरलीकृत चीनी** (简体中文) में, जब तक फ़ाइल किसी locale की उपयोगकर्ता दस्तावेज़ न हो।
- **संस्करण** [`package.json`](../package.json) में SemVer (`1.0.0` से); Git टैग `v` उपसर्ग। Release bump नियम `release` skill में।

---

## लिंक

- [Agent Skills specification](https://agentskills.io)
- [Anthropic example skills](https://github.com/anthropics/skills)

---

## लाइसेंस

[MIT](../LICENSE)

<!-- agent-bay-readme-locale:hi via readme-translations-write -->
