// Function for computing Mu (NSCP 2015)

function srbAnalysis(As, b, d, fy, fcPrime) {
    let betaOne = 0
    if (fcPrime <= 28) {
        betaOne = 0.85
    } else if (fcPrime >= 55) {
        betaOne = 0.65
    } else {
        let y = 0.85 + ((fcPrime - 28) / (56 - 28)) * (0.65 - 0.85)
        betaOne = y.toFixed(2)
    }
    console.log(`B_1 is ${betaOne}`)
    let rho = As / (b*d)
    let rhoMax = (0.85 * fcPrime * betaOne * 3)/(fy * 7)
    if (rho <= rhoMax) {
        console.log(`Beam is Singly Reinforced`)
    } else {
        console.log(`Beam is Doubly Reinforced`)
    }

    // STEP 1: Check if steel yields, C = T

    let a = (As * fy)/(0.85 * fcPrime * b)

    let c = a / betaOne

    let fs = 600 * ((d - c)/c)

    let Mn = 0

    if (fs > fy) {
        console.log(`Tension steel yields
        let fs = fy`)
        Mn = ((As * fy * (d - (a/2)))/1000**2).toFixed(2)
        console.log(`Mn is ${Mn}kN-m`)
    } else {
        console.log(`Tension steel does not yield
        let fs = 600 (d - c)/c`)
        const A = 1
        const B = (As * 600)/(0.85 * fcPrime * betaOne)
        const C = -(As * 600 * d)/(0.85 * fcPrime * betaOne)
        c = (-B + Math.sqrt((B**2) - 4*A*C))/(2 * A)
        a = betaOne * c
        Mn = ((As * fy * (d - (a/2)))/1000**2).toFixed(2)
        console.log(`Mn is ${Mn}kN-m`)
    }
    // STEP 2: Solve for phi. You can do this by linear interpolation

    let strain = (fs / 200000).toFixed(5)

    let phi = 0
    if (strain > 0.005) {
        phi = 0.90
        console.log(`Φ is ${phi}`)
    } else if (strain < 0.002) {
        phi = 0.65
        console.log(`Φ is ${phi}`)
    } else {
        // console.log(`use your calculator to get the value of phi
        // input in the x: 0.005; y: 0.90 and x: 0.002; y: 0.65
        // then: ${strain}ŷ`)
        // let input = prompt(`Please enter the what you got in your calculator`)

        let y = 0.90 + ((strain - 0.005) / (0.002 - 0.005)) * (0.65 - 0.90)
        phi = y.toFixed(2)
        console.log(`Φ is ${phi}`)
    }

    let Mu = (phi * Mn).toFixed(3)

    return `Mu is ${Mu}`
}

console.log(srbAnalysis(3000, 300, 500, 415, 28))