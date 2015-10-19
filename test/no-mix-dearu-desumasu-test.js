import rule from "../src/no-mix-dearu-desumasu"
import TextLintTester from "textlint-tester";
var tester = new TextLintTester();
// ruleName, rule, expected[]
tester.run("no-mix-dearu-desumasu", rule, {
    valid: [
        "昨日はいい天気であったのだが、今日は悪天候である。",
        `今日はいい天気ですね。

そうですね。`,
        // 箇条書きは無視
        `
- 今日はいい天気ですね。
- 今日はいい天気である。
`

    ],
    invalid: [
        // 文末が混在してるとreportされる
        {
            text: `今日はいい天気ですね。
今日はいい天気である。
`,
            errors: [
                // 同数である場合は、"ですます"に統一するのを優先する
                {
                    message: `"である"調 と "ですます"調 が混在
=> "である。" がである調
Total:
である  : 1
ですます: 1
`,
                    line: 2,
                    column: 8
                }
            ]
        }
    ]
});