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

    for (let playedGame of invoice.playedGames) {
        const game = games[playedGame.id]
        
        thisAmount = getAmount(game, playedGame)

        // add volume credits
        volumeCredits += Math.max(playedGame.days - 5, 0)

        // add extra credit for every five towerDefense played days
        if (game.genre === "towerDefense") {
            volumeCredits += Math.floor(playedGame.days / 5)
        }

        // print line for this order
        result += `   ${game.title}: ${format(thisAmount/10)} (${playedGame.days} days) \n`

        totalAmount += thisAmount

    }

    result += `Amount owed is ${format(totalAmount/10)}\n`
    result += `You earned ${volumeCredits} credits\n`
    return result


    function getAmount(game, playedGame) {
        let result = 0
        switch (game.genre) {
            case "clicker":
                result = 2
                if (playedGame.days > 10) {
                    result += 10 * (playedGame.days - 10)
                }
                break
            case "towerDefense":
                result = 3
                if (playedGame.days > 8) {
                    result += 12 * (playedGame.days - 10)
                }
                break
            default:
                throw new Error(`unknown type: ${game.genre}`)

        }
        return result
    }
}

module.exports = statement