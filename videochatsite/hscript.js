$(function(){

let localStream = null;
let peer = null;
let existingCall = null;

navigator.mediaDevices.getUserMedia({video: true, audio: true})
    .then(function (stream) {
        // Success
        $('#my-video').get(0).srcObject = stream;
        localStream = stream;
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
});

peer.on('disconnected', function(){
});
/*
$('#make-call').submit(function(e){
    e.preventDefault();
    const call = peer.call($('#callto-id').val(), localStream);
    setupCallEventHandlers(call);
});


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
    $('.container1').show();
    $('.container2').hide();
}

function setupEndCallUI() {
    $('.container1').hide();
    $('.container2').show();
}

setupMakeCallUI();//init

$('#button-c').on('click', () => {
  // 目的の文字列が入っている p要素を取得します。
  var element = document.querySelector('#url-s');
  // seletionオブジェクトを取得します。
  var selection = window.getSelection();
  // rangeオブジェクトを生成します。
  var range = document.createRange();
  // rangeオブジェクトに p要素を与えます。
  range.selectNodeContents(element);
  // 一旦、selectionオブジェクトの持つ rangeオブジェクトを削除します。
  selection.removeAllRanges();
  // 改めて先程生成した rangeオブジェクトを selectionオブジェクトに追加します。
  selection.addRange(range);
  console.log('選択された文字列: ', selection.toString());
  // クリップボードにコピーします。
  var succeeded = document.execCommand('copy');
  if (succeeded) {
      // コピーに成功した場合の処理です。
      console.log('コピーが成功しました！');
  } else {
      // コピーに失敗した場合の処理です。
      console.log('コピーが失敗しました!');
  }
  // selectionオブジェクトの持つrangeオブジェクトを全て削除しておきます。
  selection.removeAllRanges();

});

});
