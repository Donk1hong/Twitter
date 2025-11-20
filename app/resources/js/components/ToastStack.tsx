import { Toast } from '../types';

interface ToastStackProps {
    toasts: Toast[];
    onDismiss: (id: string) => void;
}

const toneClasses: Record<NonNullable<Toast['tone']>, string> = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-rose-50 border-rose-200 text-rose-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
};

export function ToastStack({ toasts, onDismiss }: ToastStackProps) {
    return (
        <div className="fixed bottom-4 right-4 flex max-w-md flex-col gap-3">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`flex items-start justify-between gap-3 rounded-xl border px-4 py-3 shadow-lg transition ${toneClasses[toast.tone ?? 'info']}`}
                >
                    <div>
                        <p className="font-semibold">{toast.title}</p>
                        {toast.message && <p className="text-sm opacity-80">{toast.message}</p>}
                    </div>
                    <button
                        onClick={() => onDismiss(toast.id)}
                        className="text-xs font-semibold uppercase tracking-wide text-slate-500 hover:text-slate-800"
                    >
                        Закрыть
                    </button>
                </div>
            ))}
        </div>
    );
}
