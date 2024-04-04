class Estado {
    constructor(ladoHomem, ladoLobo, ladoCabra, ladoAlfafa) {
        this.ladoHomem = ladoHomem;
        this.ladoLobo = ladoLobo;
        this.ladoCabra = ladoCabra;
        this.ladoAlfafa = ladoAlfafa;
    }

    ehValido() {
        if (this.ladoCabra === this.ladoAlfafa && this.ladoHomem !== this.ladoCabra) {
            return false;
        }
        if (this.ladoLobo === this.ladoCabra && this.ladoHomem !== this.ladoCabra) {
            return false;
        }
        return true;
    }

    ehFinal() {
        return this.ladoHomem === 'direita' && this.ladoLobo === 'direita' &&
               this.ladoCabra === 'direita' && this.ladoAlfafa === 'direita';
    }

    proximosEstados() {
        let possiveisEstados = [];

        if (this.ladoHomem === 'esquerda') {
            possiveisEstados.push(new Estado('direita', this.ladoLobo, this.ladoCabra, this.ladoAlfafa));
            if (this.ladoLobo === 'esquerda') {
                possiveisEstados.push(new Estado('direita', 'direita', this.ladoCabra, this.ladoAlfafa));
            }
            if (this.ladoCabra === 'esquerda') {
                possiveisEstados.push(new Estado('direita', this.ladoLobo, 'direita', this.ladoAlfafa));
            }
            if (this.ladoAlfafa === 'esquerda') {
                possiveisEstados.push(new Estado('direita', this.ladoLobo, this.ladoCabra, 'direita'));
            }
        } else {
            possiveisEstados.push(new Estado('esquerda', this.ladoLobo, this.ladoCabra, this.ladoAlfafa));
            if (this.ladoLobo === 'direita') {
                possiveisEstados.push(new Estado('esquerda', 'esquerda', this.ladoCabra, this.ladoAlfafa));
            }
            if (this.ladoCabra === 'direita') {
                possiveisEstados.push(new Estado('esquerda', this.ladoLobo, 'esquerda', this.ladoAlfafa));
            }
            if (this.ladoAlfafa === 'direita') {
                possiveisEstados.push(new Estado('esquerda', this.ladoLobo, this.ladoCabra, 'esquerda'));
            }
        }

        return possiveisEstados.filter(estado => estado.ehValido());
    }
}

function resolverProblema() {
    let estadoInicial = new Estado('esquerda', 'esquerda', 'esquerda', 'esquerda');
    let pilha = [estadoInicial];
    let visitados = new Set();

    while (pilha.length > 0) {
        let estadoAtual = pilha.pop();

        if (estadoAtual.ehFinal()) {
            return estadoAtual;
        }

        visitados.add(JSON.stringify(estadoAtual));

        let proximos = estadoAtual.proximosEstados();
        for (let proximo of proximos) {
            if (!visitados.has(JSON.stringify(proximo))) {
                pilha.push(proximo);
            }
        }
    }

    return null;
}

let solucao = resolverProblema();
if (solucao !== null) {
    console.log("Solução encontrada:");
    console.log("Lado Homem: " + solucao.ladoHomem);
    console.log("Lado Lobo: " + solucao.ladoLobo);
    console.log("Lado Cabra: " + solucao.ladoCabra);
    console.log("Lado Alfafa: " + solucao.ladoAlfafa);
} else {
    console.log("Não foi possível encontrar uma solução.");
}
