import { ChannelSchedule, Program } from "../modules/tv/domain/tvSchedule";
import { Icon, List } from "@raycast/api";
import React from "react";
import { getTime } from "../utils/dateUtils";
import { iconPath } from "../index";

export const SelectedChannel = ({ channel }: { channel: ChannelSchedule }) => {
  const selectedProgram = channel.schedule.findIndex((program) => program.live);

  return (
    <List selectedItemId={selectedProgram.toString()}>
      <List.Section>
        <List.Item title={`${channel.name}`} icon={iconPath(channel.icon)} />
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
