from abc import ABC, abstractmethod
class NimWorldAdversarial(ABC):

  def __init__(self, pile):
    '''
    Initializes the game stick pile as a list.

    - pile: The pile will contains two sub-piles of sticks, referred to as pile 0 and pile 1.
    '''
    self.pile = pile

  @abstractmethod
  def userMove(self):
    '''
    Defines the user's move.
    '''
    pass

  @abstractmethod
  def checkWin(self, pile):
    '''
    Checks if someone has won the game.
    Requires the pile argument.
    Returns True or False.
    '''
    pass

  @abstractmethod
  def computerMove(self):
    '''
    Defines the computer's move.
    '''
    pass

  @abstractmethod
  def play(self):
    '''
    Controls the game flow.
    '''
    pass

  @abstractmethod
  def removeStick(self, selection, number):
    '''
    Removes a stick from the pile based on selected
    sub-pile and number of sticks to be removed.
    '''
    pass

class NimWorldBasic(NimWorldAdversarial):

  def __init__(self, pile):
    # initializes our pile
    self.pile = pile

# complete the following methods
  def removeStick(self, selection, number):
    '''
    Removes stick from the pile.
    No return.
    '''
    # your code here
    self.pile[selection] = self.pile[selection] - number


  def userMove(self):
    '''
    Collects and validates the user's move selection (gets user input for subpile selection and number of sticks selection).
    No return.
    '''
    # your code here
    validPile = False
    while validPile is not True:
      subpile = input("What pile you choosin twun? ")
      if subpile.isdigit() and int(subpile) < (len(self.pile)) and self.pile[int(subpile)] != 0:
        subpile = int(subpile)
        validPile = True
      else:
        print("\nNah that input aint it, provide a valid index for the pile.\n")

    isValid = False
    while isValid is not True:
      number = input("How many sticks you pickin twun? ")
      if number.isdigit() and int(number) <= self.pile[subpile] and int(number) != 0:
        isValid = True
        number = int(number)
        self.removeStick(subpile, number)
      else:
        print("\nNah that input aint it, provide a valid number of sticks to remove.\n------------------------------------\n")


  def computerMove(self):
    '''
    Calls userMove(). Will be overwritten in later sections.
    No return.
    '''
    # your code here
    self.userMove()

  def checkWin(self, pile):
      '''
      Checks whether a player has won.
      Returns True (someone won) or False (nobody won).
      '''
      # your code here
      return all(subpile == 0 for subpile in pile)


  def play(self):
      '''
      This function is called on the NimWorldBasic object to start the game.
      We will be using this function in all our classes.
      No return.
      '''
      # your code here
      players = ["Computer", "Player"]
      rounds = 1
      player = True
      while(True):
        print(f"\n------------------------------------\nIt is round {rounds} and it is the {players[int(player)]}'s turn.")
        for index, subpile in enumerate(self.pile):
          print(f"Pile {index}: Has {subpile} sticks.")
        print("\n")
        if player:
          self.userMove()
        else:
          self.computerMove()
        if self.checkWin(self.pile):
          player = not player
          print(f"\n{players[int(player)]} won the game!")
          return
        player = not player
        rounds += 1

class NimWorldMinimax(NimWorldBasic):

  def computerMove(self):
    '''
    Overwrites NimWorldBasic's computerMove() function to allow
    the computer player to autonomously select its next move.
    No return. example: self.pile[4, 5]
    '''
    # your code here
    moves = self.getChildren(self.pile)
    bestMoveScore = -10
    bestMove = None
    for move in moves:
      score = self.minimax(move, False)
      #print(f"\nThis is a score:{score} for move: {move}")
      if score > bestMoveScore:
        bestMoveScore = score
        bestMove = move
    pileSelection = 0
    number = 0
    if bestMove is None:
        for index, subpile in enumerate(moves[0]):
          #print(f"\ndebug\n-----------------------------------\nself pile is: {self.pile[index]}\n subpile is: {subpile}\nBest Move is: {bestMove}")
          if (self.pile[index] != subpile):

            pileSelection = index
            number = self.pile[index] - subpile

        self.removeStick(pileSelection, number)
        print(f"The computer removed {number} sticks from Pile: {pileSelection}")
        return
    for index, subpile in enumerate(bestMove):
      #print(f"\ndebug\n-----------------------------------\nself pile is: {self.pile[index]}\n subpile is: {subpile}\nBest Move is: {bestMove}")
      if (self.pile[index] != subpile):

        pileSelection = index
        number = self.pile[index] - subpile

    self.removeStick(pileSelection, number)
    print(f"The computer removed {number} sticks from Pile: {pileSelection}")

  def minimax(self, pile, isMaximizing):
      '''
      Implements the minimax logic.
      Returns 1 or -1.
      '''
      # your code here
      #return 1
      #print(f"\nThis is the working pile: {pile}\n")
      frontier = self.getChildren(pile)
      #print(f"\nThis is a frontier: {frontier}\n")

      # base case: pile passed in is all zeros
      if self.checkWin(pile):
        return 1 if isMaximizing else -1
      # base case
      ## recursive case: the node we are on is not the goal node, if isMaximizing is true then
      if isMaximizing:
        #print(f"isMaximizing: {frontier}")
        bestValue = -100
        if(len(frontier) != 0):
          for child in frontier:
            #print(f"\n\n\n{self.getChildren(child)}\n------------------\n{child}\n\n\n")
            #print(f"\nThis is the working pile: {child}\n")
            value = self.minimax(child, not isMaximizing)
            if value > bestValue:
              bestValue = value
              #print(f"The best value is {bestValue} from child: {child}")
          return bestValue
        else:
          return -1
      else:
        #print(f"notMaximizing: {frontier}")
        bestValue = 100
        if(len(frontier) != 0):
          for child in frontier:
            #print(f"\n\n\n{self.getChildren(child)}\n------------------\n{child}\n\n\n")
            #print(f"\nThis is the working pile: {child}\n")
            value = self.minimax(child, not isMaximizing)
            if value < bestValue:
              bestValue = value
              #print(f"The best value is {bestValue} from child: {child}")

          #print(f"The best value is {bestValue}")
          return bestValue
        else:
          return 1

  def getChildren(self, pile):
    moves = []

    for index, subpile in enumerate(pile):
        for x in range(0, subpile):
            newPile = pile.copy()
            newPile[index] = x
            moves.append(newPile)
    return moves
