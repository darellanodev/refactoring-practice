function statement (invoice, games) {
    let totalAmount = 0
    let volumeCredits = 0

    let result = `Statement for ${invoice.customer}\n`

    const format = new Intl.NumberFormat("en-US", 
        {
            style: "currency", 
            currency: "USD", 
            minimumFractionDigits:2
        }
    ).format

    function gameFor(aPlayedGame) {
        return games[aPlayedGame.id]
    }

    for (let aPlayedGame of invoice.playedGames) {
        
        // add volume credits
        volumeCredits += Math.max(aPlayedGame.days - 5, 0)

        // add extra credit for every five towerDefense played days
        if (gameFor(aPlayedGame).genre === "towerDefense") {
            volumeCredits += Math.floor(aPlayedGame.days / 5)
        }

        // print line for this order
        result += `   ${gameFor(aPlayedGame).title}: ${format(amountFor(aPlayedGame)/10)} (${aPlayedGame.days} days) \n`

        totalAmount += amountFor(aPlayedGame)

    }

    result += `Amount owed is ${format(totalAmount/10)}\n`
    result += `You earned ${volumeCredits} credits\n`
    return result


    function amountFor(aPlayedGame) {
        let result = 0
        switch (gameFor(aPlayedGame).genre) {
            case "clicker":
                result = 2
                if (aPlayedGame.days > 10) {
                    result += 10 * (aPlayedGame.days - 10)
                }
                break
            case "towerDefense":
                result = 3
                if (aPlayedGame.days > 8) {
                    result += 12 * (aPlayedGame.days - 10)
                }
                break
            default:
                throw new Error(`unknown type: ${gameFor(aPlayedGame).genre}`)

        }
        return result
    }
}

module.exports = statement