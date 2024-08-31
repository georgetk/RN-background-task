export type TApiRawFields = {
  source?: {name?: string};
  title?: string;
  urlToImage?: string;
  author?: string;
  publishedAt?: string;
};

export type TApiNeededFields = {
  sourceName?: string;
  title?: string;
  urlToImage?: string;
  author?: string;
  publishedAt?: string;
};

export type TApiRawArticles = {
  articles: TApiRawFields[];
};

export type TApiNeededArticles = {
  articles: TApiNeededFields[];
};
