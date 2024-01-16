export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  profilePic: string;
  role: string;
}
export interface AuthProps {
  token: string;
  userData: UserData;
}
