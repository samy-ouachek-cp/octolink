// ==UserScript==
// @name         Linkedin connect
// @version      0.1
// @author       Samtouille
// @match        https://www.linkedin.com/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

const TIME_BY_CONNEXION_MIN = 950;
const TIME_BY_CONNEXION_MAX = 1050;

let RUN = false;

(function() {
    'use strict';

    const run = location.search.replace('?', '').split('=');
    if (run.length === 2 && run[0] === 'run' && run[1] === 'true') RUN = true;

    if (RUN) setTimeout(function() { runBot() }, 3000);
    addButton();
})();

function runBot() {
    // Click on each connect button
    let time = Math.floor(Math.random() * TIME_BY_CONNEXION_MAX) + TIME_BY_CONNEXION_MIN;
    $('[data-control-name="invite"]').each(function (key, value) {
        setTimeout( function(){
            value.click();
            console.log('connect');
        }, time, value);
        time += Math.floor(Math.random() * TIME_BY_CONNEXION_MAX) + TIME_BY_CONNEXION_MIN;
    });

    // Reload the page to get the new connexions
    setTimeout(function(){
        if ($('[data-control-name="invite"]').eq().prevObject.length === 0) location.reload();
        else alert('Error: cannot make new connexions');
    }, time + 300);
}

function addButton() {
    if (RUN) {
        $('body').append('<button id="bot" style="padding: 7px 12px;border: 1px solid grey;position: fixed;bottom: 110px;left: 18px;z-index: 100;color: white;background: white;"><a style="color:black;" href="https://www.linkedin.com/mynetwork/?run=false">Arreter le bot</div></div>');
    } else {
        $('body').append('<button id="bot" style="padding: 7px 12px;border: 1px solid grey;position: fixed;bottom: 110px;left: 18px;z-index: 100;color: white;background: white;"><a style="color:black;" href="https://www.linkedin.com/mynetwork/?run=true">Lancer le bot</div></div>');
    }
}
