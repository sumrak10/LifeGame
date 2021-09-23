class Life {
    constructor (rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.agesNum = 0;
        this.liveCells = 0;

        this.map = [];
        for (let y = 0; y < this.rows; y++) {
            const row = []

            for (let x = 0; x < this.columns; x++) {
                const stat = []
                
                stat.push(false, 0, 0, 0);
    
                row.push(stat)

            }

            this.map.push(row)
        }
    }
    changeAge() {
        const map = [];
        this.liveCells = 0;
        for (let y = 0; y < this.rows; y++) {
            const row = []
            let sunEnergy = 0;
            if (y <= (this.rows)) {
                sunEnergy = ( (this.rows) -  y) / (this.rows)*2;
            } else {
                sunEnergy = 0;
            }
            for (let x = 0; x < this.columns; x++) {
                const stat = []
                
                let l = this.getCell(x,y,0)
                let e = this.getCell(x,y,1)
                let col = this.getCell(x,y,2)
                let ages = this.getCell(x,y,3)

                if (l) { 
                    if ( ( (e-1+sunEnergy) < 5 ) || ( ages > 50) ) {
                        stat.push(false, 3, 0, 0)
                    } else {
                        stat.push(true, e-1+(sunEnergy*mapInt(col, 0, 256, 0, 1.5)), col, ages+1);
                        this.liveCells += 1;
                    }
                } else {
                    stat.push(false, e, 0, 0)
                }
                row.push(stat)

            }

            map.push(row)
        }
        this.map = map
        this.divideCells();
        this.map = map
        this.agesNum++
    }
    divideCells() {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.columns; x++) {
                let e = this.getCell(x,y,1)
                let col = this.getCell(x,y,2)
                let ages = this.getCell(x,y,3)
                if (e >= 20) {
                    this.setCell(x,y,1,10)
                    this.setCell(x,y,2,col)
                    this.setCell(x,y,3,0)
                    let n = Math.floor(Math.random() * 4)
                    if (n == 0) {
                        this.setCell(x,y-1,3,0)
                        this.setCell(x,y-1,2,col)
                        this.setCell(x,y-1,1,10)
                        this.setCell(x,y-1,0,true)
                    } else if (n == 1) {
                        this.setCell(x+1,y,3,0)
                        this.setCell(x+1,y,2,col)
                        this.setCell(x+1,y,1,10)
                        this.setCell(x+1,y,0,true)
                    } else if (n == 2) {
                        this.setCell(x,y+1,3,0)
                        this.setCell(x,y+1,2,col+(Math.floor(Math.random() * 5) -2.5 ) )
                        this.setCell(x,y+1,1,10)
                        this.setCell(x,y+1,0,true)
                    } else if (n == 3) {
                        this.setCell(x-1,y,3,0)
                        this.setCell(x-1,y,2,col)
                        this.setCell(x-1,y,1,10)
                        this.setCell(x-1,y,0,true)
                    }
                }
            }
        }
    }
    reviveRandomCells (n = 1) {
        const freeCells = []
        this.liveCells = n;
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.columns; x++) {
                if (this.getCell(x, y, 0) === false) {
                    freeCells.push({ x, y})
                }
            }
        }
        n = parseInt(n)
        n = Math.min(n, freeCells.length)
        while (n-- > 0) {
            const index = Math.floor(Math.random() * freeCells.length)
            const { x, y } = freeCells.splice(index, 1)[0]
            let col = Math.floor(Math.random() * 150)
            this.setCell(x, y, 0, true)
            this.setCell(x, y, 1, 10)
            this.setCell(x, y, 2, col)
        }
    }
    getCell (x, y, z) {
        if (x < 0 || x >= this.columns || y < 0 || y >= this.rows) {
            return true
        }

        return this.map[y][x][z]
    }

    setCell (x, y, z, value) {
        if (x < 0 || x >= this.columns || y < 0 || y >= this.rows) {
            return value
        }

        return this.map[y][x][z] = value
    }
}