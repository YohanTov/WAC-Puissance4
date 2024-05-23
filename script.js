class Puissance4 {
    constructor(joueur1, joueur2) {
        this.joueur1 = joueur1;
        this.joueur2 = joueur2;
        this.currentPlayer = joueur1;
        this.gameOver = false;
        this.columnCount = parseInt(prompt("Définissez le nombre de colonnes que comportera la grille (7)")) || 7;
        this.rowCount = parseInt(prompt("Définissez le nombre de lignes que comportera la grille (6)")) || 6;

        console.log(`Initialisation du jeu avec ${this.rowCount} lignes et ${this.columnCount} colonnes`);

        let grille = document.createElement("table");
        document.body.appendChild(grille);
        grille.style.backgroundColor = "#1f90ff";
        grille.style.margin = "auto";
        grille.style.border = "15px solid #007fff";
        grille.style.borderRadius = "10px";

        this.grid = [];

        for (let i = 0; i < this.rowCount; i++) {
            let tr = document.createElement("tr");
            tr.style.backgroundColor = "#1f90ff";
            grille.appendChild(tr);

            let row = [];

            for (let k = 0; k < this.columnCount; k++) {
                let td = document.createElement("td");
                td.style.display = "inline-block";
                td.style.border = "5px solid #007fff";
                td.style.width = "80px";
                td.style.height = "80px";
                td.style.backgroundColor = "white";
                td.style.borderRadius = "50%";
                td.style.margin = "8px";
                tr.appendChild(td);
                row.push(td);

                td.addEventListener("click", () => this.Jeton(k));
            }

            this.grid.push(row);
        }
    }

    Jeton(columnIndex) {
        if (this.gameOver) return;

        for (let rowIndex = this.rowCount - 1; rowIndex >= 0; rowIndex--) {
            let cell = this.grid[rowIndex][columnIndex];
            if (cell.style.backgroundColor === "white") {
                cell.style.backgroundColor = this.currentPlayer.couleur;
                console.log(`Jeton placé par le joueur ${this.currentPlayer.id} en position (${rowIndex}, ${columnIndex})`);

                if (this.checkVictory(rowIndex, columnIndex)) {
                    this.gameOver = true;
                    console.log(`Victoire du joueur ${this.currentPlayer.id}`);
                    setTimeout(() => {
                        alert(`Le joueur ${this.currentPlayer.id} a gagné!`);
                        this.disableClicks();
                    }, 100);
                    return;
                }
                this.currentPlayer = this.currentPlayer === this.joueur1 ? this.joueur2 : this.joueur1;
                console.log(`Changement de joueur : maintenant c'est le joueur ${this.currentPlayer.id}`);
                return;
            }
        }
    }

    disableClicks() {
        console.log("Désactivation des clics.");
        for (let row of this.grid) {
            for (let cell of row) {
                cell.replaceWith(cell.cloneNode(true)); // Remplace chaque cellule avec une copie pour enlever les écouteurs de clic
            }
        }
    }

    checkVictory(row, col) {
        const color = this.currentPlayer.couleur;
        return this.checkDirection(row, col, 1, 0, color) || // Horizontal
               this.checkDirection(row, col, 0, 1, color) || // Vertical
               this.checkDirection(row, col, 1, 1, color) || // Diagonal /
               this.checkDirection(row, col, 1, -1, color);  // Diagonal \
    }

    checkDirection(row, col, rowIncrement, colIncrement, color) {
        let count = 1;
        let r = row + rowIncrement;
        let c = col + colIncrement;
        while (this.isValid(r, c) && this.grid[r][c].style.backgroundColor === color) {
            count++;
            r += rowIncrement;
            c += colIncrement;
        }

        r = row - rowIncrement;
        c = col - colIncrement;
        while (this.isValid(r, c) && this.grid[r][c].style.backgroundColor === color) {
            count++;
            r -= rowIncrement;
            c -= colIncrement;
        }

        console.log(`Direction vérifiée pour (${row}, ${col}) avec incréments (${rowIncrement}, ${colIncrement}). Count: ${count}`);
        return count >= 4;
    }

    isValid(row, col) {
        return row >= 0 && row < this.rowCount && col >= 0 && col < this.columnCount;
    }
}

class Joueur {
    constructor(id, couleur) {
        this.id = id;
        this.couleur = couleur;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    let joueur1 = new Joueur(1, "#B22222");
    let joueur2 = new Joueur(2, "#ffd918");
    new Puissance4(joueur1, joueur2);
});
