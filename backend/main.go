package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

var grid = [][]int{
	{0, 0, 0, 1, 0},
	{0, 1, 0, 1, 0},
	{0, 1, 0, 0, 0},
	{0, 0, 0, 1, 0},
	{1, 1, 0, 0, 0},
}

var direct = [][2]int{
	{-1, 0}, {1, 0}, {0, -1}, {0, 1},
}

type Request1 struct {
	Start [2]int "json:start"
	End   [2]int "json:end"
}

func isValid(x, y int, visited [][]bool) bool {
	return x >= 0 && x < len(grid) && y >= 0 && y < len(grid[0]) && grid[x][y] == 0 && !visited[x][y]
}

func dfs(x, y int, endX, endY int, visited [][]bool, path *[][2]int) bool {
	if x == endX && y == endY {
		*path = append(*path, [2]int{x, y})
		return true
	}
	visited[x][y] = true
	*path = append(*path, [2]int{x, y})

	for _, dir := range direct {
		newX, newY := x+dir[0], y+dir[1]
		if isValid(newX, newY, visited) {
			if dfs(newX, newY, endX, endY, visited, path) {
				return true
			}
		}
	}

	*path = (*path)[:len(*path)-1]
	return false

}

func dfsHan(c *fiber.Ctx) error {
	var req Request1
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid 123"})
	}

	startX, startY := req.Start[0], req.Start[1]
	endX, endY := req.End[0], req.End[1]

	// if !isValid(startX, startY, make([][]bool, len(grid))) || !isValid(endX, endY, make([][]bool, len(grid))) {
	// 	return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid"})
	// }

	visited := make([][]bool, len(grid))
	for i := range visited {
		visited[i] = make([]bool, len(grid[0]))

	}

	var path [][2]int
	if dfs(startX, startY, endX, endY, visited, &path) {
		return c.JSON(fiber.Map{"path": path})
	} else {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "No path"})
	}

}

func main() {
	app := fiber.New()
	app.Use(cors.New())

	app.Post("/find-path", dfsHan)

	app.Listen(":4000")

}
