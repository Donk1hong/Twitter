export interface Tag {
    id: number;
    name: string;
}

export interface Photo {
    id: number;
    path_photo: string;
    url?: string;
}

export interface CommentItem {
    id: number;
    comment: string;
}

export interface Post {
    id: number;
    user_id: number;
    some_information: string;
    tag: Tag[];
    photos: Photo[];
    likes: unknown[];
    likesCount: number;
    comments: CommentItem[];
    creation_date: string;
    update_date: string;
}

export interface Toast {
    id: string;
    title: string;
    message?: string;
    tone?: 'success' | 'error' | 'info';
}
