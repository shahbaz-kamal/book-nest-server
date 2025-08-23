export interface IBook {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string | number;
  description: string;
  coverPage: string;
  showInHeroSection: boolean;
  copies: number;
  price: number;
  available: boolean;
}
