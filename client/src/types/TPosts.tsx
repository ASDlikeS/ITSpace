export type TPosts = {
  id: string;
  title: string;
  body: string;
  date: string;
  author: string;
  tags?: string[];
  imageUrl?: string;
  avatarUrl?: string;
  job: string;
};

export type TPostSubmit = {
  title: string;
  body: string;
  tags?: string[];
  imageUrl?: string;
};
