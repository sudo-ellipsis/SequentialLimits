﻿//ensure to have this theory in the theory-sdk release folder when editing otherwise you won't see api documentation on hover
//you may need to use ../api/<file> to see documentation depending on your IDE
//useful only when making the theory, shows documentation on hover, doesn't actually get used, so you don't need it. helpful anyways.
import { ExponentialCost, FirstFreeCost, LinearCost, CustomCost } from "./api/Costs"; //make sure to use
import { Localization } from "./api/Localization";
import { parseBigNumber, BigNumber } from "./api/BigNumber";
import { theory } from "./api/Theory";
import { Utils } from "./api/Utils";

var id = "frongl-bongl"; //must be unique, make sure to change it 
var name = "Sequential Limits"; //display name
var description = "After your professor retired, you're given the mantle of chief researcher. Eager to dive into fields where your old professor dove off, you start looking into the concept explored in the ninth lemma - sequential limits - to further your career.\n\nThis theory explores the concept of approximations, using a rearrangment of Stirling's Formula to approximate Euler's number.\nThe formula, named after James Stirling and first stated by Abraham De Moivre, states that ln(n!) can be approximated by the infinite sum ln(1) + ln(2) .... + ln(n).\nBe careful - the closer your approximation of Euler's number is, the less your numerator grows!\nA close balancing game, fun for the whole family (or at least, the ones who play exponential idle). \n\nSpecial thanks to:\n- Gilles-Phillipe, for development of the custom theory SDK, implementing features I requested, providing countless script examples, and help with my numerous questions and balancing.\n- Xelaroc/AlexCord, for answering my neverending questions, debugging and helping me understand how to balance a theory, and going above and beyond to teach me custom theory work.\n- The Exponential Idle beta testing team\n- The Exponential Idle localisation and translation team, who's work I added to, and without which this game wouldn't have the reach it does \n\nEnjoy!"; //theory description. does not support LaTeX
var authors = "ellipsis"; //display author in the "author" field
var version = 0; //version id, make sure to change it on update

var currency = theory.createCurrency(), currency2 = theory.createCurrency(), currency3 = theory.createCurrency(); //create three currency variables and list them as currencies
var a1, a2, b1, b2; //set a1, a2, b1, b2 levels
var numPublishes=0; //number of publishes

var gamma0, gamma1, gamma2, gamma3; //create 4 variables that i'll use for milestones
var rho1dot = BigNumber.ZERO, rho2dot = BigNumber.ZERO, rho3dot = BigNumber.ZERO; //used as drho's
var inverseE_Gamma; //used for the approximation of e
var E_Gamma; //used for the display of 
//var t = BigNumber.ONE; //time in seconds

currency3.value = 1; //set rho3 to 1 to avoid a div by 0 error lol
theory.primaryEquationHeight = 70; //set height of primary equation
theory.secondaryEquationHeight = 35; //set height of second equation
theory.secondaryEquationScale = 1.25; //makes the secondary eq look 25% bigger


