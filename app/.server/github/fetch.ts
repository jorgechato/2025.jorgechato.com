import { Gist } from './api';
import { GIST, OWNER } from './constants';

export async function HOW_TO_WORK_WITH_ME(): Promise<string> {
  return await Gist(OWNER, GIST.HOW_TO_WORK_WITH_ME);
}
