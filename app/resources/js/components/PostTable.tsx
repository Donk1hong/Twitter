import { Post } from '../types';
import { format } from '../utils/formatDate';

interface PostTableProps {
    posts: Post[];
    onSelect: (id: number) => void;
    onEdit: (post: Post) => void;
}

export function PostTable({ posts, onSelect, onEdit }: PostTableProps) {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Пост</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Теги</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Лайки</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Комментарии</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Создан</th>
                            <th className="px-4 py-3"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {posts.map((post) => (
                            <tr
                                key={post.id}
                                className="hover:bg-slate-50"
                                onClick={() => onSelect(post.id)}
                            >
                                <td className="max-w-xl px-4 py-4">
                                    <p className="line-clamp-2 text-sm font-semibold text-slate-900">{post.some_information}</p>
                                    <p className="text-xs text-slate-500">ID: {post.id}</p>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex flex-wrap gap-2">
                                        {post.tag.map((tag) => (
                                            <span
                                                key={tag.id}
                                                className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
                                            >
                                                #{tag.name}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-sm font-semibold text-slate-900">{post.likesCount}</td>
                                <td className="px-4 py-4 text-sm text-slate-700">{post.comments.length}</td>
                                <td className="px-4 py-4 text-sm text-slate-700">{format(post.creation_date)}</td>
                                <td className="px-4 py-4">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onEdit(post);
                                        }}
                                        className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-blue-400 hover:text-blue-700"
                                    >
                                        Редактировать
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
