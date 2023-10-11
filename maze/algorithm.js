// Данный код представляет функцию `generateMaze`, которая генерирует лабиринт на основе заданных количества строк и столбцов.

// Функция начинает с создания сетки лабиринта с размерами `rows`x`cols`, в которой каждая ячейка имеет все стены (top, right, bottom, left) и помечена как непосещенная.

// Затем выбирается случайная стартовая ячейка.

// Далее, используется алгоритм глубокого поиска (алгоритм "backtracking") для создания лабиринта.

// Алгоритм проходит по каждой ячейке лабиринта, помечая ее как посещенную и добавляя ее в стек. Затем он находит непосещенных соседей текущей ячейки и добавляет их в массив `neighbors`. Если у текущей ячейки есть непосещенные соседи, то из этих соседей выбирается случайный сосед `randomNeighbor`. Далее, стенка между текущей ячейкой и выбранным соседом удаляется путем установки соответствующих флагов (`top`, `right`, `bottom`, `left`) в false. Выбранный сосед помечается как посещенный и добавляется в стек. Текущая ячейка обновляется в выбранного соседа. Если у текущей ячейки нет непосещенных соседей, то она удаляется из стека и текущая ячейка обновляется в последний элемент стека.

// Процесс повторяется, пока стек не станет пустым, то есть все ячейки лабиринта будут посещены.

// В конце функция возвращает сгенерированный лабиринт в виде объекта, содержащего лабиринт `maze` и его размеры `rows` и `cols`.
function generateMaze(rows, cols) {
  // Создание сетки со всеми стенами изначально нетронутыми
  const maze = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      top: true,
      right: true,
      bottom: true,
      left: true,
      visited: false,
    }))
  );

  // Установка стартовой ячейку
  const startRow = Math.floor(Math.random() * rows);
  const startCol = Math.floor(Math.random() * cols);
  let currentCell = { row: startRow, col: startCol };

  // Алгоритм глубокого поиска для создания лабиринта
  const stack = [currentCell];
  maze[currentCell.row][currentCell.col].visited = true;

  while (stack.length > 0) {
    const neighbors = [];

    // Поиск непосещённых соседей
    if (currentCell.row > 0 && !maze[currentCell.row - 1][currentCell.col].visited)
      neighbors.push({ row: currentCell.row - 1, col: currentCell.col });
    if (currentCell.row < rows - 1 && !maze[currentCell.row + 1][currentCell.col].visited)
      neighbors.push({ row: currentCell.row + 1, col: currentCell.col });
    if (currentCell.col > 0 && !maze[currentCell.row][currentCell.col - 1].visited)
      neighbors.push({ row: currentCell.row, col: currentCell.col - 1 });
    if (currentCell.col < cols - 1 && !maze[currentCell.row][currentCell.col + 1].visited)
      neighbors.push({ row: currentCell.row, col: currentCell.col + 1 });

    if (neighbors.length > 0) {
      // Выборка случайного соседа
      const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];

      // Снятие стенки между текущей ячейкой и выбранным соседом
      if (randomNeighbor.row === currentCell.row - 1) {
        maze[currentCell.row][currentCell.col].top = false;
        maze[randomNeighbor.row][randomNeighbor.col].bottom = false;
      } else if (randomNeighbor.row === currentCell.row + 1) {
        maze[currentCell.row][currentCell.col].bottom = false;
        maze[randomNeighbor.row][randomNeighbor.col].top = false;
      } else if (randomNeighbor.col === currentCell.col - 1) {
        maze[currentCell.row][currentCell.col].left = false;
        maze[randomNeighbor.row][randomNeighbor.col].right = false;
      } else if (randomNeighbor.col === currentCell.col + 1) {
        maze[currentCell.row][currentCell.col].right = false;
        maze[randomNeighbor.row][randomNeighbor.col].left = false;
      }

      // Отметка избранного соседа как посещённого и отправка его в стек
      maze[randomNeighbor.row][randomNeighbor.col].visited = true;
      stack.push(randomNeighbor);
      currentCell = randomNeighbor;
    } else {
      // Нет неосвобожденных соседей, текущая ячейка равна последнему (удалённому элементу стека)
      currentCell = stack.pop();
    }
  }

  // Возврат сгенерированный лабиринт и его размеры
  return {
    maze: maze,
    rows: rows,
    cols: cols,
  };
}