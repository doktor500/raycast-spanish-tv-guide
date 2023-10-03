import { List, showToast, Toast } from "@raycast/api";
import { useEffect, useReducer } from "react";
import Jimp from "jimp";

import { ChannelSchedule, TVSchedule } from "./modules/tv/domain/tvSchedule";
import ChannelDetails from "./components/ChannelDetails";
import { tvScheduleRepository } from "./modules/tv/repositories/tvScheduleRepository";
import { isEmpty, isNull } from "./utils/objectUtils";
import ErrorMessage from "./components/ErrorMessage";

type State = {
  tvSchedule: TVSchedule;
  isShowingDetail: boolean;
  iconsLoaded: boolean;
  error?: Error;
  hoveredChannel?: string;
};

const ICONS_DIRECTORY = "/tmp/raycast/spanish-tv-guide/icons";
export const ERROR_MESSAGE = "Error fetching TV guide";

const initialState: State = { tvSchedule: [], isShowingDetail: false, iconsLoaded: false };
const reducer = (state: State, newState: Partial<State>) => ({ ...state, ...newState });

const Command = () => {
  const [state, setState] = useReducer(reducer, initialState);
  const { tvSchedule, isShowingDetail, iconsLoaded, error, hoveredChannel } = state;
  const initialize = () => tvScheduleRepository.getAll().then((tvSchedule) => setState({ tvSchedule }));

  useEffect(() => void initialize().catch((error) => setState({ error })), []);
  useEffect(() => void generateIcons(tvSchedule).then(() => setState({ iconsLoaded: true })), [tvSchedule]);
  useEffect(() => error && void showToast({ style: Toast.Style.Failure, title: ERROR_MESSAGE }), [error]);

  const selectChannel = (channel: string | null) => {
    const channelSelected = !isNull(channel);
    if (channelSelected) setState({ hoveredChannel: channel });
    setState({ isShowingDetail: channelSelected });
  };

  if (error) return <ErrorMessage />;

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

const renderChannel = ({ icon, name, schedule }: ChannelSchedule) => {
  const detail = <ChannelDetails name={name} schedule={schedule} icon={icon} />;
  return <List.Item key={name} title={name} detail={detail} icon={iconPath(icon)} />;
};

const generateIcons = (tvSchedule: TVSchedule) => Promise.all(tvSchedule.map(({ icon }) => generateIcon(icon)));
const generateIcon = (icon: string) => Jimp.read(icon).then((image) => image.contain(256, 256).write(iconPath(icon)));
const iconPath = (icon: string) => `${ICONS_DIRECTORY}/${iconName(icon)}`;
const iconName = (icon: string) => icon.substring(icon.lastIndexOf("/") + 1);

export default Command;
