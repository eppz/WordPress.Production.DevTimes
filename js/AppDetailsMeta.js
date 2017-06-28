var AppDetailsMeta = Class.extend
({


    // Model.
    model:
    {
        iTunesLookup: "",
    },


    construct: function()
    {
    },

    appID_iOS_changed: function(event)
    {
        var value = event.currentTarget.value;
        var isAppID = /\b[0-9]{9}\b/.test(value);
        var not = (isAppID) ? "" : "not ";
        console.log("`"+value+"` is "+not+"App ID.");

        // Only if App ID.
        if (isAppID == false) return;

        // Request.
        var url = 'https://itunes.apple.com/lookup?id='+value;
        console.log("GET "+url);
        qwest.setDefaultDataType('json');
        qwest.get(url)
            .then(function(xhr, response)
            {
                appDetailsMeta.model.iTunesLookup = JSON.parse(response).results[0];
                console.log(appDetailsMeta.model.iTunesLookup);
                appDetailsMeta.update();

            })
            .catch(function(error, xhr, response)
            {
                console.log(response);
                console.log(error);
            })
            .complete(function()
            {
                // Always run
            });
    },

    update: function()
    {
        jQuery("#app_meta_trackCensoredName").attr(
            "value",
            this.model.iTunesLookup.trackCensoredName
        );

        jQuery("#app_meta_trackViewUrl").attr(
            "value",
            this.model.iTunesLookup.trackViewUrl
        );

        jQuery("#app_meta_artworkUrl512").attr(
            "value",
            this.model.iTunesLookup.artworkUrl512
        );

        jQuery("#app_meta_releaseDate").attr(
            "value",
            this.model.iTunesLookup.releaseDate
        );
    }

});

// Instantiate.
var appDetailsMeta = new AppDetailsMeta();