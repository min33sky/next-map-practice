import { useCallback, useState } from 'react';

/**
 * 입력값을 관리하는 훅
 * @param initialValue 초기값
 * @param maxLength 최대 길이
 */
export default function useInput(
  initialValue: string = '',
  maxLength?: number
) {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback(
    (e: ChangeEventType) => {
      /**
       ** maxLength가 있을 경우, maxLength만큼만 입력값을 설정한다.
       */
      // TODO: maxLength값을 넣지않은 경우를 테스트해보자
      if (e) {
        setValue(e.target.value.slice(0, maxLength));
      }
    },
    [maxLength]
  );

  return [value, onChange, setValue] as const;
}

type ChangeEventType = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;
