export interface Task {
    _id: string;
    title: string;
    description: string;
    dueDate: string;
    completed: boolean;
    category: string;
  }

export interface User {
    name: string;
    email: string;
    linkedinPhoto:string;
    linkedinProfileUrl?: string;
  }
  
export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
  }