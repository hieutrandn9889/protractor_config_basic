var app = angular.module('reportingApp', []);

app.controller('ScreenshotReportController', function ($scope) {
    $scope.searchSettings = Object.assign({
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true,
    },{}); // enable customisation of search settings on first page hit

    var initialColumnSettings=undefined; // enable customisation of visible columns on first page hit
    if(initialColumnSettings) {
        if(initialColumnSettings.displayTime !==undefined) {
            this.displayTime=!initialColumnSettings.displayTime; // initial settings have be inverted because the html bindings are inverted (e.g. !ctrl.displayTime)
        }
        if(initialColumnSettings.displayBrowser !==undefined) {
            this.displayBrowser=!initialColumnSettings.displayBrowser; // same as above
        }
        if(initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId=!initialColumnSettings.displaySessionId; // same as above
        }
        if(initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId=!initialColumnSettings.displaySessionId; // same as above
        }
        if(initialColumnSettings.inlineScreenshots !== undefined) {
            this.inlineScreenshots=initialColumnSettings.inlineScreenshots; // this setting does not have to be inverted
        }

    }


    $scope.inlineScreenshots = false;
    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.getParent = function (str) {
        var arr = str.split('|');
        str = "";
        for (var i = arr.length - 2; i > 0; i--) {
            str += arr[i] + " > ";
        }
        return str.slice(0, -3);
    };

    this.specLevel = function (str) {
        var arr = str.split('|');
        str = "";
        if (arr.length < 3) {
            return true;
        }
        return false;
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };


    this.getShortDescription = function (str) {
        return str.split('|')[0];
    };


    this.nToBr = function (str) {
        return str.replace(/(?:\r\n|\r|\n)/g, '<br />');
    };


    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh == 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number)/1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {passCount++};
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {pendingCount++};
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {failCount++}
        }
        return failCount;
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };


    var results =[
    {
        "description": "should add a todo|angularjs homepage todo list",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "sessionId": "9fa6db42e6b49fa4fe2e168d890c78f3",
        "instanceId": 3321,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://juliemr.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1534154445213,
                "type": ""
            }
        ],
        "screenShotFile": "006b0077-00d1-0042-00db-00e400ba0012.png",
        "timestamp": 1534154442129,
        "duration": 5405
    },
    {
        "description": "should add a todo|angularjs homepage todo list",
        "passed": false,
        "pending": false,
        "os": "Mac OS X",
        "sessionId": "1d35112a9d82a3fdaa52511f3c0c290f",
        "instanceId": 3432,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Expected '10' to equal '20'.",
        "trace": "Error: Failed expectation\n    at UserContext.<anonymous> (/Users/hieutran/Desktop/Protractor_testing/first.js:7:61)\n    at /usr/local/lib/node_modules/protractor/node_modules/jasminewd2/index.js:112:25\n    at new ManagedPromise (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1077:7)\n    at ControlFlow.promise (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2505:12)\n    at schedulerExecute (/usr/local/lib/node_modules/protractor/node_modules/jasminewd2/index.js:95:18)\n    at TaskQueue.execute_ (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2974:25)\n    at /usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://juliemr.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1534154873875,
                "type": ""
            }
        ],
        "screenShotFile": "002c005e-00fa-0037-004d-006e009f0017.png",
        "timestamp": 1534154870142,
        "duration": 5008
    },
    {
        "description": "should add a todo|angularjs homepage todo list",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "sessionId": "e2cb217ae2a79604ef24bcd166ef0284",
        "instanceId": 3695,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://seleniumpractise.blogspot.com/2016/09/complete-registration-form.html - This page includes a password or credit card input in a non-secure context. A warning has been added to the URL bar. For more information, see https://goo.gl/zmWq3m.",
                "timestamp": 1534155907323,
                "type": ""
            }
        ],
        "screenShotFile": "00a400f9-0082-004d-00a0-004900210087.png",
        "timestamp": 1534155902748,
        "duration": 10141
    },
    {
        "description": "should add a todo C2 for non angular|angularjs homepage todo list",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "sessionId": "2bcf2f653ccb19de2160ac9437530951",
        "instanceId": 3748,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://seleniumpractise.blogspot.com/2016/09/complete-registration-form.html - This page includes a password or credit card input in a non-secure context. A warning has been added to the URL bar. For more information, see https://goo.gl/zmWq3m.",
                "timestamp": 1534156048146,
                "type": ""
            }
        ],
        "screenShotFile": "004300fe-004d-00d0-0013-003f00cf0070.png",
        "timestamp": 1534156044706,
        "duration": 8227
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.sortSpecs();
});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            countLogMessages(item);

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    var prevItem = item;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    var prevItem = item;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    var prevItem = item;
                }

            }
        }

        return filtered;
    };
});

var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
        return;
    }

    if (getSpec(item.description) != getSpec(prevItem.description)) {
        item.displaySpecName = true;
        return;
    }
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length-1];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};