let audio;
let dropAudo;
let teleportAudio;
let teleportReleaseAudio;

AFRAME.registerComponent('submit_sound', {
    init:function() {
        audio = document.querySelector("#submitSound").components.sound;
        dropAudo = document.querySelector("#dropSound").components.sound;
        teleportAudio = document.querySelector("#teleportSound").components.sound;
        teleportReleaseAudio = document.querySelector("#teleportReleaseSound").components.sound;
    }
});

export function playSubmitSound() {
    audio.playSound();
}

export function playDropSound() {
    dropAudo.playSound();
}

export function playTeleportSound() {
    teleportAudio.playSound();
}

export function playTeleportReleaseSound() {
    teleportReleaseAudio.playSound();
}