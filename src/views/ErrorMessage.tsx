import { Detail } from "@raycast/api";
import { ERROR_MESSAGE } from "../index";

export const ErrorMessage = () => <Detail markdown={formattedError(ERROR_MESSAGE)} />;

const formattedError = (error: string) => `
|         ❗         |
| :----------------: |
|      ${error}      |`;
