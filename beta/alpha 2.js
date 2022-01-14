//ensure to have this theory in the theory-sdk release folder when editing otherwise you won't see api documentation on hover
//you may need to use ../api/<file> to see documentation depending on ide etc
//useful only when making the theory, shows documentation on hover, doesn't actually get used, so you don't need it. helpful anyways.
import { ExponentialCost, FirstFreeCost, LinearCost, CustomCost } from "./api/Costs"; //make sure to use
import { Localization } from "./api/Localization";
import { parseBigNumber, BigNumber } from "./api/BigNumber";
import { theory } from "./api/Theory";
import { Utils } from "./api/Utils";

var id = "frongl-bongl"; //must be unique, make sure to change it 
var name = "Stirling's Balancing Act"; //display name
var description = "A theory designed around the exploitation and concept of approximation limits.\n\nBe careful - the closer your approximation of Euler's number is, the less your numerator grows! A close balancing game, fun for the whole family (or at least, the ones who play exponential idle)\n\nUses the Stirling approximation of euler's number.\n\nThe formula, named after James Stirling and first stated by Abraham De Moivre, states that ln(n!) can be approximated by the infinite sum ln(1) + ln(2) .... + ln(n), and thus e can be approximated with a little rearranging.\n\nIf you wish to compute from this theory, please note the stirling approximation is also used to calculate the n! term for tick speed efficiency.\n\nSpecial thanks to:\nGilles-Phillipe for development of the custom theory SDK and help with questions\nXelaroc for answering every one of my questions\nthe Exponential Idle beta testers and localisers.\n\n enjoy!"; //theory description. does not support LaTeX
var authors = "ellipsis"; //display author in the "author" field
var version = 1; //version id, make sure to change it on update

var currency = theory.createCurrency(), currency2 = theory.createCurrency(), currency3 = theory.createCurrency(); //create three currency variables and list them as currencies
var a1, a2, b1, b2; //set a1, a2, b1, b2 levels
var gamma0, gamma1, gamma2, gamma3; //create 4 variables that i'll use for milestones
var eulerApproximation; //value used to store the approximation of E
var rho1dot, rho2dot, rho3dot; //used as drho's
var e_gamma; //used for the approximation of e
var smallcheck = BigNumber.from("1e-4"); //used to check rendering for tertiary eq's
currency3.value = 1; //set rho3 to 1 to avoid a div by 0 error
theory.primaryEquationHeight = 55; //set height of primary equation
theory.secondaryEquationHeight = 25; //set height of second equation


