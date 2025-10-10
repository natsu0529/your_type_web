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
        <div className="bg-[var(--color-white)] rounded-3xl shadow-2xl p-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl text-gray-600 mb-4">{username} さんのタイプは</h2>
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-blue-light)] to-[var(--color-green-light)] mb-8">
              {type}
            </h1>
          </div>

          <div className="bg-gradient-to-r from-[var(--color-yellow-light)] to-[var(--color-pink-light)] rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-bold text-[var(--color-black)] mb-4">タイプの説明</h3>
            <p className="text-gray-700 leading-relaxed">
              ここにタイプの詳細な説明が表示されます。バックエンドAPIから取得したデータに置き換える予定です。
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleShare}
              className="flex-1 bg-gradient-to-r from-[var(--color-blue-light)] to-[var(--color-green-light)] text-[var(--color-white)] font-bold py-4 rounded-xl hover:shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              結果をシェア
            </button>
            <button
              onClick={onRestart}
              className="flex-1 bg-[var(--color-white)] border-2 border-gray-300 text-gray-700 font-bold py-4 rounded-xl hover:shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              もう一度診断
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
