import React, { useState, useEffect, useCallback } from 'react';
import { BookOpen, Tag, Calendar, ChevronRight, ArrowLeft, Plus, X, Lock, Loader2, Clock, Search, Sparkles, Image, ExternalLink, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';

// Unsplash候補画像の型
interface UnsplashCandidate {
  id: string;
  imageUrl: string;
  thumbUrl: string;
  authorName: string;
  authorUrl: string;
  unsplashUrl: string;
  altDescription: string;
}

// =============================================
// 型定義
// =============================================
interface BlogPost {
  id: string;
  title: string;
  body: string;
  category: string;
  imageUrl?: string | null;
  tags?: string[];
  published?: boolean;
  date: string;
  updatedAt?: string;
}

interface Archive {
  year: string;
  month: string;
  count: number;
}

const CATEGORIES = ['すべて', '労働安全衛生', 'AIソリューション', 'コンサルタント視点', 'その他'];

const CATEGORY_COLORS: Record<string, string> = {
  '労働安全衛生': 'bg-cyan-900/40 text-cyan-300 border-cyan-700',
  'AIソリューション': 'bg-purple-900/40 text-purple-300 border-purple-700',
  'コンサルタント視点': 'bg-amber-900/40 text-amber-300 border-amber-700',
  'その他': 'bg-slate-800 text-slate-300 border-slate-600',
};

const MONTH_JP: Record<string, string> = {
  '01': '1月', '02': '2月', '03': '3月', '04': '4月', '05': '5月', '06': '6月',
  '07': '7月', '08': '8月', '09': '9月', '10': '10月', '11': '11月', '12': '12月'
};

// =============================================
// サブコンポーネント
// =============================================

/** カテゴリバッジ */
const CategoryBadge: React.FC<{ category: string; small?: boolean }> = ({ category, small }) => (
  <span className={`inline-block border rounded-full font-medium ${small ? 'text-[14px] px-2 py-0.5' : 'text-[14px] px-3 py-1'} ${CATEGORY_COLORS[category] || CATEGORY_COLORS['その他']}`}>
    {category}
  </span>
);

/** 記事カード */
const PostCard: React.FC<{ post: BlogPost; onClick: () => void }> = ({ post, onClick }) => {
  const excerpt = post.body
    .replace(/!\[.*?\]\(.*?\)/g, '') // 画像リンクを除去 (non-greedy)
    .replace(/\[([^\]]+)\]\(.*?\)/g, '$1') // リンクをテキストのみに変換
    .replace(/#{1,6}\s/g, '') // 見出し記号を除去
    .replace(/(\*|_){1,2}([^*_]+)\1/g, '$2') // 太字・斜体を除去
    .replace(/https?:\/\/[^\s]+/g, '') // むき出しのURLを除去
    .replace(/\r?\n+/g, ' ') // 改行をスペースに変換
    .replace(/\s+/g, ' ') // 連続するスペースを詰める
    .trim()
    .slice(0, 120);
  return (
    <article
      onClick={onClick}
      className="group cursor-pointer bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-cyan-700 hover:bg-slate-800/60 transition-all duration-200"
    >
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <CategoryBadge category={post.category} small />
        {post.tags?.map(tag => (
          <span key={tag} className="text-[14px] text-slate-500">#{tag}</span>
        ))}
      </div>
      <h2 className="text-white font-bold text-[19px] mb-2 group-hover:text-cyan-300 transition-colors line-clamp-2">{post.title}</h2>
      <p className="text-slate-400 text-[17px] leading-relaxed line-clamp-3">{excerpt}…</p>
      <div className="flex items-center gap-1 mt-3 mb-3 text-[14px] text-slate-600">
        <Clock size={11} />
        <span>{new Date(post.date).toLocaleDateString('ja-JP')}</span>
      </div>
      {post.imageUrl && (
        <div className="w-full h-40 rounded-lg overflow-hidden">
          <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
      )}
    </article>
  );
};

/** インライン要素（太字・リンク）をパースしてReact要素に変換 */
const parseInline = (text: string, inReferenceSection: boolean = false): React.ReactNode[] => {
  const parts: React.ReactNode[] = [];
  // [text](url) と **bold** を同時にパース
  const regex = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)|\*\*(.+?)\*\*/g;
  let last = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    if (match[1] && match[2]) {
      // リンク: 参考資料セクションの場合はリンク切れ防止のためタイトル検索URLにする
      const href = inReferenceSection
        ? `https://duckduckgo.com/?q=${encodeURIComponent(match[1])}`
        : match[2];

      parts.push(
        <a key={match.index} href={href} target="_blank" rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 break-all"
          title={inReferenceSection ? "リンク切れ対策のため、ニュースタイトルで検索します" : undefined}>
          {match[1]}
        </a>
      );
    } else if (match[3]) {
      // 太字
      parts.push(<strong key={match.index} className="text-white font-bold">{match[3]}</strong>);
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
};

/** 記事本文（マークダウン簡易レンダリング） */
const PostBody: React.FC<{ body: string }> = ({ body }) => {
  const lines = body.split('\n');
  let inReferenceSection = false;

  return (
    <div className="prose prose-invert prose-sm max-w-none">
      {lines.map((line, i) => {
        if (line.startsWith('# ')) {
          inReferenceSection = false;
          return <h1 key={i} className="text-[29px] font-bold text-white mt-6 mb-3">{line.slice(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          inReferenceSection = line.includes('参考資料') || line.includes('参考');
          return <h2 key={i} className="text-[24px] font-bold text-slate-100 mt-5 mb-2 border-b border-slate-800 pb-1">{line.slice(3)}</h2>;
        }
        if (line.startsWith('### ')) return <h3 key={i} className="text-[22px] font-semibold text-slate-200 mt-4 mb-2">{line.slice(4)}</h3>;
        if (line.startsWith('---')) return <hr key={i} className="border-slate-700 my-6" />;
        if (line.startsWith('- ')) {
          // リスト項目もリンク・太字対応
          return (
            <li key={i} className="text-slate-300 text-[19px] ml-5 mb-2 list-disc leading-relaxed">
              {parseInline(line.slice(2), inReferenceSection)}
            </li>
          );
        }
        if (line.trim() === '') return <div key={i} className="h-3" />;
        return (
          <p key={i} className="text-slate-300 text-[19px] leading-relaxed mb-2">
            {parseInline(line, inReferenceSection)}
          </p>
        );
      })}
    </div>
  );
};

// =============================================
// メインコンポーネント
// =============================================
const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [archives, setArchives] = useState<Archive[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState('すべて');
  const [activeArchive, setActiveArchive] = useState<{ year?: string; month?: string }>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [expandedImageUrl, setExpandedImageUrl] = useState<string | null>(null);

  // 投稿フォーム
  const [formTitle, setFormTitle] = useState('');
  const [formBody, setFormBody] = useState('');
  const [formCategory, setFormCategory] = useState('労働安全衛生');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formTags, setFormTags] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSearchingUnsplash, setIsSearchingUnsplash] = useState(false);
  const [unsplashCandidates, setUnsplashCandidates] = useState<UnsplashCandidate[]>([]);
  const [unsplashCursor, setUnsplashCursor] = useState(0);
  const [imageAttribution, setImageAttribution] = useState<{ authorName: string; authorUrl: string; unsplashUrl: string } | null>(null);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/blog`);
      if (res.ok) setPosts(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchArchives = async () => {
    try {
      const res = await fetch('/api/blog/archives');
      if (res.ok) setArchives(await res.json());
    } catch (e) { console.error(e); }
  };

  useEffect(() => { fetchPosts(); }, [fetchPosts]);
  useEffect(() => { fetchArchives(); }, []);

  const filteredPosts = posts.filter(p => {
    if (activeCategory !== 'すべて' && p.category !== activeCategory) return false;

    if (activeArchive.year) {
      const d = new Date(p.date);
      // JST (UTC+9) に強制変換して年・月を取得
      const jstDate = new Date(d.getTime() + 9 * 60 * 60 * 1000);
      const postYear = jstDate.getUTCFullYear().toString();
      if (postYear !== activeArchive.year) return false;
      if (activeArchive.month) {
        const postMonth = String(jstDate.getUTCMonth() + 1).padStart(2, '0');
        if (postMonth !== activeArchive.month) return false;
      }
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return p.title.toLowerCase().includes(q) ||
        p.body.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
    }

    return true;
  });

  const handleUnsplashSearch = async () => {
    if (!formTitle.trim()) {
      alert('タイトルを入力してから画像を検索してください。');
      return;
    }
    setIsSearchingUnsplash(true);
    setUnsplashCandidates([]);
    setUnsplashCursor(0);
    setFormImageUrl('');
    setImageAttribution(null);
    try {
      const res = await fetch('/api/unsplash-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: formTitle, category: formCategory })
      });
      if (res.ok) {
        const data = await res.json();
        setUnsplashCandidates(data.candidates || []);
        if (data.candidates?.length > 0) {
          const first = data.candidates[0];
          setFormImageUrl(first.imageUrl);
          setImageAttribution({ authorName: first.authorName, authorUrl: first.authorUrl, unsplashUrl: first.unsplashUrl });
        }
      } else {
        const err = await res.json();
        alert('画像検索に失敗しました: ' + (err.error || '不明なエラー'));
      }
    } catch (e) {
      alert('画像検索中にエラーが発生しました');
    } finally {
      setIsSearchingUnsplash(false);
    }
  };

  const selectUnsplashCandidate = (idx: number) => {
    const c = unsplashCandidates[idx];
    if (!c) return;
    setUnsplashCursor(idx);
    setFormImageUrl(c.imageUrl);
    setImageAttribution({ authorName: c.authorName, authorUrl: c.authorUrl, unsplashUrl: c.unsplashUrl });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: formPassword,
          post: {
            title: formTitle, body: formBody, category: formCategory,
            imageUrl: formImageUrl || null,
            tags: formTags.split(',').map(t => t.trim()).filter(Boolean)
          }
        })
      });
      if (res.ok) {
        setIsUploadOpen(false);
        setFormTitle(''); setFormBody(''); setFormCategory('労働安全衛生');
        setFormImageUrl(''); setFormTags(''); setFormPassword('');
        fetchPosts(); fetchArchives();
      } else {
        alert('投稿に失敗しました。パスワードを確認してください。');
      }
    } catch (e) { alert('エラーが発生しました'); }
    finally { setIsSubmitting(false); }
  };

  // アーカイブを年ごとにグループ化
  const archiveByYear = archives.reduce<Record<string, Archive[]>>((acc, a) => {
    if (!acc[a.year]) acc[a.year] = [];
    acc[a.year].push(a);
    return acc;
  }, {});

  return (
    /* 全体: ビューポート高 - ナビ高 を占有して内部でスクロール制御 */
    <div className="bg-black text-white flex flex-col" style={{ height: 'calc(100vh - 80px)', marginTop: '80px' }}>
      <div className="max-w-6xl mx-auto px-4 w-full flex flex-col flex-1 min-h-0">

        {/* ヘッダー（固定・スクロールしない） */}
        <div className="mb-6 border-b border-slate-800 pb-5 flex-shrink-0 pt-6">
          <div className="flex items-center gap-3 mb-1">
            <BookOpen size={22} className="text-cyan-400" />
            <h1 className="text-[29px] font-bold tracking-tight">Blog</h1>
          </div>
          <p className="text-slate-500 text-[17px]">労働安全衛生・AIソリューションに関する最新の考察</p>
        </div>

        {/* ========== 2カラムレイアウト: 左固定・右スクロール ========== */}
        <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0">

          {/* 左サイドバー: overflow-y-auto で内部スクロール、高さは親に追従 */}
          <aside className="lg:w-60 flex-shrink-0 lg:overflow-y-auto lg:pb-6">
            {/* 詳細ビュー中は「一覧に戻る」ボタン */}
            {selectedPost && (
              <button
                onClick={() => setSelectedPost(null)}
                className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-6 text-[17px] w-full"
              >
                <ArrowLeft size={14} /> 一覧に戻る
              </button>
            )}

            {/* 検索 */}
            <div className="relative mb-6">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="記事を検索..."
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setSelectedPost(null); }}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-[17px] text-white placeholder-slate-600 focus:border-cyan-600 focus:outline-none"
              />
            </div>

            {/* カテゴリ */}
            <div className="mb-6">
              <h3 className="text-[14px] font-bold text-slate-500 uppercase tracking-widest mb-3">カテゴリ</h3>
              <ul className="space-y-1">
                {CATEGORIES.map(cat => (
                  <li key={cat}>
                    <button
                      onClick={() => {
                        setActiveCategory(cat);
                        setActiveArchive({});
                        setSearchQuery('');
                        setSelectedPost(null);
                        document.querySelector('main')?.scrollTo({ top: 0, behavior: 'smooth' });
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-lg text-[17px] transition-colors ${activeCategory === cat && !activeArchive.year && !selectedPost ? 'bg-cyan-900/40 text-cyan-300' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
                    >
                      <span className="flex items-center gap-2">
                        <ChevronRight size={12} className={activeCategory === cat && !selectedPost ? 'text-cyan-400' : 'text-slate-700'} />
                        {cat}
                      </span>
                      {cat !== 'すべて' && (
                        <span className="text-[14px] text-slate-600">
                          {posts.filter(p => p.category === cat).length}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* アーカイブ */}
            {Object.keys(archiveByYear).length > 0 && (
              <div>
                <h3 className="text-[14px] font-bold text-slate-500 uppercase tracking-widest mb-3">アーカイブ</h3>
                <div className="space-y-3">
                  {Object.entries(archiveByYear).sort(([a], [b]) => Number(b) - Number(a)).map(([year, months]) => (
                    <div key={year}>
                      <div className="text-[14px] font-bold text-slate-400 px-3 mb-1">{year}年</div>
                      <ul className="space-y-0.5">
                        {months.sort((a, b) => Number(b.month) - Number(a.month)).map(arc => (
                          <li key={arc.month}>
                            <button
                              onClick={() => { setActiveArchive({ year, month: arc.month }); setActiveCategory('すべて'); setSearchQuery(''); setSelectedPost(null); }}
                              className={`w-full text-left flex items-center justify-between px-3 py-1.5 rounded-lg text-[17px] transition-colors ${activeArchive.year === year && activeArchive.month === arc.month ? 'bg-cyan-900/40 text-cyan-300' : 'text-slate-500 hover:bg-slate-900 hover:text-white'}`}
                            >
                              <span className="flex items-center gap-2">
                                <ChevronRight size={11} className="text-slate-700" />
                                {MONTH_JP[arc.month]}
                              </span>
                              <span className="text-[14px] text-slate-700">{arc.count}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* メインコンテンツ */}
          <main className="flex-1 min-w-0 lg:overflow-y-auto lg:pb-6">
            {selectedPost ? (
              /* ========== 記事詳細ビュー ========== */
              <div>
                {/* カテゴリ・タグ */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <CategoryBadge category={selectedPost.category} />
                  {selectedPost.tags?.map(tag => (
                    <span key={tag} className="text-[14px] text-slate-500 flex items-center gap-1"><Tag size={10} />#{tag}</span>
                  ))}
                </div>
                {/* タイトル */}
                <h1 className="text-[22px] md:text-[24px] font-bold text-white mb-3 leading-snug">{selectedPost.title}</h1>
                {/* 日付・著者 */}
                <div className="flex items-center gap-4 text-[14px] text-slate-500 mb-6">
                  <span className="flex items-center gap-1"><Calendar size={11} />{new Date(selectedPost.date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <span className="flex items-center gap-1 text-slate-600">太田 真治 / Shinji Ota</span>
                </div>
                {/* タイトル下のアイキャッチ画像（クリック拡大対応） */}
                {selectedPost.imageUrl && (
                  <div
                    onClick={() => setExpandedImageUrl(selectedPost.imageUrl!)}
                    className="w-full rounded-xl overflow-hidden mb-8 border border-slate-800 cursor-pointer hover:border-cyan-600 hover:shadow-lg hover:shadow-cyan-600/20 transition-all duration-200"
                  >
                    <img src={selectedPost.imageUrl} alt={selectedPost.title} className="w-full h-auto object-contain" />
                  </div>
                )}
                <div className="border-t border-slate-800 pt-8">
                  <PostBody body={selectedPost.body} />
                </div>
              </div>

            ) : (
              /* ========== 一覧ビュー ========== */
              <div>
                {/* フィルタ表示 */}
                <div className="flex items-center justify-between mb-5">
                  <div className="text-[17px] text-slate-400">
                    {searchQuery ? `"${searchQuery}" の検索結果` : activeArchive.year ? `${activeArchive.year}年${activeArchive.month ? MONTH_JP[activeArchive.month] : ''}` : activeCategory}
                    <span className="ml-2 text-slate-600">({filteredPosts.length}件)</span>
                  </div>
                  {(searchQuery || activeArchive.year) && (
                    <button onClick={() => { setSearchQuery(''); setActiveArchive({}); setActiveCategory('すべて'); }} className="text-[14px] text-slate-600 hover:text-cyan-400 transition-colors">
                      クリア
                    </button>
                  )}
                </div>

                {isLoading ? (
                  <div className="flex justify-center py-20">
                    <Loader2 size={28} className="animate-spin text-cyan-500" />
                  </div>
                ) : filteredPosts.length === 0 ? (
                  <div className="text-center py-20 text-slate-600">
                    <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
                    <p className="text-[17px]">記事がありません</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredPosts.map(post => (
                      <PostCard key={post.id} post={post} onClick={() => setSelectedPost(post)} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ========== 新規投稿ボタン ========== */}
      <button
        onClick={() => setIsUploadOpen(true)}
        className="fixed bottom-8 left-8 bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform z-50"
        title="新規記事を投稿"
      >
        <Plus size={22} />
      </button>

      {/* ========== 画像拡大表示モーダル（画面最大） ========== */}
      {expandedImageUrl && (
        <div
          onClick={() => setExpandedImageUrl(null)}
          className="fixed inset-0 bg-black/98 z-50 flex items-center justify-center cursor-pointer"
        >
          <button
            onClick={() => setExpandedImageUrl(null)}
            className="absolute top-6 right-6 text-slate-300 hover:text-white transition-colors z-10 p-2"
          >
            <X size={32} />
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[98vw] h-[98vh] flex items-center justify-center"
          >
            <img
              src={expandedImageUrl}
              alt="Expanded view"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}

      {/* ========== 投稿モーダル ========== */}
      {isUploadOpen && (
        <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 rounded-2xl p-6 w-full max-w-xl border border-slate-700 my-4">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-[22px] font-bold">新規記事を投稿</h2>
              <button onClick={() => setIsUploadOpen(false)} className="text-slate-400 hover:text-white"><X size={22} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[14px] text-slate-400 mb-1">タイトル <span className="text-red-400">*</span></label>
                <input type="text" value={formTitle} onChange={e => setFormTitle(e.target.value)} required
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-[17px] focus:border-cyan-500 outline-none"
                  placeholder="記事タイトルを入力" />
              </div>
              <div>
                <label className="block text-[14px] text-slate-400 mb-1">カテゴリ</label>
                <select value={formCategory} onChange={e => setFormCategory(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-[17px] focus:border-cyan-500 outline-none">
                  {CATEGORIES.filter(c => c !== 'すべて').map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[14px] text-slate-400 mb-1">本文 <span className="text-red-400">*</span></label>
                <textarea value={formBody} onChange={e => setFormBody(e.target.value)} required rows={10}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-[17px] focus:border-cyan-500 outline-none font-mono"
                  placeholder="マークダウン記法で記述できます（# 見出し、**太字**、- リストなど）" />
              </div>
              <div>
                <label className="block text-[14px] text-slate-400 mb-1 flex items-center gap-1">
                  <Image size={11} /> アイキャッチ画像（任意）
                </label>

                {/* Unsplash 検索ボタン */}
                <button
                  type="button"
                  onClick={handleUnsplashSearch}
                  disabled={isSearchingUnsplash || !formTitle.trim()}
                  className="w-full mb-2 flex items-center justify-center gap-2 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 border border-slate-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[17px] font-semibold py-2 rounded-lg transition-all"
                >
                  {isSearchingUnsplash
                    ? <><Loader2 size={14} className="animate-spin" /> Unsplashを検索中...</>
                    : <><Sparkles size={14} /> Unsplashから関連画像を自動検索</>}
                </button>

                {/* Unsplash 候補ピッカー */}
                {unsplashCandidates.length > 0 && (
                  <div className="mb-3 bg-slate-800 rounded-lg p-2 border border-slate-600">
                    <div className="text-[14px] text-slate-500 mb-2">候補画像（クリックで選択）</div>
                    <div className="flex gap-1.5 overflow-x-auto pb-1">
                      {unsplashCandidates.map((c, idx) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => selectUnsplashCandidate(idx)}
                          className={`flex-shrink-0 w-20 h-14 rounded overflow-hidden border-2 transition-all ${unsplashCursor === idx ? 'border-cyan-400 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                        >
                          <img src={c.thumbUrl} alt={c.altDescription} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                    {imageAttribution && (
                      <div className="mt-1.5 text-[14px] text-slate-500 flex items-center gap-1">
                        Photo by{' '}
                        <a href={imageAttribution.authorUrl + '?utm_source=shinji_ota_blog&utm_medium=referral'} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 underline">{imageAttribution.authorName}</a>
                        {' '}on{' '}
                        <a href={imageAttribution.unsplashUrl + '?utm_source=shinji_ota_blog&utm_medium=referral'} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 underline flex items-center gap-0.5">Unsplash <ExternalLink size={9} /></a>
                      </div>
                    )}
                  </div>
                )}

                {/* 選択済み画像プレビュー（候補なしで手動URLの場合） */}
                {formImageUrl && unsplashCandidates.length === 0 && (
                  <div className="mb-2 rounded-lg overflow-hidden border border-slate-600 relative">
                    <img src={formImageUrl} alt="プレビュー" className="w-full h-40 object-cover" />
                    <button
                      type="button"
                      onClick={() => { setFormImageUrl(''); setImageAttribution(null); }}
                      className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 transition"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}

                {/* 手動URL入力 */}
                <input type="url" value={formImageUrl}
                  onChange={e => { setFormImageUrl(e.target.value); setImageAttribution(null); setUnsplashCandidates([]); }}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-[17px] focus:border-cyan-500 outline-none"
                  placeholder="または画像URLを直接入力 (https://...)" />
              </div>
              <div>
                <label className="block text-[14px] text-slate-400 mb-1">タグ（カンマ区切り）</label>
                <input type="text" value={formTags} onChange={e => setFormTags(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-[17px] focus:border-cyan-500 outline-none"
                  placeholder="例: リスクアセスメント, ISO45001" />
              </div>
              <div className="pt-3 border-t border-slate-700">
                <label className="block text-[14px] text-slate-400 mb-1 flex items-center gap-1"><Lock size={11} /> 管理者パスワード</label>
                <input type="password" value={formPassword} onChange={e => setFormPassword(e.target.value)} required
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-[17px] focus:border-cyan-500 outline-none"
                  placeholder="パスワードを入力" />
              </div>
              <button type="submit" disabled={isSubmitting}
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2.5 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> 投稿中...</> : '記事を投稿する'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