var init = () => {
       // Regular Upgrades
    
    // a1
    {
        let getDesc = (level) => "a_1=" + geta1(level).toString(0); //returns the value seen in the description as a1 = <level>
        let getInfo = (level) => "a_1=" + geta1(level).toString(0); //returns the value seen in the info box as a1 = <level>
        a1 = theory.createUpgrade(0, currency, new FirstFreeCost(new ExponentialCost(10, 3))); //0'th upgrade in the list - first cost is 0, other costs are 10 * 2^(3*level), costs currency1
        a1.getDescription = (amount) => Utils.getMath(getDesc(a1.level)); //for the value of a1 in the description
        a1.getInfo = (amount) => Utils.getMathTo(getInfo(a1.level), getInfo(a1.level + amount)); //for the values of a1 when you hold I(nfo) and you have [current]->[next]
    }

    // a2
    {
        let getDesc = (level) => "a_2=2^{" + level + "}"; //returns the value seen in the description as a2 = 2^<level>.
        let getInfo = (level) => "a_2=" + geta2(level).toString(0); //returns the value seen in the info box as a2 = <level>
        a2 = theory.createUpgrade(1, currency, new ExponentialCost(100, Math.log2(10))); //1st upgrade in the list - costs are 5*10^level, costs currency1
        a2.getDescription = (_) => Utils.getMath(getDesc(a2.level));  //for the value of a2 in the description
        a2.getInfo = (amount) => Utils.getMathTo(getInfo(a2.level), getInfo(a2.level + amount)); //for the values of a2 when you hold I(nfo) and you have [current]->[next]
    }

    // b1
    {
        let getDesc = (level) => "b_1=" + getb1(level).toString(0); //returns the value seen in the description as b1 = <level>
        let getInfo = (level) => "b_1=" + getb1(level).toString(0); //returns the value seen in the info box as b1 = <level>
        b1 = theory.createUpgrade(2, currency, new ExponentialCost(500, Math.log2(10))); //2nd upgrade in the list - costs are 100 + 10^level, costs currency1
        b1.getDescription = (amount) => Utils.getMath(getDesc(b1.level)); //for the value of b1 in the description
        b1.getInfo = (amount) => Utils.getMathTo(getInfo(b1.level), getInfo(b1.level + amount)); //for the values of a1 when you hold I(nfo) and you have [current]->[next]
    }
    
    // b2
    {
        let getDesc = (level) => "b_2=2^{" + level + "}"; //returns the value seen in the description as b2 = 2^<level>
        let getInfo = (level) => "b_2=" + getb2(level).toString(0); //returns the value seen in the info box as b2 = <level>
        b2 = theory.createUpgrade(3, currency, new ExponentialCost(10000, 3*Math.log2(10))); //3rd upgrade in the list - costs are 3*10^(3*level), costs currency1
        b2.getDescription = (_) => Utils.getMath(getDesc(b2.level));  //for the value of a2 in the description
        b2.getInfo = (amount) => Utils.getMathTo(getInfo(b2.level), getInfo(b2.level + amount)); //for the values of a1 when you hold I(nfo) and you have [current]->[next]
    }

    
    /////////////////////
    // Permanent Upgrades
    theory.createPublicationUpgrade(0, currency, 1e10   ); //unlock publications at 1e10 currency1
    theory.createBuyAllUpgrade(1, currency, 1e13); //unlock buy all at 1e13 currency1
    theory.createAutoBuyerUpgrade(2, currency, 1e30); //unlock autobuyer at 1e30 currency1

    ///////////////////////
    //// Milestone Upgrades
    theory.setMilestoneCost(new LinearCost(25, 25)); //c = 25*x + 25, i.e rewards a milestone every 25 log10(tau)

    //milestone 1
    {
        gamma0 = theory.createMilestoneUpgrade(0, 3); //create an upgrade of ID 0 and max level 3 [this is gamma0]
        gamma0.description = Localization.getUpgradeIncCustomExpDesc("\\rho_2", "0.05"); //set desc as localisation of "increases rho_2 exponent by 0.05"
        gamma0.info = Localization.getUpgradeIncCustomExpInfo("\\rho_2", "0.05"); //basically the same but for info
        gamma0.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation(); //if bought/refunded, force a refresh of the equation
    }

    //milestone 2
    //TODO change it to a localisation of decreases lol
    {
        gamma1 = theory.createMilestoneUpgrade(1, 5); //create an upgrade of ID 1 and max level 3 [this is gamma1]
        gamma1.description = Localization.getUpgradeIncCustomDesc("a_3","- 0.1"); //set desc as localisation of "increases a3 by - 0.1"
        gamma1.info = Localization.getUpgradeIncCustomInfo("a_3"," - 0.1"); //basically the same but for info
        gamma1.boughtOrRefunded = (_) => theory.invalidateSecondaryEquation(); //if bought/refunded, force a refresh of the equation
    }
    //milestone 3
    {
        gamma2 = theory.createMilestoneUpgrade(2, 4); //create an upgrade of ID 2 and max level 4 [this is gamma2]
        gamma2.description = Localization.getUpgradeIncCustomExpDesc("b_1", "0.05"); //set desc as localisation of "increases b1 exponent by 0.05"
        gamma2.info = Localization.getUpgradeIncCustomExpInfo("b_1", "0.05"); //basically the same but for info
        gamma2.boughtOrRefunded = (_) => theory.invalidateSecondaryEquation(); //if bought/refunded, force a refresh of the equation
    }

    //milestone 4
    {
        gamma3 = theory.createMilestoneUpgrade(3, 4); //create an upgrade of ID 3 and max level 4 [this is gamma3]
        gamma3.description = Localization.getUpgradeIncCustomExpDesc("b_2", "0.05"); //set desc as localisation of "increases b2 exponent by 0.05"
        gamma3.info = Localization.getUpgradeIncCustomExpInfo("b_2", "0.05"); //basically the same but for info
        gamma3.boughtOrRefunded = (_) => theory.invalidateSecondaryEquation(); //if bought/refunded, force a refresh of the equation
    }        



    //// Achievements
    //TODO ADD ACHIEVEMENTS
    // achievement1 = theory.createAchievement(0, "Achievement 1", "Description 1", () => c1.level > 1);
    // achievement2 = theory.createSecretAchievement(1, "Achievement 2", "Description 2", "Maybe you should buy two levels of c2?", () => c2.level > 1);


    //// Story chapters
    //TODO ADD MORE STORY CHAPTERS [~10]
    chapter1 = theory.createStoryChapter(0, "A new beginning", "You return from your old professor's retirement party, the mantle passed onto you, the first student, to head the department of students accrued over the years.\nExcited to finally be listed as something other than \"et. al\" on a paper, you continued with your existing research, but as progress slowed, you felt less and less satisfied.\nThe days turn into weeks, which blur together as more and more publications are written.\nEventually, a student comes to you with a dusty tome, featuring a as-of-yet unexplored theorem.\nFeeling a stroke of inspiriation, you assemble a team of students and throw yourself into the research.", () => a1.level > 0); //unlock story chapter when a1 is purchased
    chapter2 = theory.createStoryChapter(1,"Taking risks" ,"You notice a few unassuming variables at the bottom of the equation.\nA student warns you against changing them, citing the risk of decreasing the existing values, but you forge ahead, being cautious not to overbuy, lest your research slow to a crawl.", () => b1.level >0 || b2.level > 0); //unlock story chapter if b1 or b2 have been puchased
    chapter3 = theory.createStoryChapter(2, "First publication","You publish your first paper, with your name front and center.\nColleagues congratulate you, but you feel there is something missing, further exploration to be had.\nYou decide to forge ahead.", () => theory.publicationUpgrade.level > 0); //unlock story chapter if a publication has been done
    updateAvailability();
}

