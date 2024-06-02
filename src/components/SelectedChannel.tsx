import React, { useState } from "react";
import { Action, ActionPanel, Icon, List, useNavigation } from "@raycast/api";

import { ChannelSchedule, Program, ProgramDetails } from "../modules/tv/domain/tvSchedule";
import { getTime } from "../utils/dateUtils";
import { iconPath } from "../utils/iconUtils";
import { SelectedProgram } from "./SelectedProgram";
import { Maybe } from "../utils/objectUtils";

const SELECT_PROGRAM_ACTION = "Select Program";

export const SelectedChannel = ({ channel }: { channel: ChannelSchedule }) => {
  const currentProgram = channel.schedule.findIndex((program) => program.isCurrentlyLive);
  const previousProgram = Math.max(0, currentProgram - 2);
  const schedule = channel.schedule.slice(previousProgram, channel.schedule.length);
  const currentLiveProgram = schedule.findIndex((program) => program.isCurrentlyLive);
  const [selectedProgramIndex, setSelectedProgramIndex] = useState<number>(currentLiveProgram);

  return (
    <List selectedItemId={selectedProgramIndex.toString()} navigationTitle={channel.name}>
      <List.Section key={`channel-${channel.name}`}>
        <List.Item key={channel.name} title={`${channel.name}`} icon={iconPath(channel.icon)} />
      </List.Section>
      <List.Section key={`schedule-${channel.name}`}>
        {schedule.map((program, index) => (
          <Program key={index} channel={channel} program={program} index={index} onSelect={setSelectedProgramIndex} />
        ))}
      </List.Section>
    </List>
  );
};

type ProgramProps = { channel: ChannelSchedule; program: Program; index: number, onSelect: (index: number) => void };

const Program = ({ channel, program, index, onSelect: setSelectedProgramIndex }: ProgramProps) => {
  const { push } = useNavigation();

  const Actions = () => (
    <ActionPanel>
      <Action
        title={SELECT_PROGRAM_ACTION}
        icon={iconPath(channel.icon)}
        onAction={() => {
          setSelectedProgramIndex(index);
          push(<SelectedProgram channel={channel} program={program} />);
        }}
      />
    </ActionPanel>
  );

  return (
    <List.Item
      key={index}
      id={index.toString()}
      title={`${getTime(program.startTime)} - ${program.title}`}
      icon={program.isCurrentlyLive ? Icon.Clock : ""}
      accessories={[{ icon: program.isLive ? Icon.Livestream : "" }]}
      actions={<Actions />}
    />
  );
};
