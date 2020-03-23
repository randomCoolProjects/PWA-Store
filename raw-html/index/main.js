ElementLoader.LoadElement(document.querySelector('.body-area'),
'appMiniature', {
    id: 'app-test',
    appTitle: 'Super APP',
    appCategory: 'Games',
    appImg: './img/icon/i512.png'
});

ElementLoader.LoadElement(document.querySelector('.body-area'),
'appMiniature', {
    id: 'app-test2',
    appTitle: 'Super APP',
    appCategory: 'Games',
    appImg: './img/icon/i512.png'
});

window.setTimeout(() =>
ElementLoader.LoadElement(document.querySelector('.body-area'),
'appCategory', {
    id: 'categ-test',
    cardCategory: 'Last added',
}, (categ) => {
    for (var x = 0; x < 10; x++)
    ElementLoader.LoadElement(document.querySelector('.app-card-container'),
    'appMiniature', {
        id: 'app-test'+x,
        appTitle: 'Super APP',
        appCategory: 'Games',
        appImg: './img/icon/i512.png'
    });
}), 100);


const InstallBtn = document.querySelector('#hm-install');

InstallBtn.addEventListener('click', () => {
    if (deferredPrompt) deferredPrompt.prompt();
    
});