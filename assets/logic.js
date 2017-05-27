
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBCalQddpdE4NEw0MNoO5Gpkr0qaTRswS8",
    authDomain: "patrick-f3571.firebaseapp.com",
    databaseURL: "https://patrick-f3571.firebaseio.com",
    projectId: "patrick-f3571",
    storageBucket: "patrick-f3571.appspot.com",
    messagingSenderId: "413446647539"
  };
  firebase.initializeApp(config);
  var database = firebase.database()

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainStart = moment($("#first-train-time-input").val().trim(), "HH:mm").format("HH:mm");
  var trainFrequency = $("#frequency-input").val().trim();

  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: trainStart,
    frequency: trainFrequency
  };

  database.ref().push(newTrain);

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-time-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {

  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().frequency;

var startTimeConverted = moment(trainStart, "HH:mm")
var timeDiff = moment().diff(moment(startTimeConverted), "minutes");
var timeRemainder = timeDiff % trainFrequency;
var minToTrain = trainFrequency - timeRemainder;
var nextTrain = moment().add(minToTrain, "minutes").format("HH:mm");
$("#train-table>tbody").append("<tr><td>"+trainName+"</td><td>"+trainDestination+"</td><td>"+trainFrequency+"</td><td>"+ nextTrain + "</td><td>"+minToTrain+"</td></tr>")

});