var updateAvailability = () => {
//    useful for balancing your milestones, and used to make variables available through milestones
//    c2Exp.isAvailable = c1Exp.level > 0; //can only buy the c2 exponent upgrade milestone (at least, if c2Exp is a milestone variable) if a c1 exponent upgrade has been purchased
//    c2.isAvailable = c2Term.level > 0; //c2 is only available as a variable if c2Term upgrade has been purchased
}

var tick = (elapsedTime, multiplier) => { //function that runs every tick
    profilers.exec("tick", () => { //tell the profiler to log the following execution time under "tick". to obtain the average results, use <log(profilers.get("tick").mean)> in the SDK command line

    let dt = BigNumber.from(elapsedTime * multiplier); //find tick time
    let bonus = theory.publicationMultiplier; //income bonus from theory publication multiplier

    rho3dot = getb1(b1.level).pow(BigNumber.ONE + gamma2.level*0.05) * getb2(b2.level).pow(1 + gamma3.level*0.05 ); //rho3dot is equal to b1.value * b2.value accounting for exponenents
    currency3.value = currency3.value + rho3dot*dt*bonus; //increase currency3.value by rho3dot*dt*bonus
 
    eulerApproximation = (BigNumber.E / ((BigNumber.TWO * BigNumber.PI * currency3.value).pow(BigNumber.ONE / (currency3.value * BigNumber.TWO ) ))) ; //approximate E using Stirling's method rearranged
    e_gamma = BigNumber.E - eulerApproximation; //e-gamma
    rho2dot = geta1(a1.level) * geta2(a2.level) * (BigNumber.TWO+gamma1.level*0.1).pow( - currency3.value.log() ); //calculate rho2dot, accounting for milestones
    currency2.value = currency2.value = currency2.value + dt * bonus * rho2dot; //increase rho2 by rho2dot by dt, accounting for pub bonus
    rho1dot = (currency2.value.pow(BigNumber.ONE+gamma0.level*0.05)).sqrt()/ (e_gamma); //rho1dot is equal to the root of rho2^milestone, over the difference between E and stirling's approximation
    currency.value = currency.value + dt * bonus * rho1dot; //increase rho1 by rho1dot by dt, accounting for pub bonus
    
    theory.invalidateTertiaryEquation();
    
    }); //end of profiled section
}

//display rho1dot equation
var getPrimaryEquation = () => { //text for the primary equation

    let result = "\\dot{\\rho}_1 = \\frac{\\sqrt{\\rho_2";
    switch (gamma0.level){ //switch statement based on milestone 1 to add an exponent to rho2
        //should probably use something else but i tried using just a (gamma0.level*0.1).toString(1) and it threw a hissy fit
        case 1:
            result += "^{1.05}";
            break;
        case 2:
            result += "^{1.10}";
            break;
        case 3:
            result += "^{1.15}";
            break;
    }
    result +="}}{e-\\gamma}";  //close off the square root and add the denominator

    //show the approximated value equation
    result += "\\qquad \\gamma = \\frac{\\rho_3}{\\rho_3 !^{\\; \\frac{1}{\\rho_3}}}";
    return result; //return the sum of text
}   


