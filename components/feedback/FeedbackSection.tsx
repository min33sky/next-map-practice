import useInput from '@/hooks/useInput';
import type { Feedback } from '@/types/feedback';
import React, { useEffect, useState } from 'react';
import FeedbackBoardContainer from './FeedbackBoardContainer';
import FeedbackSubmitButton from './FeedbackSubmitButton';
import { MAX_CONTENT_LENGTH } from './variables';

interface Props {
  initialFeedbackList: Feedback[];
}

export default function FeedbackSection({ initialFeedbackList }: Props) {
  // TODO: 피드백 리스트 초기화
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);

  console.log('initialFeedbackList', initialFeedbackList);

  console.log(new Date(initialFeedbackList[0].timestamp).toLocaleString());

  //? FCP 최적화를 위해 보이지 않는 영역은 최초 랜더링 이후 show 한다.
  const [showClones, setShowClones] = useState(false);
  useEffect(() => {
    setShowClones(true);
  }, []);

  //? 새로운 피드백 입력 관련 훅
  const [
    newFeedbackContent,
    onChangeNewFeedbackContent,
    setNewFeedbackContent,
  ] = useInput('', MAX_CONTENT_LENGTH);

  return (
    <>
      <FeedbackBoardContainer showClones={showClones}>
        <div>FeedbackBoardContainer</div>
      </FeedbackBoardContainer>
      <FeedbackSubmitButton
        newFeedbackContent={newFeedbackContent}
        setFeedbackList={setFeedbackList}
        setNewFeedbackContent={setNewFeedbackContent}
      />
    </>
  );
}
