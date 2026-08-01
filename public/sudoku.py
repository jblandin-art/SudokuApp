import numpy as np
import random

def load_grid(file_name):
  """
  Reading a sudoku game from a text file
  """
  # Initialize a 9x9 array and fill it with 0 value
  grid = np.zeros((9, 9), dtype=int)

  # Your code here
  # start here
  with open(file_name, "r") as (text):
    for index, line in enumerate(text):
      grid[index] = line.split(" ");



  # end here
  return grid


def generate_sudoku_puzzle(empty_cells=40, seed=None, use_improved_solver=True):
  """
  Generate a playable sudoku puzzle by solving an empty board and then removing
  a number of cells.

  Note: this guarantees the puzzle is solvable by the resolver, but it does not
  guarantee a unique solution.
  """
  rng = random.Random(seed)

  empty_grid = np.zeros((N, N), dtype=int)
  solver_cls = ImprovedSudokuResolver if use_improved_solver else SimpleSudokuResolver
  solver = solver_cls(empty_grid, rng=rng)

  if not solver.find_solution():
    raise ValueError("Could not generate a complete sudoku solution.")

  puzzle = np.copy(solver.grid)
  cells = [(row, col) for row in range(N) for col in range(N)]
  rng.shuffle(cells)

  for row, col in cells[:max(0, min(empty_cells, N * N))]:
    puzzle[row][col] = 0

  return puzzle

from abc import ABC, abstractmethod
import time

N = 9


def all_diff(arr):
  """
  Check if an array contains every number from 1 to 9 exactly once.
  """
  temp_set = set(list(range(1, N + 1, 1)))
  try:
    for value in arr:
      temp_set.remove(int(value))
    return len(temp_set) == 0
  except:
    return False


def is_valid_sudoku_grid(grid):
  """
  Validate a completed 9x9 sudoku grid by checking all rows, columns, and squares.
  This accepts any valid solution, so puzzles may have multiple solutions.
  """
  board = np.array(grid, dtype=int)
  if board.shape != (N, N):
    return False

  for i in range(N):
    if not all_diff(board[i, :]):
      return False
    if not all_diff(board[:, i].reshape(-1)):
      return False
    if not all_diff(board[int(i / 3) * 3:int(i / 3) * 3 + 3, (i % 3) * 3:(i % 3) * 3 + 3].reshape(-1)):
      return False

  return True

class SudokuResolver(ABC):
  def __init__(self, grid, rng=None):
    """
    Initialize the resolver with a grid.
    """
    self.grid = np.copy(grid)
    self.rng = rng or random.Random()

  @abstractmethod
  def try_num(self, row: int, col: int) -> bool:
    """
    Recursive Function to try assign a value to a cell
    """
    pass

  def find_solution(self) -> bool:
    """
    In this function, we will start with cell(0, 0) and go on to find a solution
    """
    st = time.time()
    result = self.try_num(0, 0)
    et = time.time()
    elapsed_time = et - st
    print('Execution time:', elapsed_time, 'seconds')
    print()
    return result

  def print_grid(self):
    """
    Printing the grid
    """
    for i in range(N):
      for j in range(N):
        print(self.grid[i][j], end = " ")
      print()

  def alldiff(self, arr):
    """
    Check if all values in an array are different from 1 to 9
    """
    return all_diff(arr)

  def get_square_arr(self, square_index):
    """
    Get square values by index, then convert it into an array
    """
    start_row = int(square_index / 3) * 3
    start_col = (square_index % 3) * 3
    arr = self.grid[start_row: start_row + 3, start_col: start_col + 3].reshape(-1)
    return arr

  def check_grid(self):
    """
    Check if the currrent grid is a good solution
    """
    result = True
    for i in range(N):
      # Check alldiff in a row
      result = result and self.alldiff(self.grid[i,:])
      # Check alldiff in a col
      result = result and self.alldiff(self.grid[:,i].reshape(-1))
      # Check alldiff in a square
      result = result and self.alldiff(self.get_square_arr(i))

    return result

