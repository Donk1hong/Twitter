interface HeaderProps {
    token: string;
    onTokenChange: (value: string) => void;
    onCreate: () => void;
}

export function Header({ token, onTokenChange, onCreate }: HeaderProps) {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Аналитика постов</p>
                <h1 className="text-3xl font-black text-slate-900">Социальная лента</h1>
                <p className="text-sm text-slate-600">Работа с REST API: список постов, детали, добавление и редактирование.</p>
            </div>
            <div className="flex flex-col gap-3 md:w-96">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Токен авторизации</label>
                <input
                    value={token}
                    onChange={(e) => onTokenChange(e.target.value)}
                    placeholder="Bearer token"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 outline-none ring-2 ring-transparent transition focus:border-blue-200 focus:ring-blue-100"
                />
                <button
                    onClick={onCreate}
                    className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700"
                >
                    + Новый пост
                </button>
            </div>
        </div>
    );
}
