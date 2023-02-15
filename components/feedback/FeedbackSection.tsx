import type { Feedback } from '@/types/feedback';
import React from 'react';

interface Props {
  initialFeedbackList: Feedback[];
}

export default function FeedbackSection({ initialFeedbackList }: Props) {
  console.log('initialFeedbackList', initialFeedbackList);

  console.log(new Date(initialFeedbackList[0].timestamp).toLocaleString());

  return <div>FeedbackSection</div>;
}
