var pageName = location.pathname.split('/').pop().
replace(location.search, '').replace('.html', '');

const PageLoader = {
    Rules: null,
    ResourceDictionary:
    {
        'script': ['script', 'src'],
        'style': ['link', 'href']
    },
    GetFile: function(url, callback)
    {
        fetch(url)
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            callback(data);
        });
    },

    InjectResource: function(resUrl, resType)
    {
        const resRules = this.ResourceDictionary[resType];
        var element = document.createElement(resRules[0]);  // create a script DOM node
        element[resRules[1]] = resUrl;  // set its src to the provided URL
        var toAppend = document.body;
        if (resType == 'style') {
            element.rel = 'stylesheet';
            toAppend = document.head;
        }
        toAppend.appendChild(element);
    },

    LoadPage: function(page)
    {
        this.GetFile('./rules.json', (rulesJSON) => {
            const rules = (typeof rulesJSON == 'object' ? rulesJSON : JSON.parse(rulesJSON));
            this.Rules = rules;
            var cache = localStorage['pwa-store/cache' + location.pathname];
            if (cache && false)
            {
                document.write(cache);
                window.setTimeout(() => {
                    if (typeof PageLoad != 'undefined') PageLoad();
                }, 40);
                console.log('cache loaded')
                return;
            }
            const dir = rules.pagePath + page;
            console.log(dir)
            this.GetFile(dir + '/main.html', pageHtml => {
                document.write(pageHtml);
                this.InjectResource(dir + '/main.css', 'style');
                var keys = Object.keys(rules.global);
                keys.forEach(key => {
                    var obj = rules.global[key];
                    var path = obj.path;
                    obj.files.forEach(file => {
                        this.InjectResource(path + file, key);
                    });
                });
                this.InjectResource(dir + '/main.js', 'script');
                document.title = rules.pages[pageName + '.html'].title;

                window.setTimeout(() => {
                    if (typeof PageLoad != 'undefined') PageLoad();
                    localStorage['pwa-store/cache' + location.pathname]
                    = document.documentElement.innerHTML;
                }, 60);
            });
        });
    },
}

const ElementLoader = {
    Loaded: [],
    LoadElement: function(parent, element, variables, callback)
    {
        const elPath = PageLoader.Rules.elementsPath + element + '/';
        PageLoader.GetFile(elPath + 'main.html', html => {
            var elementHtml = html;
            var keys = Object.keys(variables);
            keys.forEach(variable => {
                var value = variables[variable];
                elementHtml = elementHtml.replace(`$(${variable})`, value);
            });

            if (!this.Loaded.includes(element))
            elementHtml += `
            <script src="${elPath + 'main.js'}"></script>
            <link rel="stylesheet" href="${elPath + 'main.css'}">`

            var domElement = document.createElement('div');
            parent.appendChild(domElement);
            domElement.outerHTML = elementHtml;
            window.setTimeout(() => {
                if (callback) callback(domElement);
                eval(`if (typeof ${element} != "undefined") ${element}(${variables.id});`)
            }, 50);
            if (!this.Loaded.includes(element))
            this.Loaded.push(element);
        });
    }
}

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    console.log('prompt')
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can install the PWA
});

PageLoader.LoadPage(pageName);