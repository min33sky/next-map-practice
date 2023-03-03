import React, { useCallback, useEffect, useRef } from 'react';
import styles from '@/styles/feedback.module.scss';
import { BOARD_WIDTH } from './variables';

interface Props {
  children: React.ReactNode;
  showClones: boolean;
}

/**
 * 마우스, 터치 이벤트 처리를 담당하는 컴포넌트
 */
export default function FeedbackBoardContainer({
  children,
  showClones,
}: Props) {
  const feedbackBoardRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false); // 마우스 또는 터치 이벤트가 발생했는지 확인
  const position = useRef({ x: 0, y: 0 }); // 최근 마우스, 터치 이벤트의 좌표
  const offset = useRef({ x: 0, y: 0 });
  const speed = useRef({ x: 0, y: 0 });

  /**
   * 마우스 또는 터치 이벤트가 발생했을 때
   */
  const onDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    isDown.current = true;
    const { clientX, clientY } = isTouchEvent(e) ? e.touches[0] : e;
    position.current = { x: clientX, y: clientY };
  }, []);

  /**
   * 마우스 또는 터치 이벤트가 끝났을 때
   */
  const onUp = useCallback(() => {
    isDown.current = false;
  }, []);

  /**
   * 마우스 또는 터치 이벤트가 진행되고 있을 때
   */
  const onMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDown.current) return;

    const { clientX, clientY } = isTouchEvent(e) ? e.touches[0] : e;
    speed.current = {
      x: position.current.x - clientX,
      y: position.current.y - clientY,
    };

    position.current = { x: clientX, y: clientY };
  }, []);

  useEffect(() => {
    let timer: number;

    timer = requestAnimationFrame(function slowDown() {
      let newOffsetX = offset.current.x + speed.current.x;
      if (newOffsetX > BOARD_WIDTH / 2) newOffsetX = newOffsetX - BOARD_WIDTH;
      if (newOffsetX < -BOARD_WIDTH / 2) newOffsetX = newOffsetX + BOARD_WIDTH;

      let newOffsetY = offset.current.y + speed.current.y;
      if (newOffsetY > BOARD_WIDTH / 2) newOffsetY = newOffsetY - BOARD_WIDTH;
      if (newOffsetY < -BOARD_WIDTH / 2) newOffsetY = newOffsetY + BOARD_WIDTH;

      offset.current = { x: newOffsetX, y: newOffsetY };

      if (feedbackBoardRef && feedbackBoardRef.current) {
        feedbackBoardRef.current.style.transform = `translate(calc(-50% - ${offset.current.x}px), calc(-50% - ${offset.current.y}px))`;
      }

      speed.current = {
        x: speed.current.x * 0.86,
        y: speed.current.y * 0.86,
      };

      timer = requestAnimationFrame(slowDown);
    });

    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <div
      ref={feedbackBoardRef}
      onMouseDown={onDown}
      onTouchStart={onDown}
      onMouseUp={onUp}
      onTouchEnd={onUp}
      onMouseMove={onMove}
      onTouchMove={onMove}
      className={`${styles.feedbackBoardContainer} ${
        showClones ? styles.showClones : ''
      }`}
    >
      {children}
    </div>
  );
}

/**
 * 이벤트가 터치 이벤트인지 확인
 * @param e 마우스 또는 터치 이벤트
 * @returns 터치 이벤트 시 터치이벤트 객체 반환, 마우스 이벤트 시 마우스 이벤트 객체 반환
 */
function isTouchEvent(
  e: React.TouchEvent | React.MouseEvent
): e is React.TouchEvent {
  console.log('############# e.type', e.type);
  return e.type.startsWith('touch');
}
