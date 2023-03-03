import type { Feedback } from '@/types/feedback';
import { generateSnailPositionArray } from '@/utils/generateSnailPositionArray';

export const SNAIL_SIDE_LENGTH = 11;
export const CARD_WIDTH = 200;
export const BOARD_WIDTH = CARD_WIDTH * SNAIL_SIDE_LENGTH;
/**
 * 피드백의 최대 글자 수 gg
 */
export const MAX_CONTENT_LENGTH = 80; //? 피드백의 최대 글자 수

export const snailPositionArray =
  generateSnailPositionArray(SNAIL_SIDE_LENGTH).reverse();

export const FEEDBACK_COLOR_SET = {
  yellow: {
    primary: '#ffe2ab',
    secondary: '#fdc75f',
  },
  mint: {
    primary: '#94d9d9',
    secondary: '#84cccc',
  },
  pink: {
    primary: '#ffc9cf',
    secondary: '#f397a1',
  },
  purple: {
    primary: '#cdbdd7',
    secondary: '#b08fc5',
  },
  green: {
    primary: '#d7e3c2',
    secondary: '#afce7a',
  },
} as const;

/**
 * 피드백 보드의 테마를 선택합니다.
 * @param timestamp
 */
export const pickThemeByTimestamp = (
  timestamp: Feedback['timestamp']
): keyof typeof FEEDBACK_COLOR_SET => {
  switch (timestamp % 4) {
    case 0:
      return 'yellow';
    case 1:
      return 'mint';
    case 2:
      return 'pink';
    case 3:
      return 'purple';
  }
  return 'yellow';
};

/**
 * 피드백을 생성합니다. 인자를 전달하지 않으면 빈 피드백을 생성합니다.
 * @param content 피드백의 내용
 * @param timestamp 피드백의 타임스탬프
 * @returns 피드백
 */
export const generateNewFeedback = (
  content?: Feedback['content'],
  timestamp?: Feedback['timestamp']
): Feedback => ({
  content: content ?? '',
  // timestamp: timestamp ?? Math.floor(Math.random() * 10 ** 15),
  timestamp: timestamp ?? Date.now(),
});
