let audio;

AFRAME.registerComponent('submit_sound', {
    init:function() {
        audio = document.querySelector("#submitSound").components.sound;
    }
});

export function playSubmitSound() {
    audio.playSound();
}