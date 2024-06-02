export type ChannelSchedule = {
  icon: string;
  name: string;
  schedule: Program[];
};

export type Program = {
  title: string;
  startTime: Date;
  isCurrentlyLive: boolean;
  isLive: boolean;
  url: string;
};

export type ProgramDetails = {
  title: string;
  startTime: Date;
  image: string;
  description: string;
};

export type TVSchedule = ChannelSchedule[];
