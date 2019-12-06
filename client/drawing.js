var boardObjects = [];

function pushObject(object, x, y) {
    if (boardObjects[y]) boardObjects[y][x] = object;
    else boardObjects[y] = [object];
}

function drawItem(item, x, y) {
    xPos = (x - 1) * 16;
    yPos = (y - 1) * 16;
    switch (item) {
        case 'Apple':
            object = game.add.image(xPos, yPos, "Apple").setOrigin(0);
            pushObject(object, x, y);
            break;
        case 'Body':
        case 'Head':
            object = game.add.image(xPos, yPos, "Snake").setOrigin(0);
            pushObject(object, x, y);
            break;
        default:
            pushObject(null, x, y);
    }
}

function drawBoard(size) {
    createBoard(size, drawItem);
}

function drawSnake() {
    createSnake(updateImage);
}

function drawGame(size=15) {
    startGame(size, drawBoard, drawSnake, drawApple);
}

function updateImage(coordinate, value) {
    x = coordinate[0]
    y = coordinate[1]
    if (boardObjects[y][x]) boardObjects[y][x].destroy();

    updateBoard(coordinate, value, drawItem);
}

function drawMove() {
    move(updateImage, drawScore, drawDeath);
}

function drawApple() {
    addApple(updateImage);
}

function drawDeath() {
    die();

    boardObjects.forEach(row => {
        row.forEach(item => {
            if (item) item.destroy();
        })
    })

    game.scene.start('End');
}

function drawScore() {
    score(drawApple);
}