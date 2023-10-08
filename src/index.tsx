import { showToast, Toast } from "@raycast/api";
import React, { useEffect, useReducer } from "react";
import Jimp from "jimp";

import { TVSchedule } from "./modules/tv/domain/tvSchedule";
import { tvScheduleRepository } from "./modules/tv/repositories/tvScheduleRepository";
import { ErrorMessage } from "./views/ErrorMessage";
import { AllChannels } from "./views/AllChannels";

export type State = {
  tvSchedule: TVSchedule;
  hoveredChannel?: string;
  isShowingDetail: boolean;
  iconsLoaded: boolean;
  error?: Error;
};

const ICONS_DIRECTORY = "/tmp/raycast/spanish-tv-guide/icons";
export const ERROR_MESSAGE = "Error fetching TV guide";
export const iconPath = (icon: string) => `${ICONS_DIRECTORY}/${iconName(icon)}`;

const initialState: State = { tvSchedule: [], isShowingDetail: false, iconsLoaded: false };
const reducer = (state: State, newState: Partial<State>) => ({ ...state, ...newState });

const Command = () => {
  const [state, setState] = useReducer(reducer, initialState);
  const { tvSchedule, error } = state;
  const initialize = () => tvScheduleRepository.getAll().then((tvSchedule) => setState({ tvSchedule }));

  useEffect(() => void initialize().catch((error) => setState({ error })), []);
  useEffect(() => void generateIcons(tvSchedule).then(() => setState({ iconsLoaded: true })), [tvSchedule]);
  useEffect(() => error && void showToast({ style: Toast.Style.Failure, title: ERROR_MESSAGE }), [error]);

  if (error) return <ErrorMessage />;
  return <AllChannels state={state} setState={setState} />;
};

const generateIcons = (tvSchedule: TVSchedule) => Promise.all(tvSchedule.map(({ icon }) => generateIcon(icon)));
const generateIcon = (icon: string) => Jimp.read(icon).then((image) => image.contain(256, 256).write(iconPath(icon)));
const iconName = (icon: string) => icon.substring(icon.lastIndexOf("/") + 1);

export default Command;
