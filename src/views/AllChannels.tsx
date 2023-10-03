import React from "react";
import { isEmpty, isNull } from "../utils/objectUtils";
import { ChannelSchedule } from "../modules/tv/domain/tvSchedule";
import { Action, ActionPanel, List } from "@raycast/api";
import { iconPath, State } from "../index";
import ChannelDetails from "../components/ChannelDetails";

export const AllChannels = ({ state, setState }: { state: State; setState: React.Dispatch<Partial<State>> }) => {
  const SELECT_CHANNEL_ACTION = "Select Channel";
  const { tvSchedule, isShowingDetail, iconsLoaded, hoveredChannel } = state;

  const selectChannel = (channel: string | null) => {
    const channelSelected = !isNull(channel);
    if (channelSelected) setState({ hoveredChannel: channel });
    setState({ isShowingDetail: channelSelected });
  };

  const renderChannel = ({ icon, name, schedule }: ChannelSchedule) => {
    const detail = <ChannelDetails name={name} schedule={schedule} icon={icon} />;
    const selectedChannel = tvSchedule.find((channel) => channel.name === name);
    return (
      <List.Item
        key={name}
        title={name}
        detail={detail}
        icon={iconPath(icon)}
        actions={
          <ActionPanel>
            <Action title={SELECT_CHANNEL_ACTION} onAction={() => setState({ selectedChannel })} />
          </ActionPanel>
        }
      />
    );
  };

  return (
    <List
      isLoading={isEmpty(tvSchedule) || !iconsLoaded}
      selectedItemId={hoveredChannel}
      isShowingDetail={isShowingDetail}
      onSelectionChange={selectChannel}
    >
      {tvSchedule.map(renderChannel)}
    </List>
  );
};