var init = () => {

    
    // Regular Upgrades    
    // a1
    {
        let getDesc = (level) => "a_1=" + geta1(level).toString(0); //returns the value seen in the description as a1 = <level>
        let getInfo = (level) => "a_1=" + geta1(level).toString(0); //returns the value seen in the info box as a1 = <level>
        a1 = theory.createUpgrade(0, currency, new FirstFreeCost(new ExponentialCost(1, 0.360*Math.log2(10)))); //0'th upgrade in the list - first cost is 0, other costs are 10 * 2^(3*level), costs currency1
        a1.getDescription = (amount) => Utils.getMath(getDesc(a1.level)); //for the value of a1 in the description
        a1.getInfo = (amount) => Utils.getMathTo(getInfo(a1.level), getInfo(a1.level + amount)); //for the values of a1 when you hold I(nfo) and you have [current]->[next]
    }
    // a2
    {
        let getDesc = (level) => "a_2=2^{" + level + "}"; //returns the value seen in the description as a2 = 2^<level>.
        let getInfo = (level) => "a_2=" + geta2(level).toString(0); //returns the value seen in the info box as a2 = <level>
        a2 = theory.createUpgrade(1, currency, new ExponentialCost(150, Math.log2(10))); //1st upgrade in the list - costs are 5*10^level, costs currency1
        a2.getDescription = (_) => Utils.getMath(getDesc(a2.level));  //for the value of a2 in the description
        a2.getInfo = (amount) => Utils.getMathTo(getInfo(a2.level), getInfo(a2.level + amount)); //for the values of a2 when you hold I(nfo) and you have [current]->[next]
    }

    // b1
    {
        let getDesc = (level) => "b_1=" + getb1(level).toString(0); //returns the value seen in the description as b1 = <level>
        let getInfo = (level) => "b_1=" + getb1(level).toString(0); //returns the value seen in the info box as b1 = <level>
        b1 = theory.createUpgrade(2, currency, new ExponentialCost(250, 0.65*Math.log2(10))); //2nd upgrade in the list - costs are 100 + 10^level, costs currency1
        b1.getDescription = (amount) => Utils.getMath(getDesc(b1.level)); //for the value of b1 in the description
        b1.getInfo = (amount) => Utils.getMathTo(getInfo(b1.level), getInfo(b1.level + amount)); //for the values of a1 when you hold I(nfo) and you have [current]->[next]
    }
    
    // b2
    {
        let getDesc = (level) => "b_2=2^{" + level + "}"; //returns the value seen in the description as b2 = 2^<level>
        let getInfo = (level) => "b_2=" + getb2(level).toString(0); //returns the value seen in the info box as b2 = <level>
        b2 = theory.createUpgrade(3, currency, new ExponentialCost(500, 0.926*Math.log2(10))); //3rd upgrade in the list - costs are 3*10^(3*level), costs currency1
        b2.getDescription = (_) => Utils.getMath(getDesc(b2.level));  //for the value of a2 in the description
        b2.getInfo = (amount) => Utils.getMathTo(getInfo(b2.level), getInfo(b2.level + amount)); //for the values of a1 when you hold I(nfo) and you have [current]->[next]
    }

    
    // Permanent Upgrades
    theory.createPublicationUpgrade(0, currency, 1e15 ); //unlock publications at 1e10 currency
    theory.createBuyAllUpgrade(1, currency, 1e30); //unlock buy all at 1e30 currency
    theory.createAutoBuyerUpgrade(2, currency, 1e50); //unlock autobuyer at 1e50 currency


    //// Milestone Upgrades
    theory.setMilestoneCost(new LinearCost(2.5, 2.5)); //c = 25*x + 25, i.e rewards a milestone every 25 log10(tau)

    //milestone 1
    {
        gamma0 = theory.createMilestoneUpgrade(0, 3); //create an upgrade of ID 0 and max level 3 [this is gamma0]
        gamma0.description = Localization.getUpgradeIncCustomExpDesc("\\rho_2", "0.01"); //set desc as localisation of "increases rho_2 exponent by 0.01"
        gamma0.info = Localization.getUpgradeIncCustomExpInfo("\\rho_2", "0.01"); //basically the same but for info button
        gamma0.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation(); //if bought/refunded, force a refresh of the equation
    }

    //milestone 2
    //TODO change it to a localisation of decreases lol
    {
        gamma1 = theory.createMilestoneUpgrade(1, 5); //create an upgrade of ID 1 and max level 5 [this is gamma1]
        gamma1.description = Localization.getUpgradeDecCustomDesc("a_3","0.008"); //set desc as localisation of "decreases a3 by 0.008"
        gamma1.info = Localization.getUpgradeDecCustomInfo("a_3","0.008"); //basically the same but for info button
        gamma1.boughtOrRefunded = (_) => theory.invalidateSecondaryEquation(); //if bought/refunded, force a refresh of the equation
    }
    
    //milestone 3
    {
        gamma2 = theory.createMilestoneUpgrade(2, 2); //create an upgrade of ID 2 and max level 4 [this is gamma2]
        gamma2.description = Localization.getUpgradeIncCustomExpDesc("b_1", "0.02"); //set desc as localisation of "increases b1 exponent by 0.01"
        gamma2.info = Localization.getUpgradeIncCustomExpInfo("b_1", "0.02"); //basically the same but for info button
        gamma2.boughtOrRefunded = (_) => theory.invalidateSecondaryEquation(); //if bought/refunded, force a refresh of the equation
    }

    //milestone 4
    {
        gamma3 = theory.createMilestoneUpgrade(3, 4); //create an upgrade of ID 3 and max level 4 [this is gamma3]
        gamma3.description = Localization.getUpgradeIncCustomExpDesc("b_2", "0.01"); //set desc as localisation of "increases b2 exponent by 0.01""
        gamma3.info = Localization.getUpgradeIncCustomExpInfo("b_2", "0.01"); //basically the same but for info button
        gamma3.boughtOrRefunded = (_) => theory.invalidateSecondaryEquation(); //if bought/refunded, force a refresh of the equation
    }        

    
    // Achievements
    //TODO ADD ACHIEVEMENTS [10 mainline ~4 secret]
    achievement1 = theory.createAchievement(0, "Amateur Author", "Publish once.", () => 1 == numPublishes); //award an achievement with name and description if there has been 1 publish
    achievement2 = theory.createAchievement(1, "Regular Reporter", "Publish 5 times.", () => 5 == numPublishes); //same for 5 publishes
    achievement3 = theory.createAchievement(2, "Studied Scribbler", "Publish 10 times.", () => 10 == numPublishes); //same for 10 publishes
    achievement4 = theory.createAchievement(3, "Exemplary Essayist", "Publish 25 times.", () => 25 == numPublishes); //same for 25 publishes
    achievement5 = theory.createAchievement(4, "Publication Professional", "Publish 50 times.", () => 50 == numPublishes); //same for 50 publishes
    
    achievement6 = theory.createAchievement(5, "Purchase Optimisation", "Outsource the actual buying of variables to your students", () => theory.autoBuyerUpgrade > 0); //award an achievement for unlocking the autobuyer
    
    achievement7 = theory.createAchievement(6, "Close Enough", "Get your approximation of e to 10^-1 off true", () => inverseE_Gamma >= BigNumber.From("1e0"));
    achievement8 = theory.createAchievement(7, "Nitpicking Exercise", "Get your approximation of e to 10^-5 off true", () => inverseE_Gamma >= BigNumber.From("1e5"));
    achievement9 = theory.createAchievement(8, "Splitting Hairs", "Get your approximation of e to 10^-10 off true", () => inverseE_Gamma >= BigNumber.From("1e10"));
    achievement10 = theory.createAchievement(9, "Microscopic", "Get your approximation of e to 10^-25 off true", () => inverseE_Gamma >= BigNumber.From("1e25"));
    achievement11 = theory.createAchievement(10, "Are We There Yet?", "Get your approximation of e to 10^-50 off true", () => inverseE_Gamma >= BigNumber.From("1e50"));
    achievement12 = theory.createAchievement(11, "Subatomic", "Get your approximation of e to 10^-75 off true", () => inverseE_Gamma >= BigNumber.From("1e75"));
    achievement13 = theory.createAchievement(12, "Planck Pettiness", "Get your approximation of e to 10^-100 off true", () => inverseE_Gamma >= BigNumber.From("1e100"));
    achievement14 = theory.createAchievement(13, "Precision Player", "Get your approximation of e to 10^-250 off true", () => inverseE_Gamma >= BigNumber.From("1e250"));
    achievement15 = theory.createAchievement(14, "Running Out Of Room", "Get your approximation of e to 10^-500 off true", () => inverseE_Gamma >= BigNumber.From("1e500"));
    achievement16 = theory.createAchievement(15, "You Can Stop Anytime", "Get your approximation of e to 10^-750 off true", () => inverseE_Gamma >= BigNumber.From("1e750"));
    
    //TODO ADD ~5 ACHIEVEMENTS BASED ON FUNNY RHO1 NUMBERS
    //69, 420, 666, 777, 1000

    achievement21 = theory.createSecretAchievement(20, "What's 9 + 10?", "21", "October 9th, 2021", () => a1.level == 9 && a2.level == 10 );
    achievement22 = theory.createSecretAchievement(21, "Pattern Fanatic", "Have every variable level the same", "Getting Religous", () => a1.level == a2.level && a1.level == b1.level && a1.level == b2.level && a1.level >= 3);
    achievement23 = theory.createSecretAchievement(22, "l33t5p34k", "1 3 3 7", "Elite", () => a1.level == 1 && a2.level == 3 && b1.level == 3 && b2.level == 7 );


    //// Story chapters
    //TODO ADD MORE STORY CHAPTERS [~15 total]
    // chapter1 = theory.createStoryChapter(0, "A New Beginning", "You return from your old professor's retirement party, the mantle passed onto you, the first student, to head the department of students accrued over the years.\nExcited to finally be listed as something other than \"et. al\" on a paper, you continued with your existing research, but as progress slowed, you felt less and less satisfied.\nThe days turn into weeks, which blur together as more and more publications are written.\nEventually, a student comes to you with a dusty tome, featuring a as-of-yet unexplored theorem.\nFeeling a stroke of inspiriation, you assemble a team of students and throw yourself into the research.", () => a1.level > 0); //unlock story chapter when a1 is purchased
    // chapter2 = theory.createStoryChapter(1,"Taking Risks" ,"You notice a few unassuming variables at the bottom of the equation.\nA student warns you against changing them, citing the risk of decreasing the existing values, but you forge ahead, being cautious not to overbuy, lest your research slow to a crawl.", () => b1.level >0 || b2.level > 0); //unlock story chapter if b1 or b2 have been puchased
    // chapter3 = theory.createStoryChapter(2, "International Recognition","You publish your first paper, with your name front and center.\nColleagues congratulate you, but you feel there is something missing, further exploration to be had.\nYou decide to forge ahead.", () => numPublishes > 0); //unlock story chapter if a publication has been done
    // chapter4 = theory.createStoryChapter(3, "Light Modification", "With your progress starting to slow, you scour the original equation texts to find a remedy.\nIt turns out all along there's been some modifiers you can add, but at ever increasing costs.\nYou decide to buy one, hoping it alleviates your issues...", () => gamma0.level == 1 || gamma1.level == 1 || gamma2.level == 1 || gamma3.level == 1);//unlock story chapter if a milestone is purchased
    // chapter5 = theory.createStoryChapter(4, "Making Progress", "You reach 1e100 Rho, a major milestone in your research.\nColleagues come to congratulate you on pushing your research so far, but you shrug them off - you feel as if there's more you could do.\nYou head back to your office and get to work once more", () => currency.value >= BigNumber.From("1e100"));//unlock story chapter upon reaching 1e100 rho1
    // chapter6 = theory.createStoryChapter(5, "The End.... Or Is It?","You finally purchased every modifier, to close out your research into this field.\nYour students assigned to this project celebrate, anticipating closing out this line of research, and your name is posted in journals worldwide.\n\nYou decide to go over your numbers once more, just to make sure...", () => gamma0.level == 2 && gamma1.level == 5 && gamma2.level == 3 && gamma3.level == 2); //unlock a story when all milestone levels have been purchased    
    // chapter6 = theory.createStoryChapter(6, "Mathaholic", "1e500.\n\nA Monumentally large number, but but barely a blip to you.\nPeople are really taking notice of you now, pushing mathematics to points thought unachieveable in this field.\nThere's a waiting list to study under you now.\nYour friends and family are expressing concern, worried you're in too deep.\nIt doesn't matter.\nAnother breakthrough is close.\nYou can feel it.\n\nRight?", () => currency.value >= BigNumber.From("1e500"));
    // chapter7 = theory.createStoryChapter(7, "The End.", "1e1000.\n\nA number so big it'd be impossible to comprehend.\nYou did it.\nThey said you couldn't.\nYears after you first started, you reach an incredible end to your research.\nYou're featured on TIME, on daytime television, in worldwide newspapers. Your papers are framed, your students all professors in their own rights now.\nYou pass on the mantle to a younger student to retire like your old professor, back all those years ago.\n\nTHE END.\n<3\nthanks for playing - ellipsis", () => currency.value >= BigNumber.From("1e1000"));
    updateAvailability();
}


