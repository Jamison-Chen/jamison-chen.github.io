export class Dot {
    constructor(settings) {
        this.width = settings.socialDistance;
        this.height = settings.socialDistance;
        this.energy = settings.energy;
        this.infected = settings.infected;
        this.pos = [Math.random() * (window.innerWidth * 0.8 - this.width),
            Math.random() * (window.innerHeight - this.height)
        ];
        this.direction;
        this.immune = false;
        this.infectdDay = 0;
        this.recoverDay = settings.recoverDay;
        this.isRecorded = false;
        this.hasImmuneColor = false;
    }
    move(direction) {
        this.setDirection(direction)
        let newPos = [
            this.pos[0] + Math.sin(this.direction) * this.energy,
            this.pos[1] + Math.cos(this.direction) * this.energy
        ];
        this.pos[0] = Math.max(Math.min(window.innerWidth * 0.8, (newPos[0] + this.width)) - this.width, 0);
        this.pos[1] = Math.max(Math.min(window.innerHeight, (newPos[1] + this.height)) - this.height, 0);
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
    setDirection(direction) {
        if (direction) {
            this.direction = direction;
        } else {
            this.direction = Math.random() * (Math.PI * 2);
        }
    }
}