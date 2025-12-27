export interface BaseEntity {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}

export interface ArticleUser extends BaseEntity {
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
}

export interface ArticleCategory extends BaseEntity {
  name: string;
  description: string;
}

export interface ArticleComment extends BaseEntity {
  content: string;
}

export interface Article extends BaseEntity {
  title: string;
  description: string;
  cover_image_url: string;
  user?: ArticleUser;
  category: ArticleCategory | null;
  comments?: ArticleComment[];
  localizations?: unknown[];
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface ArticleListResponse {
  data: Article[];
  meta: {
    pagination: Pagination;
  };
}

export interface ArticleDetailResponse {
  data: Article;
  meta: Record<string, never>;
}

export interface ArticleRequest {
  title: string;
  description: string;
  cover_image_url: string;
  category: {
    connect: string[];
  };
}