var updateAvailability = () => {
//    useful for balancing your milestones, and used to make variables available through milestones
//    c2Exp.isAvailable = c1Exp.level > 0; //can only buy the c2 exponent upgrade milestone (at least, if c2Exp is a milestone variable) if a c1 exponent upgrade has been purchased
//    c2.isAvailable = c2Term.level > 0; //c2 is only available as a variable if c2Term upgrade has been purchased
}


//function that runs every tick, i.e tick math
var tick = (elapsedTime, multiplier) => {
    profilers.exec("tick", () => { //tell the profiler to log the following execution time under "tick". to obtain the average results, use <log(profilers.get("tick").mean)> in the SDK command line

    let dt = BigNumber.from(elapsedTime * multiplier); //find tick time
    
    rho3dot = (getb1(b1.level).pow(BigNumber.ONE + gamma2.level*BigNumber.From(0.02)) * getb2(b2.level).pow(BigNumber.ONE + gamma3.level*BigNumber.From(0.01))); //rho3dot is equal to b1.value * b2.value accounting for exponenents
    currency3.value += rho3dot*dt; //increase currency3.value by rho3dot*dt
    
    let two_pi_rho = BigNumber.TWO * BigNumber.PI * currency3.value; //precalculation of values for tick function
    if (currency3.value < 1000){
        inverseE_Gamma = BigNumber.ONE/( BigNumber.E - (BigNumber.E / (two_pi_rho.pow(BigNumber.PI / two_pi_rho ))) ); //approximate E using Stirling's method rearranged
    }
    else {
        let r = BigNumber.PI.log() + two_pi_rho.log().log() - two_pi_rho.log(); 
        inverseE_Gamma = ((r.exp() - r).exp() - BigNumber.from(0.5))/BigNumber.E;    }//xelaroc's approximation of the approximation - fixed to work at high values

    //rho2dot equation that supports higher values without crashing lol
    let a1v = geta1(a1.level), a2v = geta2(a2.level);
//    rho2dot =(geta1(a1.level) * geta2(a2.level) * (BigNumber.TWO-gamma1.level*0.004).pow( - currency3.value.log() )); //calculate rho2dot, accounting for milestones
    rho2dot = a1v > 0 && a2v > 0 ? BigNumber.E.pow(a1v.log() + a2v.log() - (BigNumber.TWO-gamma1.level*0.008).log() * (currency3.value).log() ) : BigNumber.ZERO;
    currency2.value += dt * rho2dot; //increase rho2 by rho2dot by dt
    rho1dot = (currency2.value.pow(BigNumber.ONE+gamma0.level*0.01).sqrt()*(inverseE_Gamma)); //rho1dot is equal to the root of rho2^milestone, over the difference between E and stirling's approximation
    currency.value += dt * theory.publicationMultiplier * rho1dot; //increase rho1 by rho1dot by dt, accounting for pub bonus
    
    // if (0 < a1.level){
    //     t += elapsedTime;
    // }

    theory.invalidateTertiaryEquation();
    
    }); //end of profiled section
}


