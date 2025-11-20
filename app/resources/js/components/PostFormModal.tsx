import { useEffect, useState } from 'react';
import { Post } from '../types';

interface PostFormModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (payload: FormData) => Promise<void>;
    initialPost?: Post | null;
}

export function PostFormModal({ open, onClose, onSubmit, initialPost }: PostFormModalProps) {
    const [text, setText] = useState('');
    const [photo, setPhoto] = useState<File | null>(null);
    const [pending, setPending] = useState(false);

    useEffect(() => {
        if (initialPost) {
            setText(initialPost.some_information);
        } else {
            setText('');
        }
        setPhoto(null);
    }, [initialPost, open]);

    if (!open) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPending(true);
        const formData = new FormData();
        formData.append('some_information', text);
        if (photo) {
            formData.append('photo', photo);
        }
        await onSubmit(formData);
        setPending(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
            <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            {initialPost ? 'Редактировать пост' : 'Новый пост'}
                        </p>
                        <h3 className="text-xl font-bold text-slate-900">
                            {initialPost ? 'Обновите детали и сохраните' : 'Заполните форму и опубликуйте'}
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                        Закрыть
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div>
                        <label className="text-sm font-semibold text-slate-800">Текст поста</label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            required
                            rows={4}
                            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none ring-2 ring-transparent transition focus:border-blue-200 focus:bg-white focus:ring-blue-100"
                            placeholder="Например: Новый релиз с тегами #news #release"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-slate-800">Фото (необязательно)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : null)}
                            className="mt-2 block w-full text-sm text-slate-700 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                        />
                        <p className="mt-1 text-xs text-slate-500">Теги автоматически определяются из текста поста.</p>
                    </div>

                    <div className="flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
                        >
                            Отмена
                        </button>
                        <button
                            type="submit"
                            disabled={pending}
                            className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {pending ? 'Сохраняем...' : initialPost ? 'Сохранить' : 'Опубликовать'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
