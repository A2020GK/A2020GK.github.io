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

function solveMaze(maze, fromx, fromy, tox, toy) {
    // Создание пустой матрицы для фиксирования посещённых ячеек
    let visited = [];
    for (let i = 0; i < maze.rows; i++) {
        visited[i] = [];
        for (let j = 0; j < maze.cols; j++) {
            visited[i][j] = false;
        }
    }

    // Создание пустого стека для хранения текущего пути
    let stack = [];

    // Получение начальной ячейки и отметка её как посещённой
    let startCell = maze[fromx][fromy];
    visited[fromx][fromy] = true;

    // Добавление начальной ячейки в стек
    stack.push(startCell);

    // Создание пустого списка для хранения команд
    let commands = [];

    // Пока стек не пуст
    while (stack.length > 0) {
        // Получение текущей ячейки
        let currentCell = stack[stack.length - 1];

        // Если текущая ячейка равна конечной ячейке, выход из цикла
        if (currentCell.row === tox && currentCell.col === toy) {
            break;
        }

        // Получение соседей текущей ячейки
        let neighbors = getNeighbors(maze, currentCell.row, currentCell.col);

        // Проверка на наличие неосвобожденных соседей
        let unvisitedNeighbors = neighbors.filter(neighbor => !visited[neighbor.row][neighbor.col]);

        if (unvisitedNeighbors.length > 0) {
            // Получение случайного неосвобожденного соседа
            let randomNeighbor = unvisitedNeighbors[Math.floor(Math.random() * unvisitedNeighbors.length)];

            // Пометка выбранного неосвобожденного соседа как посещённого и добавление его в стек
            visited[randomNeighbor.row][randomNeighbor.col] = true;
            stack.push(randomNeighbor);

            // Определение команды для движения к выбранному соседу
            if (randomNeighbor.row < currentCell.row) {
                commands.push("up");
            } else if (randomNeighbor.row > currentCell.row) {
                commands.push("down");
            } else if (randomNeighbor.col < currentCell.col) {
                commands.push("left");
            } else if (randomNeighbor.col > currentCell.col) {
                commands.push("right");
            }
        } else {
            // Нет неосвобожденных соседей, текущая ячейка равна последнему (удалённому элементу стека)
            stack.pop();
            commands.push("back");
        }
    }

    // Возврат списка команд для прохождения лабиринта
    return commands;
}