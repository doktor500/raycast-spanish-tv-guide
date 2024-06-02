import React, { useEffect, useState } from "react";
import { Detail } from "@raycast/api";

import { tvScheduleRepository } from "../modules/tv/repositories/tvScheduleRepository";
import { ChannelScheduleDto, ProgramDto, ProgramDetailsDto } from "../modules/tv/domain/TVScheduleDto";
import { getTime } from "../utils/dateUtils";
import { Maybe } from "../utils/objectUtils";

export const SelectedProgram = ({ channel, program }: { channel: ChannelScheduleDto; program: ProgramDto }) => {
  const [programDetails, setProgramDetails] = useState<Maybe<ProgramDetailsDto>>();

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

const formattedProgramDetails = ({ title, startTime, image, description }: ProgramDetailsDto) => `
  ### ${getTime(startTime)} ${title}
   
  ![${title}](${image})
   
  ${description}
  `;
