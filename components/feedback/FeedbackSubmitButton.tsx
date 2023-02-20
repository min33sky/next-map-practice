import { Feedback } from '@/types/feedback';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from '@/styles/feedback.module.scss';
import { generateNewFeedback, MAX_CONTENT_LENGTH } from '../../utils/variables';
import { addFeedbackToFirestore } from '@/firebase/feedback';

interface Props {
  newFeedbackContent: Feedback['content'];
  setNewFeedbackContent: React.Dispatch<
    React.SetStateAction<Feedback['content']>
  >;
  setFeedbackList: React.Dispatch<React.SetStateAction<Feedback[]>>;
}

/**
 * 피드백 등록 버튼
 */
export default function FeedbackSubmitButton({
  newFeedbackContent,
  setNewFeedbackContent,
  setFeedbackList,
}: Props) {
  const [secondsLeft, setSecondsLeft] = useState(0); // 피드백 등록 가능한 시간
  const timer = useRef<NodeJS.Timeout | null>(null);

  //* 남은 시간이 0초가 되면 타이머를 종료시킨다.
  useEffect(() => {
    if (secondsLeft === 0) {
      if (typeof timer.current === 'number') clearInterval(timer.current);
      timer.current = null;
    }
  }, [secondsLeft]);

  /**
   * 새로운 피드백을 등록하는 함수
   */
  const appendNewFeedback = useCallback(
    (text: string) => {
      if (
        timer.current !== null ||
        text.trim().length === 0 ||
        text.length > MAX_CONTENT_LENGTH
      ) {
        return;
      }

      const newFeedback = generateNewFeedback(text, new Date().getTime());
      setFeedbackList((prev) => [newFeedback, ...prev.slice(1)]); //? 0번째 인덱스는 빈 피드백이므로 제거 후 삽입
      addFeedbackToFirestore(newFeedback);

      // XXX: setImmediate()을 사용해볼까???
      setTimeout(() => {
        //? 0번째 인덱스에 빈 피드백을 삽입
        setFeedbackList((feedbackList) => [
          generateNewFeedback(),
          ...feedbackList,
        ]);
        setNewFeedbackContent(''); // 피드백 입력창 초기화

        //? 10초 후에 전송 버튼을 활성화시킨다.
        setSecondsLeft(10);
        timer.current = setInterval(() => {
          setSecondsLeft((second) => second - 1);
        }, 1000);
      }, 0);
    },
    [setFeedbackList, setNewFeedbackContent]
  );

  // TODO: 피드백 폼 구현 후 주석 해제하기
  // 피드백 내용이 없으면 버튼을 렌더링하지 않는다.
  // if (newFeedbackContent.trim().length === 0) return null;

  return (
    <button
      className={styles.submitButton}
      disabled={secondsLeft > 0}
      onClick={() => appendNewFeedback(newFeedbackContent)}
    >
      {secondsLeft > 0 ? `${secondsLeft}초만 기다려주세요.` : '피드백 등록'}
    </button>
  );
}
