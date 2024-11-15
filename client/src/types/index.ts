export interface Contact {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber: string;
  company?: string;
  jobTitle?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}
