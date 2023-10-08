import Jimp from "jimp";

const ICONS_DIRECTORY = "/tmp/raycast/spanish-tv-guide/icons";

const iconPath = (icon: string) => `${ICONS_DIRECTORY}/${iconName(icon)}`;
const generateIcon = (icon: string) => Jimp.read(icon).then((image) => image.contain(256, 256).write(iconPath(icon)));
const iconName = (icon: string) => icon.substring(icon.lastIndexOf("/") + 1);

export { iconPath, generateIcon };