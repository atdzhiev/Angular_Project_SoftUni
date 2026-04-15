export interface EventItem {
  _id: string;
  _ownerId: {
    _id: string;
    email:string;
    username: string;
    events: string[];
  };
  title: string;
  category: string;
  town: string;
  address: string;
  price: string;
  images: string[];
  date: string;
  time: string; 
  description: string;
  participants: string[];
}
