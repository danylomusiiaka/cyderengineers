export interface Test {
  _id: string;
  name: string;
  category: string;
  description: string;
  author: string;
  picture: string;
  questions: Question[];
}

interface Question {
  name: string; 
  options: string[]; 
}