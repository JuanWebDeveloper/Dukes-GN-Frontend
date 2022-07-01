export interface User {
  userId: string;
  name: string;
  email: string;
  description?: string;
  verification: boolean;
  availability: boolean;
  rol: string;
  imageBase64?: string;
  programId?: string;
}
