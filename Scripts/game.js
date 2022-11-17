// Init database.
const db = new Database();

// Read player position.
const getPlayerPosition = (playerId, res = () => {}) => {
    if (playerId !== 1 && playerId !== 2) {console.error("Cannot find player."); return null;}
    let playerPosition = {};
    db.get(`/player${playerId}/positionX`, (x) => {
        playerPosition.x = x;
        db.get(`/player${playerId}/positionY`, (y) => {
            playerPosition.y = y;
            res(playerPosition);
        });
    });
};

const jednostka = "px";

const updatePlayerPosition = (p) => {
    getPlayerPosition(p, (e) => {
        const player = document.getElementsByClassName(`player${p}`)[0];
        player.style.left = e["x"] + jednostka;
        player.style.top = e["y"] + jednostka;
    });
    getPlayerPosition(p, (e) => {
        const player = document.getElementsByClassName(`player${p}`)[0];
        player.style.left = e["x"] + jednostka;
        player.style.top = e["y"] + jednostka;
    });
};
const setPlayerPosition = (p, x, y) => {
    db.set(`/player${p}/positionX`, x);
    db.set(`/player${p}/positionY`, y);
};
updatePlayerPosition(1);
updatePlayerPosition(2);
db.onChange("player1/", "child_changed", (e) => {
    updatePlayerPosition(1);
});
db.onChange("player2/", "child_changed", (e) => {
    updatePlayerPosition(2);
});

const playerSpeed = 10;
const selectedPlayer = 1;

addEventListener('keypress', (event) => {
    if (event.key == "w") {
        getPlayerPosition(selectedPlayer, (e) => {
            setPlayerPosition(selectedPlayer, e["x"], e["y"] - playerSpeed);
        });
    } else if (event.key == "s") {
        getPlayerPosition(selectedPlayer, (e) => {
            setPlayerPosition(selectedPlayer, e["x"], e["y"] + playerSpeed);
        });
    } else if (event.key == "a") {
        getPlayerPosition(selectedPlayer, (e) => {
            setPlayerPosition(selectedPlayer, e["x"] - playerSpeed, e["y"]);
        });
    } else if (event.key == "d") {
        getPlayerPosition(selectedPlayer, (e) => {
            setPlayerPosition(selectedPlayer, e["x"] + playerSpeed, e["y"]);
        });
    }
});