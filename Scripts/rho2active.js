let targetMultiplier = 2

function getTimeString(seconds) {
  let d = Math.floor(seconds / (3600*24));
  let h = Math.floor(seconds % (3600*24) / 3600);
  let m = Math.floor(seconds % 3600 / 60);
  let s = Math.floor(seconds % 60);
  return d + "d " +
         h.toString().padStart(2,'0') + "h" +
         m.toString().padStart(2,'0') + "m" +
         s.toString().padStart(2,'0') + "s"
}

remote("let hasPublished = false")
let tickLength = 1
let totalTime = 0

while (true) {
  let currency = remote(
    "theory.tick(" + tickLength + ",1)\n" +
    "game.buy(theory.upgrades)\n" +
    "game.buy(theory.permanentUpgrades)\n" +
    "hasPublished = false\n" +
    "if (theory.isPublicationAvailable) {\n" +
    "  let m = getPublicationMultiplier(theory.tau)/\n" +
    "          getPublicationMultiplier(theory.tauPublished.max(1))\n" +
    "  if (m > " + targetMultiplier + ") {\n" +
    "    theory.publish()\n" +
    "    hasPublished = true\n" +
    "  }\n" +
    "}\n" +
    "currency.value")
  if (remote("hasPublished") == "true") {
    tickLength = 1
    for (let i = 0 ; i < 60; ++i) {
        remote("theory.upgrades[0].buy(-1)\n" +
               "theory.upgrades[1].buy(-1)\n" +
               "theory.tick(1, 1)")
    }
    log("Published")
  }
  if (remote("theory.milestonesUnused > 0") == "true") {
    log("Please select a milestone in the game UI.")
    while (remote("theory.milestonesUnused > 0") == "true") {
      System.Threading.Thread.Sleep(500)
    }
  }
  totalTime += tickLength
  tickLength = Math.min(60, tickLength*1.05)
  log(getTimeString(totalTime) + " | " + currency)
}