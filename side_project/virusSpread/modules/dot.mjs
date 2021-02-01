export class Dot {
    constructor(settings) {
        this.peopleSize = settings.peopleSize;
        this.width = settings.socialDistance;
        this.height = settings.socialDistance;
        this.energy = settings.energy;
        this.infected = settings.infected;
        this.pos = [Math.random() * (window.innerWidth * 0.8 - 0.5 * (this.width + this.peopleSize)),
            Math.random() * (window.innerHeight - 0.5 * (this.width + this.peopleSize))
        ];
        this.direction;
        this.immune = false;
        this.infectdDay = 0;
        this.recoverDay = settings.recoverDay;
        this.isRecorded = false;
        this.hasImmuneColor = false;
        this.atCenter = false;
    }
    move(mode) {
        if (mode == "default") {
            this.setDirection()
            let newPos = [
                this.pos[0] + Math.sin(this.direction) * this.energy,
                this.pos[1] + Math.cos(this.direction) * this.energy
            ];
            this.pos[0] = Math.max(Math.min(window.innerWidth * 0.8, (newPos[0] + 0.5 * (this.width + this.peopleSize))) - 0.5 * (this.width + this.peopleSize), 0);
            this.pos[1] = Math.max(Math.min(window.innerHeight, (newPos[1] + 0.5 * (this.height + this.peopleSize))) - 0.5 * (this.height + this.peopleSize), 0);
        } else if (mode == "toCenter") {
            let centerPos = [
                document.getElementById("center").offsetLeft,
                document.getElementById("center").offsetTop
            ];
            let centerSize = [
                document.getElementById("center").offsetWidth,
                document.getElementById("center").offsetHeight
            ];
            this.pos[0] = Math.random() * (((centerPos[0] + centerSize[0]) - 0.5 * (this.width + this.peopleSize)) - (centerPos[0] - 0.5 * (this.width - this.peopleSize))) + (centerPos[0] - 0.5 * (this.width - this.peopleSize));
            this.pos[1] = Math.random() * (((centerPos[1] + centerSize[1]) - 0.5 * (this.height + this.peopleSize)) - (centerPos[1] - 0.5 * (this.height - this.peopleSize))) + (centerPos[1] - 0.5 * (this.height - this.peopleSize));
            this.atCenter = true;
        } else if (mode == "outOfCenter") {
            this.pos = [Math.random() * (window.innerWidth * 0.8 - 0.5 * (this.width + this.peopleSize)),
                Math.random() * (window.innerHeight - 0.5 * (this.height + this.peopleSize))
            ];
            this.atCenter = false;
        }
        if (this.infected) {
            this.infectdDay++;
            if (this.infectdDay >= this.recoverDay) {
                this.recover();
            }
        }
    }
    getInfected() {
        this.infected = true;
    }
    recover() {
        this.infected = false;
        this.immune = true;
    }
    setDirection() {
        this.direction = Math.random() * (Math.PI * 2);
    }
}