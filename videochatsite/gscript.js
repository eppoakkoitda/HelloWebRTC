$(function(){

let localStream = null;
let peer = null;
let existingCall = null;

navigator.mediaDevices.getUserMedia({video: true, audio: true})
    .then(function (stream) {
        // Success
        $('#my-video').get(0).srcObject = stream;
        localStream = stream;

        CallStart();
        setupMakeCallUI();//init
        console.log("run");
    })
    .catch(function (error) {
        // Error
        console.error('mediaDevice.getUserMedia() error:', error);
        return;
    });


peer = new Peer({
    key: 'c14010b0-b1a7-4e30-b166-6fb50c553400',
    debug: 3
});

peer.on('open', function(){
    $('#my-id').text(peer.id);
});

peer.on('error', function(err){
    alert(err.message);
});

peer.on('close', function(){
    setupEndCallUI();
    $("#str").text("Thank you for using.");
});

peer.on('disconnected', function(){
    setupEndCallUI();
    $("#str").text("disconnected (Signaling Server)");
});

 function CallStart(){
    const call = peer.call(location.search.substring(1), localStream);
    setupCallEventHandlers(call);
};
/*
$('#end-call').click(function(){
    existingCall.close();
});
*/

peer.on('call', function(call){
    call.answer(localStream);
    setupCallEventHandlers(call);
});

function setupCallEventHandlers(call){
    if (existingCall) {
        existingCall.close();
    };

    existingCall = call;

    call.on('stream', function(stream){
    addVideo(call,stream);
    setupEndCallUI();
    //$('#their-id').text(call.remoteId);
    });

    call.on('close', function(){
        removeVideo(call.remoteId);
        setupMakeCallUI();
    });
}

function addVideo(call,stream){
    $('#their-video').get(0).srcObject = stream;
}

function removeVideo(peerId){
    $('#their-video').get(0).srcObject = undefined;
}

function setupMakeCallUI(){
    //$('#make-call').show();
    $('#str').hide();
}

function setupEndCallUI() {
    //$('#make-call').hide();
    $('str').show();
}

$('#my-video').on('click', () => {
  console.log("aaaaaaa");
});

});
