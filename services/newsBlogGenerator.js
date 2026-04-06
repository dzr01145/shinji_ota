import { PERSONAL_INFO } from '../constants.js';

/**
 * Firecrawl で取得したニュースを太田真治氏の専門的視点でブログ化するサービス (Vanilla JS 版)
 */
export const generateNewsBlogDraft = async (newsMarkdown, genAIModel) => {
  if (!newsMarkdown) {
    throw new Error('newsMarkdown is empty. Cannot generate blog.');
  }

  const prompt = `
あなたは以下の人物（太田 真治）として、提供された最新ニュースに基づく専門的なブログ記事を執筆してください。

【著者プロフィール: 太田 真治 / Shinji Ota】
${PERSONAL_INFO.about}
肩書き: ${PERSONAL_INFO.title}
専門性: 技術士（総合技術監理・資源工学）、リスクエンジニア。

【インプット: 最新ニュース (一次ソース)】
${newsMarkdown}

【執筆の要件】
1. タイトル: ニュースの事実だけでなく、読者（経営層や現場管理者）が「リスク」「対策」を具体的にイメージできる、インパクトのある日本語タイトルにしてください。
2. 構成:
   - はじめに: ニュースの要点。
   - コンサルタントの眼: 今回の事例/改正が「現場」に与える実務的な影響や、見落とされがちなリスクの本質的分析。
   - 現場でのアクションプラン: 今すぐ現場で実践すべき具体的なリスク低減策や PDCA サイクルへの反映など。
   - まとめ: 太田真治としての力強いメッセージ。
3. トーン: 「現場のリアル」を知っているプロフェッショナルな語り口。誠実、論理的、かつ情熱的。
4. 形式: JSON形式のみで出力してください（マークダウン本文は body フィールドに格納）。
{
  "title": "記事タイトル",
  "body": "Markdown本文",
  "category": "労働安全衛生",
  "tags": ["タグ1", "タグ2"]
}
`;

  const result = await genAIModel.generateContent(prompt);
  const responseText = result.response.text();
  const cleanJson = responseText.replace(/```json\n?|\n?```/g, '').trim();
  return JSON.parse(cleanJson);
};
