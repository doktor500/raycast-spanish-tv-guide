import { Fragment } from "react";
import { Color, Icon, List } from "@raycast/api";

import { ChannelSchedule, Program } from "../modules/tv/domain/tvSchedule";
import { getTime } from "../utils/dateUtils";

const { Item } = List;

export const ChannelDetails = (channel: ChannelSchedule) => (
  <Item.Detail
    metadata={
      <Item.Detail.Metadata>
        <Item.Detail.Metadata.Label title={`${channel.name}`} icon={channel.icon} />
        <Item.Detail.Metadata.Separator />
        {channel.schedule.map((program, index) => (
          <Program program={program} index={index} />
        ))}
      </Item.Detail.Metadata>
    }
  />
);

const Program = ({ program, index }: { program: Program; index: number }) => {
  return (
    <Fragment key={index}>
      <Item.Detail.Metadata.Label
        title={program.description}
        icon={program.live ? Icon.Livestream : ""}
        text={{ value: getTime(program.startTime), color: Color.SecondaryText }}
      />
      <Item.Detail.Metadata.Separator />
    </Fragment>
  );
};
