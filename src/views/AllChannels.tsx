import React from "react";
import { Action, ActionPanel, List, useNavigation } from "@raycast/api";

import { iconPath, State } from "../index";
import { isEmpty, isNull } from "../utils/objectUtils";
import { ChannelSchedule } from "../modules/tv/domain/tvSchedule";
import ChannelDetails from "../components/ChannelDetails";
import { SelectedChannel } from "./SelectedChannel";

const SELECT_CHANNEL_ACTION = "Select Channel";

export const AllChannels = ({ state, setState }: { state: State; setState: React.Dispatch<Partial<State>> }) => {
  const { tvSchedule, iconsLoaded, hoveredChannel } = state;
  const isLoading = isEmpty(tvSchedule) || !iconsLoaded;

  const selectChannel = (channel: string | null) => {
    const selectedChannel = !isNull(channel);
    if (selectedChannel) setState({ hoveredChannel: channel });
    setState({ isShowingDetail: selectedChannel });
  };

  return (
    <List selectedItemId={hoveredChannel} isLoading={isLoading} onSelectionChange={selectChannel} {...state}>
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
      title={name}
      icon={iconPath(icon)}
      detail={<ChannelDetails name={name} schedule={schedule} icon={icon} />}
      actions={<Actions />}
    />
  );
};
