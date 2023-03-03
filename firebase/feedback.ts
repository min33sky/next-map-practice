import { Feedback } from '@/types/feedback';
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { firestore } from '.';

export const feedbackListCollection = collection(firestore, 'feedbackList'); // feedbackList is the name of the collection in firestore

/**
 * 파이어스토어에서 피드백 목록을 가져옵니다.
 * @returns {Promise<Feedback[]>}
 */
export async function getFeedbackListFromFirestore() {
  const initialFeedbackList: Feedback[] = [];

  /** https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection */
  const querySnapshot = await getDocs(
    query(feedbackListCollection, orderBy('timestamp', 'desc'), limit(10)) // TODO: limit(10) is a temporary solution
  );

  // TODO: 버그

  querySnapshot.forEach((doc) => {
    console.log('***** ㅎㅎㅎㅎㅎ *****: ', doc.data().timestamp.seconds);

    initialFeedbackList.push({
      content: doc.data().content,
      // timestamp: doc.data().timestamp.toDate().getTime(), //? Date 객체는 GetServerSideProps에서 사용할 수 없어서 변환
      timestamp: doc.data().timestamp.seconds ?? 0, //? Date 객체는 GetServerSideProps에서 사용할 수 없어서 변환
    });
  });

  return initialFeedbackList;
}

/**
 * 파이어스토어에 피드백을 추가합니다.
 * @param newFeedback 피드백 내용
 */
export function addFeedbackToFirestore(newFeedback: Feedback) {
  /** https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document */
  addDoc(feedbackListCollection, newFeedback).then((docRef) => {
    console.log('Document written with ID: ', docRef.id);
  });
}
