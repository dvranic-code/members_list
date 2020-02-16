/**
 * PRINT MENI
 */
var menuContainer = document.getElementById('menu-container');

document.querySelector('.icon').addEventListener('click', slidePrintMenu);
// document.querySelector('.icon').addEventListener('touchstart', slidePrintMenu);

function slidePrintMenu() {
  menuContainer.classList.toggle('show');
  document.querySelector('.icon').classList.toggle('active');

}


/**
 * ACTIVATE PRINT STYLE
 */

document.querySelector('.btn-print').addEventListener('click', printStyle);
// document.querySelector('.btn-print').addEventListener('touchstart', printStyle);

function printStyle() {
  document.body.classList.toggle('print');
  document.querySelector('.btn-print').classList.toggle('active');
}


/**
 * PAGES CONTROLLER
 * 
 * creates front page and inner pages
 */
var pagesController = (function() {

  var DOMstrings = {
    pagesContainer: ".pages",
    membersContainer: ".active-page .members",
    active: ".active-page"
  }

  var createInnerPage = function(pageTitle) {

    if (document.querySelector(DOMstrings.active)) {
      document.querySelector(DOMstrings.active).classList.remove('active-page');
    }
    
    var html, element;

    element = DOMstrings.pagesContainer;

    html = '<section class="page inner-page active-page"><h1 class="page-title">'+pageTitle+'</h1><div class="members"></div></section>';

    document.querySelector(element).insertAdjacentHTML('beforeend', html);

  }

  var addMember = function(obj) {
    var html, newHtml, element;

      //HTML string with placeholder
      html = '<div class="member-card"><div class="member-image" style="background-image: url(\'%picture%\');"></div><div class="member-header"><h2 class="name">%name%</h2><p class="title">%position% %extraInfo%</p></div><div class="member-description"><h3>Strengths:</h3><p>%strengths%</p></div><div class="member-description"><h3>Referrals for me:</h3><p>%refForMe%</p></div><div class="member-description"><h3>Referrals I can provide:</h3><p>%refICanProvide%</p></div><div class="member-info"><ul><li>%location%</li><li>%phoneNumber%</li><li>%email%</li></ul></div></div>';

      // replace placeholders with data from object
      var picture = obj.picture ? obj.picture : 'img/member.jpeg';
      newHtml = html.replace('%picture%', picture); 
      newHtml = newHtml.replace('%name%', obj.name); 
      newHtml = newHtml.replace('%position%', obj.position); 
      
      if (obj.extraInfo) {
        newHtml = newHtml.replace('%extraInfo%', '<br><span>'+obj.extraInfo+'</span>');
      } else {
        newHtml = newHtml.replace('%extraInfo%', '');
      }

      newHtml = newHtml.replace('%strengths%', obj.strengths); 
      newHtml = newHtml.replace('%refForMe%', obj.refForMe); 
      newHtml = newHtml.replace('%refICanProvide%', obj.refICanProvide); 
      newHtml = newHtml.replace('%location%', obj.location); 
      newHtml = newHtml.replace('%phoneNumber%', obj.phoneNumber); 
      newHtml = newHtml.replace('%email%', obj.email); 

      element = DOMstrings.membersContainer;

      //attache newHTML to element
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
  }

  return {
    addFrontPage: function(obj) {

      var html, newHtml, element;

      //HTML string with placeholder
      html = '<section class="page" id="front-page"><div class="front-logo"><img src="%companyLogo%" alt=""></div><div class="feature-img" style="background-image: url(\'%featureImage%\')"></div><div class="front-content"><h1 class="page-title">%headTitle%</h1><p id="company-sub-title">%companySubTitle%</p><div class="row" id="team-intro"><div class="col"><img src="%introPicture%" alt=""></div><div class="col"><p class="first-letter">%introTextColOne%</p></div><div class="col"><p>%introTextColtwo%</p></div></div><div class="row" id="team-feat"><div class="col"><h2 class="feat">%title0%</h2><p>%text0%</p></div><div class="col"><h2 class="feat">%title1%</h2><p>%text1%</p></div><div class="col"><h2 class="feat">%title2%</h2><p>%text2%</p></div></div></div></section>';

      // replace placeholders with data from object
      var companyLogo = obj.companyLogo ? obj.companyLogo : 'img/logoipsum.png';
      newHtml = html.replace('%companyLogo%', companyLogo);

      var featureImage = obj.featureImage ? obj.featureImage : 'img/team.jpg';
      newHtml = newHtml.replace('%featureImage%', featureImage);
      newHtml = newHtml.replace('%headTitle%', obj.headTitle);
      newHtml = newHtml.replace('%companySubTitle%', obj.companySubTitle);
      newHtml = newHtml.replace('%introPicture%', obj.introPicture);
      newHtml = newHtml.replace('%introTextColOne%', obj.introTextColOne);
      newHtml = newHtml.replace('%introTextColtwo%', obj.introTextColtwo);
      obj.features.forEach(function(feat, id) {
        newHtml = newHtml.replace('%title'+id+'%', feat.title);
        newHtml = newHtml.replace('%text'+id+'%', feat.text);
      });
      

      element = DOMstrings.pagesContainer;

      //attache newHTML to element
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

    },

    addInnerPages: function(obj) {

      createInnerPage(obj.pagesTitle);

      var i = 1;

      obj.members.forEach(function(member) {

        if (i > 6) {
          createInnerPage(obj.pagesTitle);
          i = 0;
        }

        addMember(member);
        i++;

      });

    },

    addBackPages: function(obj) {

      var html, newHtml, element;

      //HTML string with placeholder
      html = '<section class="page" id="back-page"><div class="front-logo"><img src="%companyLogo%" alt=""></div><div class="feature-img" style="background-image: url(\'%featureImage%\')"></div><div class="front-content"><h2 class="page-title">Access Details</h2><div class="row"><div class="col-4"><p>%accessDetails%</p></div><div class="col-8"><img src="%map%"></div></div></div></section>';

      // replace placeholders with data from object
      var companyLogo = obj.companyLogo ? obj.companyLogo : 'img/logoipsum.png';
      newHtml = html.replace('%companyLogo%', companyLogo);

      var featureImage = obj.featureImage ? obj.featureImage : 'img/team.jpg';
      newHtml = newHtml.replace('%featureImage%', featureImage);
      newHtml = newHtml.replace('%accessDetails%', obj.accessDetails);
      newHtml = newHtml.replace('%map%', obj.map);

      element = DOMstrings.pagesContainer;

      //attache newHTML to element
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

    }

  };

})();


/**
 * Main app controler
 * 
 * from JSON object creates a list of members
 */
var controller = (function(pageCtrl) {

  var loadJSON = function(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType('application/json');
    xobj.open('GET', 'object.json', true
    );
    xobj.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == "200") {
            callback(this.responseText);
        }
    };
    xobj.send(null);
  };

  return {
    init: function() {

      // 1. CONVERT JSON file to object
      var excelObject = loadJSON(function(response) {
        var x = JSON.parse(response);

        pageCtrl.addFrontPage(x);

        pageCtrl.addInnerPages(x);

        pageCtrl.addBackPages(x);
        
      });
      
    }
  };

})(pagesController);

controller.init();