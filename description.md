With a number of modifications, Shooters Chess features movement, ammunition and rank. While movement remains the same, shooters do not shoot in the same direction as they move, and rank determines if a shooter is shot down or not. While shooters can be moved in the same turn as attacking another shooter, the move must be declared and followed through.

On a player's turn, they can only shoot and/or move with a single shooter, unless a pair of shooters are bridged. No shooter can move or shoot twice, or shoot with either range irreverant of patterns.

_Declared position_: Destination. Players must declare the positions they plan to move to and shoot from at what target(s) before executing their turn. This is because directions can determine whether a shooter uses their default or alternative range, and if the implied path and direction can be followed by the shooter's movement pattern.

_Adjacent (position)_: Immediate square next to a given position

_Movement Pattern_: Rules for how a shooter can move

_Shooting Pattern_: Rules for what direction a shooter can shoot from its original or declared position if reached

_Default range_: Number of squares from original or declared position that shooter can shoot down a target

_Alternative range_: Number of targets from original to declared position (inclusive) that shooter can potentially shoot down along the path to the declared position

**Player Moves**
_Move and shoot_: Move shooter to an available square with no intermediate targets according to the shooter's movement pattern, then shoot a target using shooter's default range according to the shooter's shooting pattern.
_Shoot in series_: Shoot a number of intermediate targets using shooter's alternative range along the path to the declared position according to the shooter's movement pattern (targets along path do not need to be adjacent)
_Shoot and replace_: Shoot target using shooter's default range according to the shooter's shooting pattern and take its position

_Intermediate target(s)_: Though a position can be chosen using the max number of squares allowed by a shooter's movement pattern, the shooter's ability to reach that position depends on the number of targets along the implied path, including at the declared position. Targets must be shot in order from nearest to original position to farthest.
Refer _Shot-Down_

**Ranks**: All shooters cap at 9, meaning even with unloading, they cannot exceed a rank of 9. The lowest rank is 1. This is why if a shooter attacks a target of its rank or lower, the subtraction results in 0-, taking down the target.

**Shot-Down**
A shooter can shoot down (or remove) a target of the same rank or lower, and only if the target has been shot down can the shooter replace it or move past it. If the target is higher in rank than the shooter, the target's rank is reduced by the shooter's rank and the shooter can only move along the path to the declared position up to the square before the target.

**Tactics**
_Unload_: A shooter can be sacrificed to add its rank to an adjacent shooter
_Bridge_: Two shooters can join on one side. They either move together in one direction, or one rotates around the other to another adjacent position. When shooting a target or being shot, the rank used is the bridged shooter's of a higher rank. However, if one is shot down, they're both shot down.
When bridged shooters move together in one direction, they can only move as many spaces as the shooter with a lower rank can according to their bridge range, but they can move in any direction. If one shooter is rotating around the other though, the moving shooter will use its bridge range for movement pattern and its alternative range for shooting.
Bridging and unbridging are considered movements, meaning players cannot bridge/unbridge and move, or move and bridge/unbridge.

**How to Win**
- Shoot down and/or checkmate both enemy queen and king
- Checkmate remaining enemy queen or king
- Enemy cannot checkmate remaining queen or king

### Pawn
Count: 8
Rank: 1
Movement pattern: 1 square at a right angle from position, or replace 1 shot-down target
Shooting pattern: diagonal from forward or back
Default range: 1
Alternative range: 1
Bridge range: 1

### Bishop
Count: 2
Rank: 3
Movement pattern: max squares at a diagonal, cannot replace a shot-down target
Shooting pattern: right angle from position
Default range: 1
Alternative range: 1
Bridge range: 2

### Knight
Count: 2
Rank: 3
Movement pattern: 2 squares at a right angle, 1 square perpendicular (L-shape), cannot replace a shot-down target using default range
Shooting pattern: diagonal from position
Default range: 1
Alternative range: 2
Bridge range: 3

### Rook
Count: 2
Rank: 5
Movement pattern: max squares at a right angle
Shooting pattern: path of movement, or right angles
Default range: 4
Alternative range: 3
Bridge range: 2

If a rook is moving to a position, either occupied or not, with only one intermediate target, the range of the rook to move and shoot is 4 squares. From its original position or declared position, it can shoot along right angles at a target up to 4 squares away. But if the rook is moving or intends to move and there are intermediate to the declared position, the rook can only shoot down 3 in series.

### Queen
Count: 1
Rank: 9
Movement pattern: max squares in any direction
Shooting pattern: any direction
Default range: 4
Alternative range: 1 | 4
Bridge range: 8

If the queen shoots in any direction other than her movement, she uses her first alternative range, whereas if she is moving to another position with intermediate targets, she shoots with her second alternative range.

### King
Count: 1
Rank: 9
Movement pattern: 1 square in any direction
Shooting pattern: any direction
Default range: 1
Alternative range: 1 | 8
Bridge range: 1

The king has a move called bomber, or self-sacrifice. Sacrificing the king, all surrounding shooters in a 1-square radius are shot, whether enemy or not. Any surrounding shooters of the same rank or lower than the king's are shot down, while the rest are lowered accordingly.