class BaseSudokuResolver(SudokuResolver):
  def __init__(self, grid, rng=None):
    super().__init__(grid, rng=rng)

  def is_safe_in_row(self, row: int, num: int) -> bool:
    """
    Checking if a number is not filled in a row yet
    Return: bool
    """
    ## Remove "pass" and add your codes here
    if num in self.grid[row]:
      return False
    else:
      return True


    # End your code


  def is_safe_in_col(self, col: int, num: int) -> bool:
    """
    Checking if a number is not filled in a col yet
    Return: bool
    """
    ## Remove "pass" and add your codes here
    for row in self.grid:
      if row[col] == num:
        return False
    return True
    # End your code


  def square_from_position(self, row: int, col: int) -> int:
    """
    Find the square index from row and col value
    """
    ## Remove "pass" and add your codes here
    square = ((row) // 3) * 3
    square += ((col) // 3)
    return square

    # End your code


  def is_safe_in_square(self, square: int, num: int) -> bool:
    """
    Checking if a number is not filled in a square yet
    Return: bool
    """
    ## Remove "pass" and add your codes here
    if num in self.get_square_arr(square):
      return False
    else:
      return True


    # End your code


  def is_safe_num(self, row: int, col: int, num: int) -> bool:
    """
    Checking if a number is good to fill in a cell(row, col)
    Return: bool
    """
    ## Remove "pass" and add your codes here
    if self.is_safe_in_row(row, num) and self.is_safe_in_col(col, num) and self.is_safe_in_square(self.square_from_position(row, col), num):
      return True
    else:
      return False


    # End your code


  def try_num(self, row: int, col: int) -> bool:
    return False

#grid_easy = load_grid("sudoku_easy.txt")
#grid_expert = load_grid("sudoku_expert.txt")

class SimpleSudokuResolver(BaseSudokuResolver):
  def try_num(self, row, col):
    """
    This is a Recursive Function to find a number to fill into a cell(row, col).
    We will start with the cell(0, 0)

    Return:
      - True if found a solution
      - False if no solution found
    """
    ## Remove "pass" and add your codes here
    #Base Case Reached 9th row
    if row > 8 or (row == 8 and col == 9):
      return True
    #If the value of that cell is greater than 0, go to next cell (row, col + 1) or (row + 1, 0) if col == 8.
    if self.grid[row][col] > 0:
      if col == 8:
        return self.try_num(row + 1, 0)
      else:
        return self.try_num(row, col + 1)

    #If the value of that cell equals 0, try to set this cell to a value from 1 to 9 if it is a safe number (using is_safe_num function)
    nums = list(range(1, 10))
    self.rng.shuffle(nums)
    for i in nums:
      if row == 8 and col == 8 and self.is_safe_num(row, col, i):
        self.grid[row][col] = i
        return True
      if self.is_safe_num(row, col, i):
        self.grid[row][col] = i
        #With each value, go to next cell by calling try_num(row, col + 1) or try_num(row + 1, 0)
        if col == 8:
          if self.try_num(row + 1, 0):
            return True
        else:
          if self.try_num(row, col + 1):
            return True
        #If can not find a solution, set that cell to 0 again and come back to the previous cell
        self.grid[row][col] = 0
    #Return False if we can not find a solution
    return False





    # End your code

class ImprovedSudokuResolver(BaseSudokuResolver):
  def __init__(self, grid, rng=None):
    super().__init__(grid, rng=rng)

    self.avai_rows = [set(list(range(1, N+1, 1))) for i in range(N)]
    self.avai_cols = [set(list(range(1, N+1, 1))) for i in range(N)]
    self.avai_squares = [set(list(range(1, N+1, 1))) for i in range(N)]

    ## TODO: Compute 3 avail arrays
    # Your code here
    # start here
    for rowIndex, row in enumerate(self.grid):
      for colIndex, num in enumerate(row):
        if num == 0:
          continue
        if num in self.avai_rows[rowIndex]:
          self.avai_rows[rowIndex].remove(num)
        if num in self.avai_cols[colIndex]:
          self.avai_cols[colIndex].remove(num)

        squareIndex = self.square_from_position(rowIndex, colIndex)
        if num in self.avai_squares[squareIndex]:
          self.avai_squares[squareIndex].remove(num)
    # end here


  def try_num(self, row: int, col: int) -> bool:
    ## Remove "pass" and add your codes here
    # Base Case, If found a solution (i.e., satisfy the constraints as mentioned above ), return True
    if row > 8 or (row == 0 and col > 8):
      return True
    #If the value of that cell is greater than 0, go to next cell (row, col + 1) or (row + 1, 0) if col == 8.
    if self.grid[row][col] > 0:
      if col == 8:
        return self.try_num(row + 1, 0)
      else:
        return self.try_num(row, col + 1)
    #If the value of that cell equals 0, try to set this cell to a value that is in intersection of 3 sets avai_rows, avai_cols, avai_squares,
    #then remove that value from 3 sets.Hint: Using set.intersection() to get the intersection set.
    if self.grid[row][col] == 0:
      intersection = self.avai_rows[row].intersection(self.avai_cols[col]).intersection(self.avai_squares[self.square_from_position(row, col)])
      if intersection:
        nums = list(intersection)
        self.rng.shuffle(nums)
        for num in nums:
          self.grid[row][col] = num
          self.avai_rows[row].remove(num)
          self.avai_cols[col].remove(num)
          self.avai_squares[self.square_from_position(row, col)].remove(num)
          #With each value, go to next cell by calling try_num(row, col + 1) or try_num(row + 1, 0)
          if col == 8:
            if self.try_num(row + 1, 0):
              return True
          else:
            if self.try_num(row, col + 1):
              return True
          #If can not find a solution, set that cell to 0 again, add that value back to 3 sets, and come back to the previous cell.
          self.grid[row][col] = 0
          self.avai_rows[row].add(num)
          self.avai_cols[col].add(num)
          self.avai_squares[self.square_from_position(row, col)].add(num)
      #Return False if we can not find a solution
      return False


    # End your code

#puzzle = generate_sudoku_puzzle(empty_cells=45, seed=42)
#print(puzzle)

#solver2 = ImprovedSudokuResolver(puzzle)

#if solver2.find_solution() and solver2.check_grid():
  #print("Found a solution:")
  #solver2.print_grid()
#else:
  #print("No solution or invalid solution found!")

# Example generator usage:
