import React, { useState, useEffect } from 'react';
import { Camera, Plus, X, MapPin, Calendar, Lock } from 'lucide-react';

interface BlogPost {
    id: string;
    imageUrl: string;
    caption: string;
    date: string;
    location?: string;
}

const Blog: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Upload Form State
    const [imageUrl, setImageUrl] = useState('');
    const [caption, setCaption] = useState('');
    const [location, setLocation] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/blog');
            if (res.ok) {
                const data = await res.json();
                setPosts(data);
            }
        } catch (error) {
            console.error('Failed to fetch posts', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/blog', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    password,
                    post: { imageUrl, caption, location }
                })
            });

            if (res.ok) {
                setIsUploadOpen(false);
                setImageUrl('');
                setCaption('');
                setLocation('');
                setPassword('');
                fetchPosts(); // Refresh
            } else {
                alert('Upload failed. Check password.');
            }
        } catch (error) {
            console.error('Upload error', error);
            alert('Error uploading post');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white pt-20 pb-20">
            <div className="max-w-4xl mx-auto px-4">

                {/* Header Profile Section (Instagram style) */}
                <div className="flex items-center gap-8 mb-12 border-b border-slate-800 pb-8">
                    <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-[2px]">
                        <div className="w-full h-full rounded-full bg-black p-[2px]">
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=200&h=200"
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                            <h1 className="text-xl md:text-2xl font-light">shinji_ota_safety</h1>
                            <button className="bg-slate-800 text-sm px-4 py-1.5 rounded font-semibold hover:bg-slate-700 transition-colors">
                                Follow
                            </button>
                        </div>
                        <div className="flex gap-6 mb-4 text-sm md:text-base">
                            <div><span className="font-bold">{posts.length}</span> posts</div>
                            <div><span className="font-bold">1.2k</span> followers</div>
                            <div><span className="font-bold">500</span> following</div>
                        </div>
                        <div className="text-sm text-slate-300">
                            <p className="font-bold text-white">太田 真治 / Shinji Ota</p>
                            <p>Safety Consultant ⛑️ | Risk Engineer ⚙️</p>
                            <p>Building a safer future through technology.</p>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-cyan-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-1 md:gap-4">
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className="relative aspect-square group cursor-pointer overflow-hidden bg-slate-900"
                                onClick={() => setSelectedPost(post)}
                            >
                                <img
                                    src={post.imageUrl}
                                    alt={post.caption}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <p className="text-white font-bold flex items-center gap-2">
                                        <span className="truncate max-w-[80%] px-2">{post.caption}</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && posts.length === 0 && (
                    <div className="text-center py-20 text-slate-500">
                        <Camera size={48} className="mx-auto mb-4 opacity-50" />
                        <p>No posts yet.</p>
                    </div>
                )}
            </div>

            {/* FAB for Upload - Moved to bottom-left */}
            <button
                onClick={() => setIsUploadOpen(true)}
                className="fixed bottom-8 left-8 bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform z-50"
            >
                <Plus size={24} />
            </button>

            {/* Post Modal */}
            {selectedPost && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedPost(null)}>
                    <div className="bg-black border border-slate-800 rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row overflow-hidden" onClick={e => e.stopPropagation()}>
                        <div className="md:w-3/5 bg-black flex items-center justify-center">
                            <img
                                src={selectedPost.imageUrl}
                                alt={selectedPost.caption}
                                className="max-h-[60vh] md:max-h-full w-full object-contain"
                            />
                        </div>
                        <div className="md:w-2/5 p-6 flex flex-col bg-slate-950 border-l border-slate-800">
                            <div className="flex items-center gap-3 mb-4 border-b border-slate-800 pb-4">
                                <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=100&h=100" className="w-full h-full object-cover" />
                                </div>
                                <span className="font-bold text-sm">shinji_ota_safety</span>
                            </div>

                            <div className="flex-1 overflow-y-auto mb-4">
                                <p className="text-sm leading-relaxed whitespace-pre-wrap">{selectedPost.caption}</p>
                            </div>

                            <div className="text-xs text-slate-500 mt-auto pt-4 border-t border-slate-800">
                                {selectedPost.location && (
                                    <div className="flex items-center gap-1 mb-2 text-cyan-500">
                                        <MapPin size={12} />
                                        <span>{selectedPost.location}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-1 uppercase tracking-wider">
                                    <Calendar size={12} />
                                    {new Date(selectedPost.date).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setSelectedPost(null)}
                            className="absolute top-4 right-4 text-white md:hidden"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>
            )}

            {/* Upload Modal */}
            {isUploadOpen && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-900 rounded-xl p-6 w-full max-w-md border border-slate-700">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">New Post</h2>
                            <button onClick={() => setIsUploadOpen(false)} className="text-slate-400 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleUpload} className="space-y-4">
                            <div>
                                <label className="block text-xs text-slate-400 mb-1">Image URL</label>
                                <input
                                    type="url"
                                    value={imageUrl}
                                    onChange={e => setImageUrl(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm focus:border-cyan-500 outline-none"
                                    placeholder="https://..."
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs text-slate-400 mb-1">Caption</label>
                                <textarea
                                    value={caption}
                                    onChange={e => setCaption(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm focus:border-cyan-500 outline-none h-24"
                                    placeholder="Write a caption..."
                                />
                            </div>

                            <div>
                                <label className="block text-xs text-slate-400 mb-1">Location</label>
                                <input
                                    type="text"
                                    value={location}
                                    onChange={e => setLocation(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm focus:border-cyan-500 outline-none"
                                    placeholder="Tokyo, Japan"
                                />
                            </div>

                            <div className="pt-4 border-t border-slate-700">
                                <label className="block text-xs text-slate-400 mb-1 flex items-center gap-1">
                                    <Lock size={12} /> Admin Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm focus:border-cyan-500 outline-none"
                                    placeholder="Enter admin password"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 rounded transition-colors disabled:opacity-50 mt-4"
                            >
                                {isSubmitting ? 'Posting...' : 'Share'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Blog;
