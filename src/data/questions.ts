/**
 * 質問データ - 50問
 * 性格分類アルゴリズムのためのデータ収集用
 */

export interface Question {
  id: number;
  ja: string;
  en: string;
}

export const questions: Question[] = [
  {
    id: 1,
    ja: '社交的な集まりよりも、一人で静かに過ごす方が好きだ。',
    en: 'I prefer spending time alone quietly rather than attending social gatherings.',
  },
  {
    id: 2,
    ja: '初対面の人と話すとき、自分から話題を切り出すことが多い。',
    en: 'When meeting someone for the first time, I often initiate conversation topics.',
  },
  {
    id: 3,
    ja: '感情の起伏が激しく、気分が変わりやすい方だ。',
    en: 'I have strong emotional fluctuations and my mood changes easily.',
  },
  {
    id: 4,
    ja: '小さな失敗やミスでも、長い間気に病んでしまう。',
    en: 'Even small failures or mistakes bother me for a long time.',
  },
  {
    id: 5,
    ja: '新しい分野の知識や、難解な理論に強い関心がある。',
    en: 'I have a strong interest in knowledge of new fields and complex theories.',
  },
  {
    id: 6,
    ja: '慣れた方法やルーティンを、できるだけ変えたくない。',
    en: 'I prefer not to change familiar methods or routines as much as possible.',
  },
  {
    id: 7,
    ja: '他人の気持ちを理解し、共感することが得意だ。',
    en: 'I am good at understanding and empathizing with others\' feelings.',
  },
  {
    id: 8,
    ja: 'グループで意見が対立したとき、自分の主張を曲げない。',
    en: 'When opinions clash in a group, I stick to my own position.',
  },
  {
    id: 9,
    ja: '物事の細部にこだわり、完璧主義な傾向がある。',
    en: 'I pay attention to details and tend to be a perfectionist.',
  },
  {
    id: 10,
    ja: '部屋や机の上が散らかっていても、特に気にならない。',
    en: 'I don\'t particularly mind if my room or desk is messy.',
  },
  {
    id: 11,
    ja: '積極的に人前で発言することに喜びを感じる。',
    en: 'I feel joy in actively speaking in front of people.',
  },
  {
    id: 12,
    ja: '自分は他の人よりも不安を感じやすいタイプだと思う。',
    en: 'I think I am more prone to anxiety than others.',
  },
  {
    id: 13,
    ja: '哲学や科学など、抽象的な議論が好きだ。',
    en: 'I enjoy abstract discussions such as philosophy and science.',
  },
  {
    id: 14,
    ja: '人助けをすることに、大きな充実感を覚える。',
    en: 'I feel great fulfillment in helping others.',
  },
  {
    id: 15,
    ja: '計画を立てずに旅行に出かける方が楽しい。',
    en: 'I find it more enjoyable to travel without making plans.',
  },
  {
    id: 16,
    ja: '過去の失敗を思い出し、後悔することがよくある。',
    en: 'I often remember past failures and feel regret.',
  },
  {
    id: 17,
    ja: '芸術作品や音楽に触れる時間を大切にしている。',
    en: 'I value time spent experiencing art and music.',
  },
  {
    id: 18,
    ja: '自分の意見が否定されると、強い怒りを感じる。',
    en: 'I feel strong anger when my opinions are denied.',
  },
  {
    id: 19,
    ja: '複数のことを同時にこなすのが得意だ。',
    en: 'I am good at handling multiple things at the same time.',
  },
  {
    id: 20,
    ja: '人の注目を集めるような行動は避けたい。',
    en: 'I want to avoid actions that attract attention from others.',
  },
  {
    id: 21,
    ja: '欲しいものを見つけると、事前に調べずにすぐ買うことが多い。',
    en: 'When I find something I want, I often buy it immediately without researching first.',
  },
  {
    id: 22,
    ja: '大きなタスクは、最初から細かく計画を立ててから実行する。',
    en: 'For large tasks, I create detailed plans from the start before executing.',
  },
  {
    id: 23,
    ja: '約束の時間に遅れることは、ほとんどない。',
    en: 'I rarely arrive late to appointments.',
  },
  {
    id: 24,
    ja: '失敗のリスクがあっても、新しいことに挑戦したい。',
    en: 'Even if there\'s a risk of failure, I want to try new things.',
  },
  {
    id: 25,
    ja: '面倒な作業でも、一度始めたら最後までやり遂げる。',
    en: 'Even with tedious work, once I start, I see it through to the end.',
  },
  {
    id: 26,
    ja: '読書や勉強中、すぐにスマートフォンを見てしまう。',
    en: 'While reading or studying, I quickly check my smartphone.',
  },
  {
    id: 27,
    ja: '友人に誘われたら、内容を問わず断ることは少ない。',
    en: 'When invited by friends, I rarely decline regardless of what it is.',
  },
  {
    id: 28,
    ja: '自分の目標を達成するためなら、他者と競い合うことを厭わない。',
    en: 'To achieve my goals, I don\'t mind competing with others.',
  },
  {
    id: 29,
    ja: '趣味や娯楽への支出は、予算をオーバーしても許容する。',
    en: 'I accept exceeding my budget for hobbies and entertainment.',
  },
  {
    id: 30,
    ja: '仕事や学業で、締め切り直前の方が集中力が高まる。',
    en: 'For work or studies, my concentration increases right before deadlines.',
  },
  {
    id: 31,
    ja: '重要な決断は、他人の意見を聞かずに自分で決める。',
    en: 'I make important decisions by myself without listening to others\' opinions.',
  },
  {
    id: 32,
    ja: '自分が間違っていると思ったら、すぐに誤りを認める。',
    en: 'If I think I\'m wrong, I immediately admit my mistake.',
  },
  {
    id: 33,
    ja: '誰かに作業を依頼するとき、細かく手順を指定する。',
    en: 'When delegating work to someone, I specify detailed procedures.',
  },
  {
    id: 34,
    ja: '困難な状況でも、ポジティブな面を見つけることができる。',
    en: 'Even in difficult situations, I can find positive aspects.',
  },
  {
    id: 35,
    ja: '待ち時間が長いのが苦手で、すぐにイライラしてしまう。',
    en: 'I dislike long waiting times and get frustrated quickly.',
  },
  {
    id: 36,
    ja: '友人から急な誘いがあっても、予定を優先して断る。',
    en: 'Even with sudden invitations from friends, I prioritize my schedule and decline.',
  },
  {
    id: 37,
    ja: '過去に経験したことがない料理を好んで注文する。',
    en: 'I prefer to order dishes I have never tried before.',
  },
  {
    id: 38,
    ja: '複雑な説明よりも、単純で分かりやすい説明を好む。',
    en: 'I prefer simple and clear explanations over complex ones.',
  },
  {
    id: 39,
    ja: '自分の意見に反論されると、防御的になってしまう。',
    en: 'When my opinions are challenged, I become defensive.',
  },
  {
    id: 40,
    ja: '人間関係でトラブルが起きると、自分から解決に動く。',
    en: 'When relationship troubles arise, I take initiative to resolve them.',
  },
  {
    id: 41,
    ja: '自分のスマートフォンにインストールされているアプリの数を正確に覚えている。',
    en: 'I accurately remember the number of apps installed on my smartphone.',
  },
  {
    id: 42,
    ja: '公平性を保つためなら、個人的な感情は無視すべきだ。',
    en: 'To maintain fairness, personal feelings should be ignored.',
  },
  {
    id: 43,
    ja: '「自由」と「平等」では、「自由」の方が社会にとって重要である。',
    en: 'Between "freedom" and "equality," "freedom" is more important for society.',
  },
  {
    id: 44,
    ja: 'このアンケートの質問の中に、矛盾しているものがあった。',
    en: 'There were contradictory questions in this survey.',
  },
  {
    id: 45,
    ja: '私は、今日の天気予報を午前中に確認した。',
    en: 'I checked today\'s weather forecast in the morning.',
  },
  {
    id: 46,
    ja: '科学技術の進歩は、最終的に地球の環境問題を解決する。',
    en: 'Scientific and technological progress will ultimately solve Earth\'s environmental problems.',
  },
  {
    id: 47,
    ja: 'Aという人がBという人を助けたが、結果的に悪いことが起きた。Aの行動は間違っていた。',
    en: 'Person A helped person B, but something bad happened as a result. A\'s action was wrong.',
  },
  {
    id: 48,
    ja: '私は、最近の政治ニュースの主要なテーマを3つ挙げられる。',
    en: 'I can name three major themes in recent political news.',
  },
  {
    id: 49,
    ja: '100円の損を避けるためなら、10分の労力を費やす。',
    en: 'I would spend 10 minutes of effort to avoid losing 100 yen.',
  },
  {
    id: 50,
    ja: 'アンケートに答えることは、社会貢献になると感じている。',
    en: 'I feel that answering surveys contributes to society.',
  },
];

export const TOTAL_QUESTIONS = questions.length;
