import React from "react";
import { Icon, List } from "@raycast/api";

import { ChannelSchedule, Program } from "../modules/tv/domain/tvSchedule";
import { getTime } from "../utils/dateUtils";

import { iconPath } from "../utils/iconUtils";

export const SelectedChannel = ({ channel }: { channel: ChannelSchedule }) => {
  const selectedProgram = channel.schedule.findIndex((program) => program.live);

  return (
    <List selectedItemId={selectedProgram.toString()} navigationTitle={channel.name}>
      <List.Section key={`section-${channel.name}`}>
        <List.Item key={channel.name} title={`${channel.name}`} icon={iconPath(channel.icon)} />
      </List.Section>
      {channel.schedule.map((program, index) => renderProgram(program, index))}
    </List>
  );
};

const renderProgram = (program: Program, index: number) => {
  return (
    <List.Item
      key={index}
      id={index.toString()}
      title={`${getTime(program.startTime)} - ${program.description}`}
      icon={program.live ? Icon.Livestream : ""}
    />
  );
};
