export interface Task {
  content: string;
  completed: boolean;
}

export interface Card {
  title: string;
  color: string;
  tasks: Task[];
  inHover: boolean;
  titleInEditMode: boolean;
}