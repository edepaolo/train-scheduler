// Your web app's Firebase configuration

// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if true;
//     }
//   }
// }
  var firebaseConfig = {
    apiKey: "AIzaSyCTurKTyM9ZWfOyf8b9OEy6oPGkHgyHc3Y",
    authDomain: "train-scheduler-ce305.firebaseapp.com",
    databaseURL: "https://train-scheduler-ce305.firebaseio.com",
    projectId: "train-scheduler-ce305",
    storageBucket: "train-scheduler-ce305.appspot.com",
    messagingSenderId: "518272482182",
    appId: "1:518272482182:web:7d25289d84d0568372ca07"
  };

  var trainData = firebase.database();
  
  
  $("#add-train-btn").on("click", function(event) {
    
    event.preventDefault();
  
    
    var trainName = $("#train-name-input")
      .val()
      .trim();
    var destination = $("#dest-input")
      .val()
      .trim();
    var firstTrain = $("#time-input")
      .val()
      .trim();
    var frequency = $("#freq-input")
      .val()
      .trim();
  
    
    var newTrain = {
      name: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    };
  
    
    trainData.ref().push(newTrain);
  
    
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);
  
    
    alert("Train successfully added");
  

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
  });
  
  

  trainData.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());
  
    

    var tName = childSnapshot.val().name;
    var tDestination = childSnapshot.val().destination;
    var tFrequency = childSnapshot.val().frequency;
    var tFirstTrain = childSnapshot.val().firstTrain;
  
    var timeArr = tFirstTrain.split(":");
    var trainTime = moment()
      .hours(timeArr[0])
      .minutes(timeArr[1]);
    var maxMoment = moment.max(moment(), trainTime);
    var tMinutes;
    var tArrival;
  
    

    if (maxMoment === trainTime) {
      tArrival = trainTime.format("hh:mm A");
      tMinutes = trainTime.diff(moment(), "minutes");
    } else {
      

      var differenceTimes = moment().diff(trainTime, "minutes");
      var tRemainder = differenceTimes % tFrequency;
      tMinutes = tFrequency - tRemainder;


      tArrival = moment()
        .add(tMinutes, "m")
        .format("hh:mm A");
    }
    console.log("tMinutes:", tMinutes);
    console.log("tArrival:", tArrival);
  
    
    $("#train-table > tbody").append(
      $("<tr>").append(
        $("<td>").text(tName),
        $("<td>").text(tDestination),
        $("<td>").text(tFrequency),
        $("<td>").text(tArrival),
        $("<td>").text(tMinutes)
      )
    );
  });