export type TApiNeededFields = {
  source?: {name?: string};
  title?: string;
  urlToImage?: string;
  author?: string;
};

export type TApiArticles = {
  articles: TApiNeededFields[];
};