//display rho1dot equation
var getPrimaryEquation = () => { //text for the primary equation

    let result = "\\dot{\\rho}_1 = \\frac{\\sqrt{\\rho_2";
    switch (gamma0.level){ //switch statement based on milestone 1 to add an exponent to rho2
        //should probably use something else but i tried using just a (gamma0.level*0.1).toString(1) and it threw a hissy fit
        case 1:
            result += "^{1.01}";
            break;
        case 2:
            result += "^{1.02}";
            break;
        case 3:
            result += "^{1.03}";
            break;    
    }
    result +="}}{e-\\gamma}";  //close off the square root and add the denominator

    //show the approximated value equation
    result += "\\qquad \\gamma = \\frac{\\rho_3}{\\sqrt[^{\\rho_3}]{\\rho_3 !}}";
    result += "\\qquad" + theory.latexSymbol + "= \\max{\\rho_1}^{0.1}"; 
    return result; //return the sum of text
}   


//display rho2dot, rho3dot and a_3 equation
var getSecondaryEquation = () => { 
    let result = "";
    profilers.exec("renderSecondary", () =>  {
    //render rho2dot equation
    result += "\\dot{\\rho}_2 = a_1 a_2 \\cdot a_3 ^{ - \\ln\\rho_3}\\qquad "; //static, doesn't need to change. plain latex


    result += "{\\dot{\\rho}}_3 = b_1"; // first part of eq, i.e rho3dot = b1
    switch (gamma2.level){ //switch statemement based on the third milestone (b1 exponent) to add exponents if the milestone level is 1 - 4
        case 1:
            result+= "^{\\!1.02}\\!";
            break;
        case 2:
            result+= "^{\\!1.04}\\!";
            break;
    }
    result += "b_2"; //add b2 
    switch (gamma3.level){ //switch statemement based on the fourth milestone (b2 exponent) to add exponents if the milestone level is 1 - 4
        case 1:
            result+= "^{\\!1.01}\\!";
            break;
        case 2:
            result+= "^{\\!1.02}\\!";
            break;
        case 3:
            result+= "^{\\!1.03}\\!";
            break;
        case 4:
            result+= "^{\\!1.04}\\!";
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
            result += "1.992";
            break;
        case 2:
            result += "1.984";
            break;
        case 3:
            result += "1.976";
            break;
        case 4:
            result += "1.968";
            break;
        case 5:
            result += "1.96";
            break;            
    }
    });
    return result; //return the sum of text
}


