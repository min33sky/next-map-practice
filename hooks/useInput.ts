import { useCallback, useState } from 'react';

/**
 * 입력 값을 관리하는 훅
 * @param initialValue 인풋 초기값
 * @param maxLength 최대 글자 수
 */
export default function useInput(
  initialValue: string = '',
  maxLength?: number
) {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback(
    (e: ChangeEventType) => {
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
