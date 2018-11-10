let audio;
let teleportAudio;

AFRAME.registerComponent('submit_sound', {
    init:function() {
        audio = document.querySelector("#submitSound").components.sound;
        teleportAudio = document.querySelector("#teleportSound").components.sound;
    }
});

export function playSubmitSound() {
    audio.playSound();
}

export function playTeleportSound() {
    teleportAudio.playSound();
}