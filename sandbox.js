let treasury = 1000;
let income = 1;
let dodincrease = 0.005;
for (let index = 1; index < 360; index++) {
    let payout = 1 / 360 * treasury;
    treasury = treasury + income - payout;
    console.log(`Day #${index}, income: ${income}, treasury: ${treasury} E, payout: ${payout} E`)
    income += income * dodincrease;
}

// 1y from distribution to claim, afterwards goes to treasury

// $DPPL distribution

// - 40% to membership NFT holders
//   - 1111 @ 1 ETH, 2 ETH, 3 ETH, 5 ETH, 8 ETH, 13 ETH, 21 ETH = 58883 ETH
// - 5% staking $DPPL
// - 5% protocol rewards on approval of lien 50/50 for each side
// - 5% Ape Harmony et.a legacy NFTs hodlers
