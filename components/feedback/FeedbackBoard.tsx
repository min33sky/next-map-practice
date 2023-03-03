import { Feedback } from '@/types/feedback';
import React, { ChangeEvent } from 'react';
import styles from '@/styles/feedback.module.scss';
import NewFeedbackInput from './NewFeedbackInput';
import FeedbackList from './FeedbackList';

interface props {
  feedbackList: Feedback[];
  newFeedbackContent?: Feedback['content'];
  onChangeNewFeedbackContent?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

/**
 * 피드백 보드
 */
export default function FeedbackBoard({
  feedbackList,
  newFeedbackContent,
  onChangeNewFeedbackContent,
}: props) {
  return (
    <div className={styles.feedbackBoard}>
      {/* TODO: 피드백 리스트 컴포넌트 추가 */}
      <FeedbackList feedbackList={feedbackList} />

      {newFeedbackContent && onChangeNewFeedbackContent && (
        <NewFeedbackInput
          newFeedbackContent={newFeedbackContent}
          onChangeNewFeedbackContent={onChangeNewFeedbackContent}
        />
      )}
    </div>
  );
}
