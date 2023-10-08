import React, { useEffect, useState } from "react";
import { Detail } from "@raycast/api";

import { tvScheduleRepository } from "../modules/tv/repositories/tvScheduleRepository";
import { ChannelSchedule, Program, ProgramDetails } from "../modules/tv/domain/tvSchedule";
import { getTime } from "../utils/dateUtils";
import { Maybe } from "../utils/objectUtils";

export const SelectedProgram = ({ channel, program }: { channel: ChannelSchedule; program: Program }) => {
  const [programDetails, setProgramDetails] = useState<Maybe<ProgramDetails>>();

  useEffect(() => void tvScheduleRepository.getProgramDetails(program).then(setProgramDetails), [program]);

  return (
    programDetails && (
      <Detail navigationTitle={channel.name}
        markdown={formattedProgramDetails(programDetails)}
        metadata={
          <Detail.Metadata>
            <Detail.Metadata.Label title={channel.name} icon={channel.icon} />
            <Detail.Metadata.Label title={program.title} />
          </Detail.Metadata>
        }
      />
    )
  );
};

const formattedProgramDetails = ({ title, startTime, image, description }: ProgramDetails) => `
  ### ${getTime(startTime)} ${title}
   
  ![${title}](${image})
   
  ${description}
  `;
