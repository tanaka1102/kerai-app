import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { addCoins, addMission } from "@/lib/db";
import { randomUUID } from "crypto";

// 事務（ブン子）タスクテンプレートエンジン
// フェーズ2 MVP: テンプレートベースの処理
// フェーズ3で実際のAI API（Claude/OpenAI）に差し替え予定

type MissionRequest = {
  keraiName: string;
  keraiRole: string;
  taskType: string;
  detail: string;
};

function generateBunkoResponse(taskType: string, detail: string): string {
  const trimmed = detail.trim();

  switch (taskType) {
    case "請求書・書類作成":
      return `かしこまりました、殿。書類の下書きをご用意いたしました。

---

【${trimmed || "書類"}】

作成日：${new Date().toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" })}

件名：${trimmed || "ご確認の件"}

本文：
いつもお世話になっております。
このたびは標記の件につきまして、ご連絡申し上げます。

${trimmed ? `ご依頼内容：\n${trimmed}` : "（内容をご記入ください）"}

ご確認のほど、よろしくお願い申し上げます。

---

ご確認いただき、必要に応じてご修正をお願いいたします。`;

    case "メール文作成":
      return `かしこまりました、殿。メール文面をご用意いたしました。

---

件名：${trimmed ? trimmed.slice(0, 30) + "の件" : "ご連絡"}

本文：
お世話になっております。

${trimmed || "内容をご記入ください。"}

お手数をおかけいたしますが、どうぞよろしくお願い申し上げます。

---

送信前にご確認ください。宛先・署名の追加もお忘れなく。`;

    case "議事録・まとめ":
      return `かしこまりました、殿。議事録の書式でまとめました。

---

【議事録】

日時：${new Date().toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" })}
場所：（ご記入ください）
参加者：（ご記入ください）

■ 議題
${trimmed || "（議題をご記入ください）"}

■ 決定事項
・（ご記入ください）

■ 次回アクション
・（担当者・期日をご記入ください）

■ 次回予定
日時：（ご記入ください）

---

内容をご確認のうえ、不足箇所をご補足ください。`;

    case "スケジュール調整":
      return `かしこまりました、殿。日程調整メールの文面をご用意いたしました。

---

件名：日程調整のお願い

本文：
お世話になっております。

${trimmed || "打ち合わせ"}の日程について、下記の候補日はいかがでしょうか。

【候補日時】
・（日時をご記入ください）
・（日時をご記入ください）
・（日時をご記入ください）

ご都合のよろしい日時をお知らせいただけますと幸いです。
場所・オンライン等はご都合に合わせて調整いたします。

ご検討のほど、よろしくお願い申し上げます。

---

候補日をご記入の上、送信してください。`;

    case "データ整理・リスト作成":
      return `かしこまりました、殿。データ整理のフォーマットをご用意いたしました。

---

【${trimmed || "データリスト"}】
作成日：${new Date().toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" })}

| No. | 項目 | 内容 | 備考 |
|-----|------|------|------|
|  1  |      |      |      |
|  2  |      |      |      |
|  3  |      |      |      |

---

このフォーマットにデータをご入力ください。
ExcelやNotionにそのまま貼り付けてご活用いただけます。`;

    default:
      return `かしこまりました、殿。ご依頼の内容を確認いたしました。

---

【ご依頼内容】
${trimmed || "（内容が未入力です）"}

---

こちらの内容について、より詳しい情報をいただけますでしょうか。

例えば：
・対象となる相手（取引先・社内など）
・使用する場面・目的
・希望の形式（メール・書類・リストなど）

詳細をいただければ、より精度の高い結果をご用意いたします。`;
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body: MissionRequest = await req.json();
  const { keraiName, keraiRole, taskType, detail } = body;

  if (!taskType || taskType.trim() === "") {
    return NextResponse.json({ error: "taskType is required" }, { status: 400 });
  }

  // MVP: 事務（ブン子）のみ実装
  // 他キャラへの拡張はフェーズ3で対応
  let result: string;
  if (keraiRole === "事務") {
    result = generateBunkoResponse(taskType, detail ?? "");
  } else {
    result = `${keraiName}はただいま準備中です。事務担当のブン子にお任せいただけますか？`;
  }

  // 小判報酬計算（タスク種別で変動）
  const coinReward = taskType === "データ整理・リスト作成" ? 80 : 50;
  const completedAt = new Date().toISOString();
  const userId = (session.user as { id?: string }).id ?? session.user?.email ?? "anonymous";

  // DB永続化（Redis）
  try {
    await Promise.all([
      addCoins(userId, coinReward),
      addMission(userId, {
        id: randomUUID(),
        keraiName,
        keraiRole,
        taskType,
        completedAt,
        coinReward,
      }),
    ]);
  } catch {
    // Redis障害時もレスポンスは返す（サービス継続優先）
  }

  return NextResponse.json({
    result,
    coinReward,
    keraiName,
    taskType,
    completedAt,
  });
}
