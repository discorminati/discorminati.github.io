
//start button
var toggle = true;

function start () {
    $("#start").text("Started!");
    toggle=!toggle;
    $(".startdiv").css("display", toggle ? "block": "none");
    $(".afterstart").css("display", toggle ? "none":"block");
    $("#ip, .ilevel").addClass("hidden");
    $(" #ap, .alevel").addClass("hidden");
};

//exponential
function format(amount) {
    let power = Math.floor(Math.log10(amount))
    let mantissa = amount / Math.pow(10, power)
    if (power < 3) return amount.toFixed(2)
    return mantissa.toFixed(2) + "e" + power
};


//active points
var ap = 10;
var alevels  = [];
    
for(let i = 0; i < 6; i++) {
    let alevel  =  {
        level: i+1,
        cost: Math.pow(Math.pow(10,i), i) * 10,
        bought: 0,
        amount: 0,
        mult: 1
    };
    alevels.push(alevel)
};

function aupdated() {
    $("#ap").text("You have " + format(ap) + " Active Points");
    for (let i = 0; i < 6; i++) {
        let al = alevels[i];
        $("#alevel" + (i + 1)).html("Level " + al.level +
        "&emsp;&emsp;&emsp;Amount: " + format(al.amount) + 
        "&nbsp;(" + al.bought + ")" +
        "&nbsp;" + format(al.mult) + "x" +
        "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" + 
        '<button type="button" class="btnacost">' + "Cost: " 
        + format(al.cost) + " AP</button>");

        //if (il.cost > ip) $(".alevel.btnacost").addClass("locked")
        //else $(".alevel.btnacost").removeClass("locked");
    };
};

//idle points 


var ip = 10;
var ilevels = [];


for(let i = 0; i < 10; i++) {
    let ilevel = {
        level: i+1,
        cost: Math.pow(Math.pow(10,i), i)*10,
        bought: 0,
        amount: 0,
        mult:1,
        amountmult:0
    }
    ilevels.push(ilevel)
};


function iupdated() {
    $("#ip").text("You have " + format(ip) + " Idle Points");
    for (let i = 0; i < 10; i++) {
        let il = ilevels[i];
        $("#ilevel" + (i + 1)).html("Level " + il.level +
        "&emsp;&emsp;&emsp;Amount: " + format(il.amount) + 
        "&nbsp;(" + il.bought + ")" +
        "&nbsp;" + format(il.mult) + "x" +
        "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" + 
        "<button type='button' class='btnicost'>" +  "Cost: " 
        + format(il.cost) + " IP</button>");

        //if (il.cost > ip) $(".ilevel.btnicost").addClass("locked")
        //else $(".ilevel.btnicost").removeClass("locked")
        

    }
};

// update rate
var lastUpdate = Date.now();
function aproductionloop (diff) {
    ap += alevels[0].amount * alevels[0].mult * diff;
    for (let a = 1; a < 6; a++) {
         alevels[a-1].amount += alevels[a].amount * alevels[a].mult * diff/5
    }
};

function updatedloop() {
    var diff = (Date.now() - lastUpdate) / 1000;

    aproductionloop(diff);
    aupdated();
    iproductionloop(diff)
    iupdated()
    lastUpdate = Date.now();
};


function iproductionloop (diff) {
    ip += ilevels[0].amount * ilevels[0].mult * diff;
    for (let i = 1; i < 10; i++) {
        ilevels[i-1].amount += ilevels[i].amount * ilevels[i].mult * diff/5
    }
};

function intervalloop () {
        return setInterval (updatedloop,400);
}
        

//when clicks active, idle disapears

var atoggle;
var itoggle;


$("#abutton").click(function () {
    atoggle=true;
    itoggle=false;
    if (atoggle=true) {
        $(".ilevel, #abutton, .wdyp, #ip, .ilevel").addClass("hidden");
        $("#ibutton, .alevel, #ap").removeClass("hidden");
        $(".alevel").addClass("alayout");
        $("#ap").addClass("aplayout");
    };
});


 

$("#ibutton").click(function () {
    itoggle=true;
    atoggle=false;
    if (itoggle=true) {
        $(".alevel, #ibutton, .wdyp, #ap, .alevel").addClass("hidden");
        $("#abutton, .ilevel, #ip").removeClass("hidden");
        $(".ilevel").addClass("ilayout");
        $("#ip").addClass("iplayout");
    };
});


//buys ap+ip

function buyalevels(a) {
    let al = alevels[a-1];
    if(al.cost > ap) return 
    ap -= al.cost;
    al.amount += 1 ;
    al.bought += 1
    al.mult *= 1.5
    al.cost *=1.7
    alevels[a-1] = al;
}

function buyilevels(i) {
    let il = ilevels[i-1];
    if(il.cost > ip) return
    ip -= il.cost
    il.amount +=1
    il.bought += 1
    il.amountmult +=0.01
    il.mult *= (1.1 + il.amountmult)
    il.cost*=1.7
    ilevels[i-1] = il;
}


intervalloop();


