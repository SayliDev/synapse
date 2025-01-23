export interface UserProfile {
  fullName: string;
  email: string;
  planType?: "free" | "premium";
  settings?: {
    theme: string;
    notifications: boolean;
    language: string;
  };
}
