'use client';

interface ResultPageProps {
  username: string;
  type: string;
  onRestart: () => void;
}

export default function ResultPage({ username, type, onRestart }: ResultPageProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Your Type 診断結果',
          text: `${username}さんのタイプは ${type} です！`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('共有がキャンセルされました');
      }
    } else {
      alert('このブラウザは共有機能に対応していません');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[var(--color-pink-light)] via-[var(--color-yellow-light)] to-[var(--color-blue-light)]">
      <div className="w-full max-w-2xl p-8">
        <div className="bg-white rounded-3xl shadow-2xl p-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl text-gray-600 mb-4">{username} さんのタイプは</h2>
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-blue-light)] to-[var(--color-green-light)] mb-8">
              {type}
            </h1>
          </div>

          <div className="bg-gradient-to-r from-[var(--color-yellow-light)] to-[var(--color-pink-light)] rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">タイプの特徴</h3>
            <p className="text-gray-700 leading-relaxed">
              このタイプの詳細な説明がここに入ります。あなたの性格や傾向、強みや弱みなどを詳しく解説します。バックエンドAPIから取得したデータがここに表示されます。
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-[var(--color-blue-light)] bg-opacity-20 rounded-xl p-4">
              <h4 className="font-bold text-gray-800 mb-2">強み</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 特徴1</li>
                <li>• 特徴2</li>
                <li>• 特徴3</li>
              </ul>
            </div>
            <div className="bg-[var(--color-green-light)] bg-opacity-20 rounded-xl p-4">
              <h4 className="font-bold text-gray-800 mb-2">改善点</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 特徴1</li>
                <li>• 特徴2</li>
                <li>• 特徴3</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleShare}
              className="flex-1 bg-gradient-to-r from-[var(--color-blue-light)] to-[var(--color-green-light)] text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              結果をシェア
            </button>
            <button
              onClick={onRestart}
              className="flex-1 bg-white border-2 border-gray-300 text-gray-700 font-bold py-4 rounded-xl hover:shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              もう一度診断
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
