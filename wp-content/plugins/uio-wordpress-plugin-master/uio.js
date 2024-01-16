/*
Copyright 2015 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

$(document).ready(function () {
  var tocPlaceholder = "<div class='flc-toc-tocContainer toc'> </div>";
  var uioTemplateSpec = {
    uioTemplate: {
      href:
        window.location.protocol +
        "//" +
        window.location.host +
        "/wp-content/plugins/uio-wordpress-plugin-master/template.html",
    },
  };

  // Fetch the template text, and when we have it, proceed
  fluid.fetchResources(uioTemplateSpec, function (spec) {
    // Add the sliding panel template to the page
    $("body").prepend(spec.uioTemplate.resourceText);

    // Add the table of contents placeholder to the page
    $("#main").prepend(tocPlaceholder);

    // Create the prefs editor
    fluid.uiOptions.prefsEditor(".flc-prefsEditor-separatedPanel", {
      terms: {
        templatePrefix:
          "/wp-content/plugins/uio-wordpress-plugin-master/lib/infusion/src/framework/preferences/html/",
        messagePrefix:
          "/wp-content/plugins/uio-wordpress-plugin-master/lib/infusion/src/framework/preferences/messages/",
      },
      tocTemplate:
        "/wp-content/plugins/uio-wordpress-plugin-master/lib/infusion/src/components/tableOfContents/html/TableOfContents.html",
    });
  });
});
