import React from "react";
import { Action, ActionPanel, Icon, List, useNavigation } from "@raycast/api";

import { ChannelSchedule, Program } from "../modules/tv/domain/tvSchedule";
import { getTime } from "../utils/dateUtils";
import { iconPath } from "../utils/iconUtils";
import { SelectedProgram } from "./SelectedProgram";

const SELECT_PROGRAM_ACTION = "Select Program";

export const SelectedChannel = ({ channel }: { channel: ChannelSchedule }) => {
  const currentProgram = channel.schedule.findIndex((program) => program.isCurrentlyLive);
  const previousProgram = Math.max(0, currentProgram - 2);
  const schedule = channel.schedule.slice(previousProgram, channel.schedule.length);
  const selectedProgram = schedule.findIndex((program) => program.isCurrentlyLive);

  return (
    <List selectedItemId={selectedProgram.toString()} navigationTitle={channel.name}>
      <List.Section key={`channel-${channel.name}`}>
        <List.Item key={channel.name} title={`${channel.name}`} icon={iconPath(channel.icon)} />
      </List.Section>
      <List.Section key={`schedule-${channel.name}`}>
        {schedule.map((program, index) => (
          <Program key={index} channel={channel} program={program} index={index} />
        ))}
      </List.Section>
    </List>
  );
};

const Program = ({ channel, program, index }: { channel: ChannelSchedule; program: Program; index: number }) => {
  const { push } = useNavigation();

  const Actions = () => (
    <ActionPanel>
      <Action
        title={SELECT_PROGRAM_ACTION}
        icon={iconPath(channel.icon)}
        onAction={() => push(<SelectedProgram channel={channel} program={program} />)}
      />
    </ActionPanel>
  );

  return (
    <List.Item
      key={index}
      id={index.toString()}
      title={`${getTime(program.startTime)} - ${program.title}`}
      icon={program.isCurrentlyLive ? Icon.Livestream : ""}
      actions={<Actions />}
    />
  );
};
