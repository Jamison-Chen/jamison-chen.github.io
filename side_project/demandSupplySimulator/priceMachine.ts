export class PriceMachine {
    private _numOfPairOut: number;
    private _equilibrium: number;
    constructor(initialEq: number) {
        this._numOfPairOut = 0;
        this._equilibrium = initialEq;
    }
    public get numOfPairOut(): number {
        return this._numOfPairOut;
    }
    public set numOfPairOut(num: number) {
        this._numOfPairOut = num;
    }
    public get equilibrium(): number {
        return this._equilibrium;
    }
    private normalSample(mu: number, std: number): number {
        let u = 0, v = 0;
        while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
        while (v === 0) v = Math.random();
        return std * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v) + mu;
    }

    public genPayableSellable(needCount: boolean): [number, number] {
        if (this._numOfPairOut > 0 && this._numOfPairOut % 20 == 0) {
            // random walking equilibrium
            this._equilibrium *= this.normalSample(1, 0.033);
            this._numOfPairOut++;
        }
        if (needCount) {
            this._numOfPairOut++;
        }
        const a = this.normalSample(this._equilibrium, 0.36);
        const b = this.normalSample(this._equilibrium, 0.36);
        if (a > b) {
            // the first number is the max-payable of a consumer, let it be the bigger one
            return [a, b];
        } else {
            return [b, a];
        }
    }
    // public genPayableSellableAssigned(targetPayable: number, targetSellable: number): [number, number] {
    //     this._numOfPairOut++;
    //     return [this.normalSample(targetPayable, 0.25), this.normalSample(targetSellable, 0.25)];
    // }
}