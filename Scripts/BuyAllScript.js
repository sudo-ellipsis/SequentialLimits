let targetMultiplier = 5


function getTimeString(seconds) {
  let d = Math.floor(seconds / (3600*24));
  let h = Math.floor(seconds % (3600*24) / 3600);
  let m = Math.floor(seconds % 3600 / 60);
  let s = Math.floor(seconds % 60);
  return "," + d + "," +
         h.toString().padStart(2,'0') + ":" +
         m.toString().padStart(2,'0') + ":" +
         s.toString().padStart(2,'0') + ","
}

remote("let hasPublished = false")
let tickLength = 1
let totalTime = 0
let tauAtPub = 0

while (true) {
  let currency = remote(
    "theory.tick(" + tickLength + ",1.5)\n" +
    "game.buy(theory.upgrades)\n" +
    "game.buy(theory.permanentUpgrades)\n" +
    "hasPublished = false\n" +
    "if(theory.milestonesUnused > 0){\n" +
    "let m = [1,1,1,3,3,4,4,4,4,2,2,2,2,2]\n" +
    "theory.milestoneUpgrades[m[theory.milestonesTotal-1]-1].buy(1)}\n" +

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
    log(getTimeString(totalTime) + tauAtPub)
    tickLength = 1
  }
  if (remote("theory.milestonesUnused > 0") == "true") {
    while (remote("theory.milestonesUnused > 0") == "true") {
      System.Threading.Thread.Sleep(500)
    }
   
  }
  tauAtPub = currency
  totalTime += tickLength
  tickLength = Math.min(360, tickLength*1.25)
}
