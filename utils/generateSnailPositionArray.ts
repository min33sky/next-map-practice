/**
 * n = 3 일 때,
 * 0 1 2
 * 7 8 3
 * 6 5 4
 * 의 달팽이 배열이 나오고,
 * return 값은 [{ row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }, { row: 1, col: 2 }, ... , { row: 2, col: 2 }]
 */
export function generateSnailPositionArray(n: number) {
  const snailPositionArray: Array<SnailPosition> = Array(n ** 2).fill(null);
  const snailIndexArray = Array(n ** 2).fill(-1); // -1로 초기화 (아직 방문하지 않은 경우로 설정)

  let direction: Direction = 'right'; // 이동 방향 (시계 방향으로 이동)
  let row = 0;
  let col = 0;

  //? 시계 방향으로 달팽이 배열을 만들어서 snailPositionArray에 저장
  for (let count = 0; count < snailIndexArray.length; count++) {
    snailPositionArray[count] = {
      col,
      row,
    };

    snailIndexArray[row * n + col] = count;

    switch (direction) {
      case 'right': {
        //? 오른쪽으로 이동할 수 있으면 이동, (-1인 경우는 아직 방문하지 않은 경우이므로 이동 가능)
        if (col + 1 < n && snailIndexArray[row * n + col + 1] === -1) {
          col += 1;
        } else {
          direction = 'bottom';
          row += 1;
        }
        break;
      }

      case 'bottom': {
        //? 아래쪽으로 이동할 수 있으면 이동, (-1인 경우는 아직 방문하지 않은 경우이므로 이동 가능)
        if (row + 1 < n && snailIndexArray[(row + 1) * n + col] === -1) {
          row += 1;
        } else {
          direction = 'left';
          col -= 1;
        }

        break;
      }

      case 'left': {
        //? 왼쪽으로 이동할 수 있으면 이동, (-1인 경우는 아직 방문하지 않은 경우이므로 이동 가능)
        if (col - 1 >= 0 && snailIndexArray[row * n + col - 1] === -1) {
          col -= 1;
        } else {
          direction = 'up';
          row -= 1;
        }

        break;
      }

      case 'up': {
        //? 위쪽으로 이동할 수 있으면 이동, (-1인 경우는 아직 방문하지 않은 경우이므로 이동 가능)
        if (row - 1 >= 0 && snailIndexArray[(row - 1) * n + col] === -1) {
          row -= 1;
        } else {
          direction = 'right';
          col += 1;
        }

        break;
      }
    }
  }

  return snailPositionArray;
}

type Direction = 'left' | 'right' | 'up' | 'bottom';

type SnailPosition = {
  row: number;
  col: number;
};