//display values considered useful that aren't in the currency bar
var getTertiaryEquation = () => {
    let result = ""; //blank for profiler reasons, as it doesn't support returns
//    profilers.exec("renderTertiary", () =>  { //check how long it takes to render the tertiary eq every tick
//tau_x = max rho, then move to next segment of matrix

    //black magic, probably
    result += "e - \\gamma = ";
    if(inverseE_Gamma <= 10000)
    result += (BigNumber.ONE/inverseE_Gamma).toString(4);
else { 
    let exp = 1+Math.floor(inverseE_Gamma.log10().toNumber()),
        mts = ((BigNumber.TEN.pow(exp)/inverseE_Gamma).toString());
    result += `${mts}e\\text{-}${exp}`
}
    result +=", \\;\\dot{\\rho}_2 = "; //display rho2dot to a degree of granularity depending on its size, then move to next segment 
    result += rho2dot.toString(3);

    result += ", \\;\\dot{\\rho}_3 = "; //display rho3dot to a degree of granularity depending on its size, then move to next segment 
    result += rho3dot.toString(3);

//    result += ",\\; t = " + t.toString(1);
    
//    }); //end of profiler log
    return result ; //return the sum of text    

}

//USED IN CREATING A QUATERNARY SIDEBAR LIKE IN THEORY 2
//
// var getQuaternaryEntries = () => {
//     if (quaternaryEntries.length == 0)
//     {
//        quaternaryEntries.push(new QuaternaryEntry("r_1", null)); //create an entry that reads r_1 = null (i.e, "???")
//         quaternaryEntries.push(new QuaternaryEntry("r_2", null)); //same as above
//         quaternaryEntries.push(new QuaternaryEntry("r_3", null));
//         quaternaryEntries.push(new QuaternaryEntry("r_4", null));
//     }

