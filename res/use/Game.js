{
    let script = document.createElement('script');
    script.src = 'res/js/under/Main.js';
    document.head.appendChild(script);
    script.onload = function () {
        let script = document.createElement('script');
        script.src = 'res/js/under/Scene.js';
        document.head.appendChild(script);
        script.onload = function () {
            let script = document.createElement('script');
            script.src = 'res/js/under/Input.js';
            document.head.appendChild(script);
            script.onload = function () {
                let script = document.createElement('script');
                script.src = 'res/js/under/default/DefaultInput.js';
                document.head.appendChild(script);
                script.onload = function () {
                    let script = document.createElement('script');
                    script.src = 'res/js/under/default/DefaultScene.js';
                    document.head.appendChild(script);
                    script.onload = function () {
                        let script = document.createElement('script');
                        script.src = 'res/js/scene/TitleScene.js';
                        document.head.appendChild(script);
                        script.onload = function () {
                            let script = document.createElement('script');
                            script.src = 'res/js/scene/GameScene.js';
                            document.head.appendChild(script);
                            script.onload = function () {
                                let script = document.createElement('script');
                                script.src = 'res/js/ExtendInput.js';
                                document.head.appendChild(script);
                                script.onload = function () {
                                    let script = document.createElement('script');
                                    script.src = 'res/js/Main.js';
                                    document.head.appendChild(script);
                                    script.onload = function () {};
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};