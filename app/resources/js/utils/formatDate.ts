export function format(date: string | number | Date): string {
    const value = new Date(date);
    return value.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}
