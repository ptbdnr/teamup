export type User = {
  id: string;
  name: string;
  avatar: string;
  dataAiHint: string;
  role: string;
  skills: string[];
  interests: string[];
  discord: string;
  isYou?: boolean;
  graphCoordinate?: {
    result: number; // 0-1
    method: number; // 0-1
    social: number; // 0-1
  }
};

export type Team = {
  id: string;
  name: string;
  userIds: string[]; // foreign keys to User
};

export type Project = {
  id: string;
  name: string;
  shortDescription: string;
  longDescription?: string; // Optional for more detailed info
  teamId?: string; // Optional foreign key to Team
  graphCoordinates: {
    result: number; // 0-1
    method: number; // 0-1
    social: number; // 0-1
  };
};
