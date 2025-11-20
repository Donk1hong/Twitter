import { useEffect, useMemo, useState } from 'react';
import { apiClient, handleApiError, setAuthToken } from './api/client';
import { Post, Tag, Toast } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { PostTable } from './components/PostTable';
import { PostDetails } from './components/PostDetails';
import { PostFormModal } from './components/PostFormModal';
import { ToastStack } from './components/ToastStack';

function uniqueTags(posts: Post[]): Tag[] {
    const tags = new Map<number, Tag>();
    posts.forEach((post) => {
        post.tag.forEach((tag) => tags.set(tag.id, tag));
    });
    return Array.from(tags.values());
}

export default function App() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
    const [search, setSearch] = useState('');
    const [tagFilter, setTagFilter] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editPost, setEditPost] = useState<Post | null>(null);
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [token, setToken] = useLocalStorage<string>('authToken', '');

    useEffect(() => {
        setAuthToken(token || null);
    }, [token]);

    useEffect(() => {
        refreshPosts();
    }, []);

    const filteredPosts = useMemo(() => {
        return posts.filter((post) => {
            const matchesSearch =
                post.some_information.toLowerCase().includes(search.toLowerCase()) ||
                post.tag.some((tag) => tag.name.toLowerCase().includes(search.toLowerCase()));
            const matchesTag = tagFilter ? post.tag.some((tag) => tag.name === tagFilter) : true;
            return matchesSearch && matchesTag;
        });
    }, [posts, search, tagFilter]);

    const tags = useMemo(() => uniqueTags(posts), [posts]);
    const selectedPost = useMemo(
        () => posts.find((post) => post.id === selectedPostId),
        [posts, selectedPostId]
    );

    const pushToast = (title: string, message?: string, tone: Toast['tone'] = 'info') => {
        setToasts((prev) => [...prev, { id: crypto.randomUUID(), title, message, tone }]);
        setTimeout(() => {
            setToasts((prev) => prev.slice(1));
        }, 4000);
    };

    const refreshPosts = async () => {
        setLoading(true);
        try {
            const { data } = await apiClient.get<{ posts: Post[] }>('/posts');
            setPosts(data.posts ?? []);
        } catch (error) {
            pushToast('Не удалось загрузить посты', handleApiError(error), 'error');
        } finally {
            setLoading(false);
        }
    };

    const loadPostDetails = async (id: number) => {
        try {
            const { data } = await apiClient.get<{ post: Post }>(`/posts/${id}`);
            if (data.post) {
                setPosts((prev) => prev.map((post) => (post.id === id ? data.post : post)));
            }
        } catch (error) {
            pushToast('Не удалось загрузить детали поста', handleApiError(error), 'error');
        }
    };

    const handleCreateOrUpdate = async (payload: FormData) => {
        try {
            if (editPost) {
                await apiClient.patch(`/user/post/${editPost.id}/edit`, payload, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                pushToast('Пост обновлён', 'Данные успешно сохранены', 'success');
            } else {
                await apiClient.post('/user/post/create', payload, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                pushToast('Пост создан', 'Запись опубликована', 'success');
            }
            setModalOpen(false);
            setEditPost(null);
            await refreshPosts();
        } catch (error) {
            pushToast('Ошибка сохранения', handleApiError(error), 'error');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
            <div className="mx-auto max-w-6xl px-4 py-8">
                <Header token={token} onTokenChange={setToken} onCreate={() => setModalOpen(true)} />

                <div className="mt-6 space-y-4">
                    <FilterBar
                        search={search}
                        onSearchChange={setSearch}
                        tagFilter={tagFilter}
                        onTagChange={setTagFilter}
                        tags={tags}
                    />

                    {loading ? (
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-slate-600 shadow-sm">
                            Загружаем посты...
                        </div>
                    ) : (
                        <PostTable
                            posts={filteredPosts}
                            onSelect={(id) => {
                                setSelectedPostId(id);
                                loadPostDetails(id);
                            }}
                            onEdit={(post) => {
                                setEditPost(post);
                                setModalOpen(true);
                            }}
                        />
                    )}

                    <PostDetails post={selectedPost} />
                </div>
            </div>

            <PostFormModal
                open={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setEditPost(null);
                }}
                onSubmit={handleCreateOrUpdate}
                initialPost={editPost}
            />
            <ToastStack toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
        </div>
    );
}
