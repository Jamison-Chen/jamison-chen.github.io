export class Graph {
    constructor(nodes, edgesAndCosts) {
        this.graph = {};
        for (let i = 0; i < nodes.length; i++) {
            this.graph[String(nodes[i])] = {};
        }
        edgesAndCosts.forEach(each => {
            this.graph[String(each.n1)][String(each.n2)] = each.costs;
            this.graph[String(each.n2)][String(each.n1)] = each.costs;
        });
    }
    getCosts(n1, n2) {
        if (this.graph[String(n1)][String(n2)] != 0 && this.graph[String(n1)][String(n2)] != undefined) {
            return this.graph[String(n1)][String(n2)];
        } else if (String[n1] == String(n2)) {
            return 0;
        }
        return Infinity;
    }
}