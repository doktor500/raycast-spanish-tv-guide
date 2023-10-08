export type Program = {
  title: string;
  startTime: Date;
  isCurrentlyLive: boolean;
  url: string;
};

export type ProgramDetails = {
  title: string;
  startTime: Date;
  image: string;
  description: string;
};

export type ChannelSchedule = {
  icon: string;
  name: string;
  schedule: Program[];
};

export type TVSchedule = ChannelSchedule[];
