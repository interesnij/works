var bzFormatSource = function(referer){
  if(!referer || referer == ""){
    return "";
  }
  if(referer.charAt(referer.length-1) == "/"){ //remove trailing slashes
    referer = referer.slice(0, -1);
  }
  //remove protocols
  referer = referer.replace(/http\:\/\//,"");
  referer = referer.replace(/https\:\/\//,"");
  return 'source=' + referer;
}

var bzPopupCenter = function (url, title, w, h) {
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url + "&popup=true", title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
    if (window.focus) {
        newWindow.focus();
    }
};

var bzBuildOpeningsMarkup = function (openings) {
    var html = '<ul class="bzOpeningsList">';
    var i;
    for(i = 0; i < openings.length; i++) {
        var opening = openings[i];
        html += '<li class="bzOpening">';
        if(bzPopupEnabled) {
            html += '<a href="#" onclick="bzPopupCenter(\'' + opening.url + "?" + bzSource + '\',\'\',' + bzPopupWidth + ',' + bzPopupHeight + '); return false;">';
        } else {
            html += '<a href="' + opening.url + "?" + bzSource + '" target="_blank">';
        }
        html += '<button class="bzButtonApply" type="button">Apply</button>';
        html += '<h2>' + opening.name + '</h2>';
        html += '<ul class="bzMeta">';
        if(opening.location) {
            html += '<li class="bzLocation"><span>' + opening.location.name + '</span></li>';
        }
        if(opening.location && opening.location.is_remote) {
            html += '<li class="bzRemote"><span>Remote OK</span></li>';
        }
        if(opening.type) {
            html += '<li class="bzType"><span>' + opening.type.name + '</span></li>';
        }
        if(opening.department) {
            html += '<li class="bzDepartment"><span>' + opening.department + '</span></li>';
        }
        html += '</ul>';
        html += '</a>';
        html += '</li>';
    }
    html += '</ul>';
    return html;
};

var bzBuildOpeningsByCategoryMarkup = function (openings, category) {
    var deptOpenings = {};
    var deptKeys = [];
    for(var i in openings) {
        var opening = openings[i]
        var key, name;
        if(category === "dept") {
            if(!opening.department) opening.department = "Other";
            key = opening.department.toLowerCase().replace(/\s/g,'');
            name = opening.department;
        } else if(category === "loc") {
            key = opening.location.name.toLowerCase().replace(/\s/g,'');
            name = opening.location.name;
        }
        if(deptKeys.indexOf(key) === -1) {
            deptKeys.push(key);
            deptOpenings[key] = {
                'name': name,
                'list': []
            };
        }
        deptOpenings[key].list.push(opening);
    }
    var html = '<ul class="bzOpeningsCategoryList">';
    for(var k in deptKeys.sort()) {
        var dept = deptOpenings[deptKeys[k]];
        html += '<li class="bzOpeningsCategory">';
        html += '<h1 class="bzCategory">' + dept.name + '</h1>';
        html += bzBuildOpeningsMarkup(dept.list);
        html += '</li>';
    }
    html += '</ul>';
    return html;
};

var bzDisplayOpenings = function (html) {
    document.getElementById("bzOpeningsContainer").innerHTML += html;
};

var bzGetParameterByName = function (name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return;
    if (!results[2]) return;
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

var bzDoWork = function () {
    var portalUrl = '/static/scripts/verity/1.json';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var openings = JSON.parse(xmlhttp.responseText);
            var html;
            if(bzGroupBy === "dept") {
                //console.log('Processing group_by=dept');
                html = bzBuildOpeningsByCategoryMarkup(openings, "dept");
            } else if(bzGroupBy === "loc") {
                //console.log('Processing group_by=loc');
                html = bzBuildOpeningsByCategoryMarkup(openings, "loc");
            } else {
                //console.log('Processing...');
                html = bzBuildOpeningsMarkup(openings);
            }
            //console.log("HTML: " + html);
            bzDisplayOpenings(html);
        }
    };
    xmlhttp.open('GET', portalUrl, true);
    xmlhttp.send();
};

var bzPopupHeight = 700;
var bzPopupWidth = 1000;
var bzPopupEnabled = true;
var bzGroupBy = "dept";
var bzWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var bzSource = bzFormatSource(document.referrer);

if(bzWidth < 850) {
    bzPopupEnabled = false;
} else if(bzWidth < 1024) {
    bzPopupWidth = 750;
    bzPopupHeight = 560;
}
bzDoWork();
