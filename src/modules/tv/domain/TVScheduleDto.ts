export type ChannelScheduleDto = {
  icon: string;
  name: string;
  schedule: ProgramDto[];
};

export type ProgramDto = {
  title: string;
  startTime: Date;
  isCurrentlyLive: boolean;
  isLive: boolean;
  url: string;
};

export type ProgramDetailsDto = {
  title: string;
  startTime: Date;
  image: string;
  description: string;
};

export type TVScheduleDto = ChannelScheduleDto[];
