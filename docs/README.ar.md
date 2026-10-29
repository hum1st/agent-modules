# Agent Bay

<p align="center">
  <strong>اقرأ بلغات أخرى</strong><br>
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

<p dir="rtl">

<strong>وحدات قدرات قابلة للتركيب لوكلاء البرمجة</strong> — أضِف وحدّث ووسّع المهارات والقواعد من Git عبر Cursor وClaude Code وCodex وGitHub Copilot وغيرها.

</p>

---

<p dir="rtl">

## الأهداف

Agent Bay أداة مفتوحة المصدر (قيد التخطيط) لمعالجة <strong>تشتت إعداد الوكلاء، ضعف التحكم بالإصدارات، وفقدان الإعداد عند تغيير الجهاز</strong> للفرق والأفراد الذين يستخدمون عدة وكلاء برمجة.

نعامل <strong>Agent Skills</strong> (صيغة مفتوحة <a href="https://agentskills.io"><code>SKILL.md</code></a>) و<strong>قواعد الوكلاء</strong> (مثل <code>.cursor/rules</code>، <code>AGENTS.md</code>) ك<strong>وحدات قابلة للتركيب</strong>:

1. <strong>ترقية رأسية</strong> — سحب أو تحديث حزم القدرات من Git ليتبنى الوكلاء سير عمل ومعايير ومعرفة مجال بسرعة.
2. <strong>امتداد أفقي</strong> — ربط نفس الوحدات بمسارات كل منتج الأصلية (Cursor، Claude Code، Codex، Copilot، …) دون نسخ dotfiles يدوياً.
3. <strong>تعاون قابل للتدقيق</strong> — Git مصدر الحقيقة؛ النسخ المثبتة artifacts مُدارة مع مزامنة تدريجية وتنظيف.
4. <strong>Skills مقابل Rules</strong> — <strong>Skills</strong> عند الطلب و<strong>Rules</strong> دائمة أو حسب المسار على مسارات منفصلة، بما يتوافق مع اتجاه الصناعة نحو skills مع الإبقاء على <code>alwaysApply</code> / globs حيث يلزم.

Agent Bay <strong>ليس</strong> زاحف ويب و<strong>لا يحل</strong> محل سجلات skills العامة (مثل <a href="https://skills.sh">skills.sh</a> / <code>npx skills</code>). يركز على <strong>مستودعات Git الخاصة بك</strong> كمرجع ل<strong>تثبيت الوحدات ونشرها عبر قنوات وكلاء متعددة</strong>.

</p>

---

<p dir="rtl">

## استعارة: الخليج (Bay)

ك<strong>فتحات توسعة (bay)</strong> على روبوت: كل bay تحمل وحدة قدرة (حزمة skill، جزء rule، أو catalog). الاستبدال والإضافة والترقية يجب أن تكون <strong>سريعة</strong> و<strong>قابلة للتكرار</strong>.

</p>

---

<p dir="rtl">

## الحالة

<strong>مرحلة مبكرة</strong> — هذا المستودع يحدد الأهداف والاتفاقيات والتنفيذ؛ واجهات API وCLI غير مستقرة بعد.

Issues وPR مرحب بها حول صيغ الوحدات ودلالات المزامنة.

</p>

---

<p dir="rtl">

## التوثيق والاتفاقيات

- **الإنجليزية** هي المدخل الافتراضي: <a href="../README.md">README.md</a>. اللغات الأخرى في هذا المجلد كـ <code>README.&lt;locale&gt;.md</code> (مبدّل اللغة أعلى الصفحة).
- محتوى **للم maintainers** — تعليقات الكود، <code>.cursor/rules</code>، <code>.cursor/skills</code> — ب<strong>الصينية المبسّطة</strong> (简体中文) ما لم يكن الملف توثيق مستخدم بلغة أخرى.
- **الإصدارات** SemVer في <a href="../package.json">package.json</a> (من <code>1.0.0</code>)؛ وسوم Git ببادئة <code>v</code>. قواعد bump في skill <code>release</code>.

</p>

---

<p dir="rtl">

## روابط

- <a href="https://agentskills.io">مواصفة Agent Skills</a>
- <a href="https://github.com/anthropics/skills">مهارات Anthropic نموذجية</a>

</p>

---

<p dir="rtl">

## الترخيص

<a href="../LICENSE">MIT</a>

</p>

<!-- agent-bay-readme-locale:ar via readme-translations-write -->