class NimWorldABMinimax(NimWorldMinimax):

  def minimax(self, pile, alpha, beta, isMaximizing):
      '''
      Overwrites NimWorldMinimax's minimax() function to implement
      alpha-beta pruning.
      Returns 1 or -1
      '''
      # your code here
      #return 1
      #print(f"\nThis is the working pile: {pile}\n")
      frontier = self.getChildren(pile)
      #print(f"\nThis is a frontier: {frontier}\n")

      # base case: pile passed in is all zeros
      if self.checkWin(pile):
        return 1 if isMaximizing else -1
      # base case
      ## recursive case: the node we are on is not the goal node, if isMaximizing is true then
      #print(f"\nThis is the working pile: {pile}\n")
      if isMaximizing:
        #print(f"isMaximizing: {frontier}")
        if len(frontier) != 0:
          #print("HEYYYYY")
          bestValue = -100
          for child in frontier:
            value = self.minimax(child, alpha, beta, not isMaximizing)
            if value > bestValue:
              bestValue = value
            if value >= beta:
              #print(f"bestValue is: {bestValue} and value is: {value} > beta: {beta}")
              return bestValue
            alpha = max(bestValue, alpha)
          return bestValue
        else:
          return -1
      else:
        #print(f"notMaximizing: {frontier}")
        if len(frontier) != 0:
          #print("HEYYYYY")
          bestValue = 100
          for child in frontier:
            value = self.minimax(child, alpha, beta, not isMaximizing)
            if value < bestValue:
              bestValue = value
            #else:
              #print(f"hey value: {value} and bestValue: {bestValue}")
            if value <= alpha:
              return bestValue
            beta = min(bestValue, beta)
          return bestValue
        else:
          return 1

  def getChildren(self, pile):
    moves = []

    for index, subpile in enumerate(pile):
        for x in range(0, subpile):
            newPile = pile.copy()
            newPile[index] = x
            moves.append(newPile)
    return moves
  def computerMove(self):
      '''
      Overwrites NimWorldMinimax's computerMove() function to implement
      alpha-beta pruning.
      '''
      # your code here
      for index, subpile in enumerate(self.pile):
        print(f"Pile {index}: Has {subpile} sticks.")
      print("\n")

      if self.checkWin(self.pile):
        return

      moves = self.getChildren(self.pile)
      bestMoveScore = -10
      bestMove = None
      for move in moves:
        score = self.minimax(move, -100, 100, False)
        #print(f"\nThis is a score: {score} for move: {move}")
        if score > bestMoveScore:
          bestMoveScore = score
          bestMove = move
      pileSelection = 0
      number = 0
      if bestMove is None:
        for index, subpile in enumerate(moves[0]):
          #print(f"\ndebug\n-----------------------------------\nself pile is: {self.pile[index]}\n subpile is: {subpile}\nBest Move is: {bestMove}")
          if (self.pile[index] != subpile):

            pileSelection = index
            number = self.pile[index] - subpile

        self.removeStick(pileSelection, number)
        print(f"The computer removed {number} sticks from Pile: {pileSelection}")
        return {"pileSelection": pileSelection, "number": number}
      for index, subpile in enumerate(bestMove):
        #print(f"\ndebug\n-----------------------------------\nself pile is: {self.pile[index]}\n subpile is: {subpile}\nBest Move is: {bestMove}")
        if (self.pile[index] != subpile):

          pileSelection = index
          number = self.pile[index] - subpile

      self.removeStick(pileSelection, number)
      print(f"The computer removed {number} sticks from Pile: {pileSelection}")
      return {"pileSelection": pileSelection, "number": number}
#nimAB = NimWorldABMinimax([1, 3, 5, 7])
#nimAB.play()

