
var satelliteInfo = require('./data/formattedsatellites');

var currentSatellite = 'H';

function printAncestors(ancestorList){
    for (var itemIndex=0; itemIndex < ancestorList.length; itemIndex++){
        console.log('Ancestor', ancestorList[itemIndex]);
    }
}

function countOrbits(node, nodeList)
{
    var ancestorList = [];
    console.log('Starting at node: ', node);
	var count = 0;
	var ret = nodeList[node];  //B
	while(ret)
	{
        console.log('Parent Node: : ', ret);
        ancestorList.push(ret);
		count++;
		ret = nodeList[ret];
	}
	
	return ancestorList;
}

var ancestorList = countOrbits(currentSatellite, satelliteInfo.testnodes);

console.log('Small Sample Total orbit count for selected satellite: ', currentSatellite, ' :', ancestorList.length);

//Distance between 2 nodes

var myAncestorList = countOrbits("YOU", satelliteInfo.testdistancenodes);
var targetAncestorList = countOrbits("DST", satelliteInfo.testdistancenodes);

var mySharedAncestorIndex = 0;
var targetSharedAncestorIndex = 0;

function getOrbitalTransferList(){
    for(var index=0; index < myAncestorList.length; index++){
        var currentItem = myAncestorList[index];
        var currentIndex = targetAncestorList.indexOf(currentItem);
        if(currentIndex > -1){
            mySharedAncestorIndex = myAncestorList.indexOf(currentItem);
            targetSharedAncestorIndex = targetAncestorList.indexOf(currentItem);
            index = myAncestorList.length;
        }
    }
}

getOrbitalTransferList();

var totalOrbitalTransfers = mySharedAncestorIndex + targetSharedAncestorIndex;

console.log('Small sample Total Orbital transfers: ', totalOrbitalTransfers);

var finalNodeList = satelliteInfo.formatFinalNodes();

currentSatellite = '8X6';
var ancestorList = countOrbits(currentSatellite, finalNodeList);

console.log('Large Sample Total orbit count for selected satellite: ', currentSatellite, ' :', ancestorList.length);

myAncestorList = countOrbits("YOU", finalNodeList);
targetAncestorList = countOrbits("DST", finalNodeList);
mySharedAncestorIndex = 0;
targetSharedAncestorIndex = 0;
getOrbitalTransferList();

totalOrbitalTransfers = mySharedAncestorIndex + targetSharedAncestorIndex;

console.log('Large sample Total Orbital transfers: ', totalOrbitalTransfers);

