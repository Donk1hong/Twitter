import { Tag } from '../types';

interface FilterBarProps {
    search: string;
    onSearchChange: (value: string) => void;
    tagFilter: string;
    onTagChange: (value: string) => void;
    tags: Tag[];
}

export function FilterBar({ search, onSearchChange, tagFilter, onTagChange, tags }: FilterBarProps) {
    return (
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-3">
                <div className="relative w-full md:w-2/3">
                    <input
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Поиск по описанию или тегам"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none ring-2 ring-transparent transition hover:bg-white focus:border-blue-200 focus:bg-white focus:ring-blue-100"
                    />
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">⌕</span>
                </div>
                <div className="flex w-full items-center gap-3 md:w-auto">
                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Теги</label>
                    <select
                        value={tagFilter}
                        onChange={(e) => onTagChange(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 md:w-48"
                    >
                        <option value="">Все</option>
                        {tags.map((tag) => (
                            <option key={tag.id} value={tag.name}>
                                {tag.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
