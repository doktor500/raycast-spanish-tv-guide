import { showToast, Toast } from "@raycast/api";
import React, { useEffect, useReducer } from "react";

import { TVSchedule } from "./modules/tv/domain/tvSchedule";
import { tvScheduleRepository } from "./modules/tv/repositories/tvScheduleRepository";
import { ERROR_MESSAGE, ErrorMessage } from "./views/ErrorMessage";
import { AllChannels } from "./views/AllChannels";
import { generateIcon } from "./utils/iconUtils";

export type State = {
  tvSchedule: TVSchedule;
  hoveredChannel?: string;
  isShowingDetail: boolean;
  iconsLoaded: boolean;
  error?: Error;
};


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

export default Command;
