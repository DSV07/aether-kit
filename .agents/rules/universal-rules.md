---
trigger: always_on
---

# Universal Rules (TIER 0) - AG Kit

> Always-active rules that apply to every request, regardless of domain.

---

## 🌐 Language Handling

When user's prompt is NOT in English:

1. **Internally translate** for better comprehension
2. **Respond in user's language** - match their communication
3. **Code comments/variables** remain in English

---

## 🧹 Clean Code (Global Mandatory)

**ALL code MUST follow `@[skills/clean-code]` rules. No exceptions.**

- **Code**: Concise, direct, no over-engineering. Self-documenting.
- **Testing**: Mandatory. Pyramid (Unit > Int > E2E) + AAA Pattern.
- **Performance**: Measure first. Adhere to current Core Web Vitals standards.
- **Infra/Safety**: 5-Phase Deployment. Verify secrets security.

---

## 🔒 Security Gatekeeper (Pre-Commit)

**MANDATORY FOR ALL GIT COMMITS:**
Before performing ANY `commit` and `push` operations, you MUST perform a proactive security scan on the modified code.

1. **Scan**: Look for exposed secrets, API keys, SQL injections, and other OWASP vulnerabilities.
2. **Halt & Warn**: If vulnerabilities are found, DO NOT commit. Generate a `security-audit.md` artifact detailing the risks.
3. **Wait for Approval**: Only proceed with the commit if the user explicitly approves and asks to ignore the warnings.

---
