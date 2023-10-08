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
          <Program key={index} program={program} />
        ))}
      </Item.Detail.Metadata>
    }
  />
);

const Program = ({ program }: { program: Program }) => {
  return (
    <Fragment>
      <Item.Detail.Metadata.Label
        title={program.description}
        icon={program.live ? Icon.Livestream : ""}
        text={{ value: getTime(program.startTime), color: Color.SecondaryText }}
      />
      <Item.Detail.Metadata.Separator />
    </Fragment>
  );
};