//     quaternaryEntries[0].value = r0.toString(); //value 1 is r0's value, replacing the "null"
//     quaternaryEntries[1].value = r1.toString(); //value 2 is r1's value, replacing the "null"
//     quaternaryEntries[2].value = rTerms.level > 0 ? r2.toString() : null; //if rTerm milestone has been purchased, display the value as r2's value - otherwise defaults to question marks
//     quaternaryEntries[3].value = rTerms.level > 1 ? r3.toString() : null; //same as above for milestone level 2 being purchased

//     return quaternaryEntries;
// }

//creates a top progress bar with a progress from the "prg" variable.
// var getEquationOverlay = () => ui.createProgressBar({progress: prg, verticalOptions: LayoutOptions.START})


var postPublish = ()  => {
    //force update all equations
    theory.invalidatePrimaryEquation(); 
    theory.invalidateSecondaryEquation();
    theory.invalidateTertiaryEquation();
//    t = BigNumber.Zero; //set time since publish to 0

    //set rho3 to 1 to avoid div/0 errors (hopefully)
    currency3.value = BigNumber.ONE;

    numPublishes++; //increase number of publishes

}

//NEEDED IF YOU WISH TO KEEP CERTAIN VARIABLES BETWEEN SWITCHES
var setInternalState = (state) => { //set the internal state of values that need to be kept post switch that aren't levels
    let values = state.split(" "); //save values to a string
    if (values.length > 0) numPublishes = parseBigNumber(values[0]); //save the value of publish numbers to slot 0
    if (values.length > 1) inverseE_Gamma = parseBigNumber(values[1]); //save the value of inverseE_Gamma numbers to slot 1
}

var getInternalState = () => `${numPublishes} ${inverseE_Gamma}` //return the data saved


var getPublicationMultiplier = (tau) => tau.pow(1.5); //publication mult bonus is (tau^0.15)*100
var getPublicationMultiplierFormula = (symbol) => /*"10 · " +*/ symbol + "^{1.5}"; //text to render for publication mult ext
var getTau = () => currency.value.pow(1/10); //get the tau value from currency1
var get2DGraphValue = () => (BigNumber.ONE + currency.value.abs()).log10().toNumber(); //renders the graph based on currency 1

var geta1 = (level) => Utils.getStepwisePowerSum(level, 3.5, 3, 0); //get the value of the variable from a power sum with a level of <level>, a base of 2, a step length of 5 and an initial value of 0 
var geta2 = (level) => BigNumber.TWO.pow(level); //get the value of the variable from a power of 2^level
var getb1 = (level) => Utils.getStepwisePowerSum(level, 6.5, 4, 0); //get the value of the variable from a power sum with a level of <level>, a base of 3, a step length of 2 and an initial value of 0
var getb2 = (level) => BigNumber.TWO.pow(level); //get the value of the variable from a power of 2^level


init(); //british line [lime]
