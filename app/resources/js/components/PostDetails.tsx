import { Post } from '../types';
import { format } from '../utils/formatDate';

interface PostDetailsProps {
    post: Post | undefined;
}

export function PostDetails({ post }: PostDetailsProps) {
    if (!post) {
        return (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center text-slate-500">
                Выберите пост, чтобы увидеть детали.
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Пост #{post.id}</p>
                    <h3 className="mt-1 text-xl font-bold text-slate-900">{post.some_information}</h3>
                </div>
                <div className="rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700">
                    {post.comments.length} комм.
                </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
                {post.tag.map((tag) => (
                    <span key={tag.id} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        #{tag.name}
                    </span>
                ))}
            </div>

            {post.photos.length > 0 && (
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {post.photos.map((photo) => (
                        <div key={photo.id} className="overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                            {photo.url ? (
                                <img src={photo.url} alt="Фото поста" className="h-48 w-full object-cover" />
                            ) : (
                                <div className="flex h-32 items-center justify-center text-sm text-slate-500">Фото не загружено</div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-slate-700 sm:grid-cols-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Лайки</p>
                    <p className="font-semibold text-slate-900">{post.likesCount}</p>
                </div>
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Комментарии</p>
                    <p className="font-semibold text-slate-900">{post.comments.length}</p>
                </div>
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Создан</p>
                    <p className="font-semibold text-slate-900">{format(post.creation_date)}</p>
                </div>
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Обновлён</p>
                    <p className="font-semibold text-slate-900">{format(post.update_date)}</p>
                </div>
            </div>

            <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Комментарии</p>
                {post.comments.length === 0 ? (
                    <p className="mt-2 text-sm text-slate-600">У этого поста пока нет комментариев.</p>
                ) : (
                    <ul className="mt-3 space-y-2">
                        {post.comments.map((comment) => (
                            <li key={comment.id} className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-800">
                                {comment.comment}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
