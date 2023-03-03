import { Feedback } from '@/types/feedback';
import React from 'react';
import FeedbackBoard from './FeedbackBoard';

interface Props {
  feedbackList: Feedback[];
  showClones: boolean;
}

/**
 * 무한한 Board 공간을 구현하기 위한 Fake Component
 */
export default function FourFakeFeedbackBoards({
  feedbackList,
  showClones,
}: Props) {
  return (
    <>
      <FeedbackBoard feedbackList={feedbackList} />
      <FeedbackBoard feedbackList={feedbackList} />
      <FeedbackBoard feedbackList={feedbackList} />
      <FeedbackBoard feedbackList={feedbackList} />
    </>
  );
}
