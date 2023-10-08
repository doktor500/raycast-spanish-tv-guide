import React, { useEffect, useState } from "react";
import { Detail } from "@raycast/api";
import { parse } from "node-html-parser";
import fetch from "isomorphic-fetch";

import { ChannelSchedule, Program } from "../modules/tv/domain/tvSchedule";
import { toString } from "../utils/stringUtils";
import { getTime } from "../utils/dateUtils";
import { Maybe } from "../utils/objectUtils";

type ProgramDetails = {
  title: string;
  startTime: Date;
  image: string;
  description: string;
};

export const SelectedProgram = ({ channel, program }: { channel: ChannelSchedule; program: Program }) => {
  const [programDetails, setProgramDetails] = useState<Maybe<ProgramDetails>>();

  useEffect(() => {
    void fetch(program.url)
      .then((response: { text: () => Promise<string> }) => response.text())
      .then((html: string) => {
        const document = parse(html);
        const image = document.querySelector("div.cover > img")?.getAttribute("src");
        const description = document.querySelector("div.show-content > div")?.innerText?.trim();
        setProgramDetails({ ...program, image: toString(image), description: toString(description) });
      });
  }, []);

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
