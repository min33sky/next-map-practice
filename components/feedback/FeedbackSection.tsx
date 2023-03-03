import useInput from '@/hooks/useInput';
import type { Feedback } from '@/types/feedback';
import React, { useEffect, useState } from 'react';
import FeedbackBoard from './FeedbackBoard';
import FeedbackBoardContainer from './FeedbackBoardContainer';
import FeedbackSubmitButton from './FeedbackSubmitButton';
import FourFakeFeedbackBoards from './FourFakeFeedbackBoards';
import {
  generateNewFeedback,
  MAX_CONTENT_LENGTH,
  SNAIL_SIDE_LENGTH,
} from './variables';

interface Props {
  initialFeedbackList: Feedback[];
}

export default function FeedbackSection({ initialFeedbackList }: Props) {
  /**
   * * 피드백 리스트
   * - index 0은 Input을 위한 공간이므로 빈 피드백으로 채운다.
   * - index 1부터 initialFeedbackList으로 채우고, 남는 공간은 빈 피드백으로 채운다.
   */
  const [feedbackList, setFeedbackList] = useState<Feedback[]>(() => [
    // 피드백을 입력할 빈 공간
    generateNewFeedback('', 0),
    // 초기 피드백 리스트 (Firestore에서 가져오는 데이터)
    ...initialFeedbackList,
    // 나머지 공간은 빈 피드백으로 채운다.
    ...Array(
      Math.max(SNAIL_SIDE_LENGTH ** 2 - initialFeedbackList.length - 1, 0)
    )
      .fill(null)
      .map((_, idx) => generateNewFeedback('Empty Feedback', idx + 1)),
  ]);

  console.log('initialFeedbackList', initialFeedbackList);
  console.log('Firestore의 피드백 리스트: ', feedbackList);
  // console.log(new Date(initialFeedbackList[0].timestamp).toLocaleString());

  //? FCP 최적화를 위해 보이지 않는 영역은 최초 랜더링 이후 show 한다.
  const [showClones, setShowClones] = useState(false);
  useEffect(() => {
    setShowClones(true);
  }, []);

  // 새로운 피드백 입력 관련 훅
  const [
    newFeedbackContent,
    onChangeNewFeedbackContent,
    setNewFeedbackContent,
  ] = useInput('ㅎㅎㅎㅎ', MAX_CONTENT_LENGTH);

  return (
    <>
      <FeedbackBoardContainer showClones={showClones}>
        <>
          <FourFakeFeedbackBoards
            feedbackList={feedbackList}
            showClones={showClones}
          />

          <FeedbackBoard
            feedbackList={feedbackList}
            newFeedbackContent={newFeedbackContent}
            onChangeNewFeedbackContent={onChangeNewFeedbackContent}
          />

          <FourFakeFeedbackBoards
            feedbackList={feedbackList}
            showClones={showClones}
          />
        </>
      </FeedbackBoardContainer>

      <FeedbackSubmitButton
        newFeedbackContent={newFeedbackContent}
        setFeedbackList={setFeedbackList}
        setNewFeedbackContent={setNewFeedbackContent}
      />
    </>
  );
}
