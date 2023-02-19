import { useCallback, useState } from 'react';

type ChangeEventType = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

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
