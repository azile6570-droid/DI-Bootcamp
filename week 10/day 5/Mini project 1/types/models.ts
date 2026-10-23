export interface User {
  id: number;
  username: string;
  email: string;
  contributorId?: number;
}

export interface Story {
  id: number;
  title: string;
  content: string;
  author: User;
  contributors: User[];
  createdAt: string;
  updatedAt: string;
}

export interface StoryComment {
  id: number;
  content: string;
  author: User;
  createdAt: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