//display rho2dot, rho3dot and a_3 equation
var getSecondaryEquation = () => { 
    
    //render rho2dot equation
    let result = "\\dot{\\rho}_2 = a_1 a_2 \\cdot a_3 ^{ - \\ln\\rho_3}\\qquad "; //static, doesn't need to change. plain latex


    result += "{\\dot{\\rho}}_3 = b_1"; // first part of eq, i.e rho3dot = b1
    switch (gamma2.level){ //switch statemement based on the third milestone (b1 exponent) to add exponents if the milestone level is 1 - 4
        case 1:
            result+= "^{\\!1.05}\\!";
            break;
        case 2:
            result+= "^{\\!1.10}\\!";
            break;
        case 3:
            result+= "^{\\!1.15}\\!";
            break;
        case 4:
            result+= "^{\\!1.20}\\!";
            break;
    }
    result += "b_2"; //add b2 
    switch (gamma3.level){ //switch statemement based on the fourth milestone (b2 exponent) to add exponents if the milestone level is 1 - 4
        case 1:
            result+= "^{\\!1.05}\\!";
            break;
        case 2:
            result+= "^{\\!1.10}\\!";
            break;
        case 3:
            result+= "^{\\!1.15}\\!";
            break;
        case 4:
            result+= "^{\\!1.20}\\!";
            break;
    }
    result += "\\qquad "; //add a space

    //render a_3 = 2.x
    result += "a_3 = "; //render a3=
    switch (gamma1.level){ //switch statement based on milestone 2 to change the displayed value of a3
        case 0:
            result += "2";
            break;
        case 1:
            result += "1.9";
            break;
        case 2:
            result += "1.8";
            break;
        case 3:
            result += "1.7";
            break;
        case 4:
            result += "1.6";
            break;
        case 5:
            result += "1.5";
            break;            
    }
    return result; //return the sum of text
}

//display values considered useful that aren't in the currency bar
var getTertiaryEquation = () => {
    let result = ""; //blank for profiler reasons, as profiler will be more accurate then
    profilers.exec("renderTertiary", () =>  { //check how long it takes to render the tertiary eq every tick
    result += theory.latexSymbol + "= \\max{\\rho_1}, \\; "; //tau_x = max rho, then move to next segment of matrix
    result += "e - \\gamma = ";
    if (e_gamma <= smallcheck){ //display gamma based on whether it's small enough to use E notation
    result += e_gamma.toNumber().toExponential(4); //use .toNumber() before .toExponential()!
    } else {
        result += e_gamma.toString(4);
    }
    result += ", \\;"; // render e-approximation and the result, then move to next esgment
    //    result += "log_{10} \\rho_3 = " + currency3.value.log10().toString(2) + ", \\;"; //show value of log10 (rho_3) for testing
    // result += "\\dot{\\rho}_1 = " + ((currency2.value.pow(BigNumber.ONE+gamma0.level*0.05)).sqrt()/ (BigNumber.E - (BigNumber.E / ((BigNumber.TWO * BigNumber.PI * currency3.value).pow(BigNumber.ONE / (currency3.value * BigNumber.TWO ) ))))).toString(2) + ", \\,";
    result += "\\dot{\\rho}_2 = " + (rho2dot).toString(2) + ", \\;"; //display rho2dot, then move to next segment  
    result += "\\dot{\\rho_3} = " + (rho3dot).toString(2) + " \\;"; //display rho23ot, then move to next segment
    }); //end of profiler log
    return result ; //return the sum of text    

}

var postPublish = ()  => {
    //force update all equations
    theory.invalidatePrimaryEquation(); 
    theory.invalidateSecondaryEquation();
    theory.invalidateTertiaryEquation();

    //set rho3 to 1 to avoid div/0 errors (hopefully)
    currency3.value = BigNumber.ONE;

}

var getPublicationMultiplier = (tau) => tau.pow(0.15) / BigNumber.FIVE; //publication mult bonus is (tau^0.15)/5
var getPublicationMultiplierFormula = (symbol) => "\\frac{{" + symbol + "}^{0.15}}{5}"; //text to render for publication mult ext
var getTau = () => currency.value; //get the tau value from currency1
var get2DGraphValue = () => (BigNumber.ONE + currency.value.abs()).log10().toNumber(); //renders the graph based on currency 1

//TODO ACTUALLY SORT THESE OUT
var geta1 = (level) => Utils.getStepwisePowerSum(level, 2, 2, 0); //get the value of the variable from a power sum with a level of <level>, a base of 2, a step length of 10 and an initial value of 0 (think q1 in t5)
var geta2 = (level) => BigNumber.TWO.pow(level); //get the value of the variable from a power of 2^level
var getb1 = (level) => Utils.getStepwisePowerSum(level, 2, 3, 0); //get the value of the variable from a power sum with a level of <level>, a base of 2, a step length of 10 and an initial value of 1 (think c1 in t5)
var getb2 = (level) => BigNumber.TWO.pow(level); //get the value of the variable from a power of 2^level

init(); //british line [lime]