import React from "react";
import { Action, ActionPanel, List, useNavigation } from "@raycast/api";

import { State } from "../index";
import { ChannelSchedule } from "../modules/tv/domain/tvSchedule";
import { ChannelDetails } from "./ChannelDetails";
import { SelectedChannel } from "./SelectedChannel";
import { iconPath } from "../utils/iconUtils";
import { isEmpty, isNull } from "../utils/objectUtils";

const SELECT_CHANNEL_ACTION = "Select Channel";

export const ChannelList = ({ state, setState }: { state: State; setState: React.Dispatch<Partial<State>> }) => {
  const { tvSchedule, selectedChannel } = state;

  const selectChannel = (channel: string | null) => {
    const selectedChannel = !isNull(channel);
    if (selectedChannel) setState({ selectedChannel: channel });
  };

  return (
    <List
      selectedItemId={selectedChannel}
      isLoading={isEmpty(tvSchedule)}
      onSelectionChange={selectChannel}
      isShowingDetail={Boolean(state.selectedChannel)}
    >
      {tvSchedule.map((schedule) => (
        <Channel key={schedule.name} state={state} channelSchedule={schedule} />
      ))}
    </List>
  );
};

const Channel = ({ state, channelSchedule }: { state: State; channelSchedule: ChannelSchedule }) => {
  const { push } = useNavigation();
  const { tvSchedule } = state;
  const { icon, name, schedule } = channelSchedule;
  const selectedChannel = tvSchedule.find((channel) => channel.name === name);

  const Actions = () => (
    <ActionPanel>
      <Action
        title={SELECT_CHANNEL_ACTION}
        icon={iconPath(icon)}
        onAction={() => selectedChannel && push(<SelectedChannel channel={selectedChannel} />)}
      />
    </ActionPanel>
  );

  return (
    <List.Item
      key={name}
      id={name.replace(/\s/g, "-")}
      title={name}
      icon={iconPath(icon)}
      detail={<ChannelDetails name={name} schedule={schedule} icon={icon} />}
      actions={<Actions />}
    />
  );
};
